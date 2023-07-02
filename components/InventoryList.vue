<template>
  <div class="overflow-x-auto my-5">
    <h2 class="text-xl font-bold">Inventory List</h2>
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
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
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
  },
};
</script>
