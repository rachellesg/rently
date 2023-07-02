<template>
  <div class="overflow-x-auto my-5">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="inventory.length === 0">
          <td colspan="2">No items in inventory</td>
        </tr>
        <tr v-else v-for="item in inventory" :key="item.id">
          <td class="w-1/2">{{ item.name }}</td>
          <td class="w-1/4">{{ item.quantity }}</td>
          <td class="w-1/4" v-if="editable">
            <button class="btn btn-sm btn-neutral" @click="deleteItem(item)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "InventoryList",
  props: {
    inventory: {
      type: Array,
      required: true,
    },
    editable: {
      type: Boolean,
    },
  },
  methods: {
    deleteItem(item) {
      this.$emit("deleteItem", item);
    },
  },
};
</script>
