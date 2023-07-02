<template>
  <dialog :id="modalId" class="modal" :open="visible">
    <form method="dialog" class="modal-box">
      <slot />
    </form>
    <form method="dialog" class="modal-backdrop bg-gray-900 opacity-50">
      <button @click="closeModal">Close</button>
    </form>
  </dialog>
</template>

<script>
export default {
  name: "ModalDialog",
  props: {
    modalId: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    buttonClick: {
      type: Function,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    handleButtonClick() {
      this.buttonClick();
    },
  },
};
</script>
