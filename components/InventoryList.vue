<template>
  <div>
    <ul>
      <li v-for="item in inventory" :key="item.id">
        {{ item.name }} / {{ item.quantity }}
      </li>
    </ul>
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
