<template>
  <div class="overflow-x-auto my-5">
    <table class="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Name</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="inventory.length === 0">
          <td colspan="2">No items in inventory</td>
        </tr>
        <tr v-else v-for="item in inventory" :key="item.id">
          <td class="w-1/6 p-0 m-0">
            <img v-if="item.imageUrl" :src="item.imageUrl" />
            <img v-else src="http://placeholder.co/50x50" />
          </td>
          <td class="w-3/6">{{ item.name }}</td>
          <td class="w-1/6">{{ item.quantity }}</td>
          <td class="w-1/6" v-if="editable">
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
import { defineProps, defineEmits } from "vue";

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
  setup(props) {
    const deleteItem = (item) => {
      emit("deleteItem", item);
    };

    const emit = defineEmits(["deleteItem"]);

    return {
      deleteItem,
    };
  },
};
</script>
