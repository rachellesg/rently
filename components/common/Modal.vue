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
import { defineProps, defineEmits } from "vue";

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
  setup(props) {
    const { closeModal, handleButtonClick } = useModalDialog(props);

    return {
      closeModal,
      handleButtonClick,
    };
  },
};

function useModalDialog(props) {
  const closeModal = () => {
    emit("close");
  };

  const handleButtonClick = () => {
    props.buttonClick();
  };

  const emit = defineEmits(["close"]);

  return {
    closeModal,
    handleButtonClick,
  };
}
</script>
