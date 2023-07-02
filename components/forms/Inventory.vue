<template>
  <form @submit.prevent="addItem" class="flex justify-between gap-1">
    <select v-model="newItem.name" required class="select select-bordered">
      <option disabled selected>Select a furniture item</option>
      <option value="Sofa">Sofa</option>
      <option value="Bed">Bed</option>
      <option value="Table">Table</option>
      <option value="Chair">Chair</option>
      <option value="Cabinet">Cabinet</option>
      <option value="Fridge">Fridge</option>
      <option value="Washing Machine">Washing Machine</option>
      <option value="TV">TV</option>
      <option value="Dining Set">Dining Set</option>
      <option value="Bookshelf">Bookshelf</option>
    </select>
    <input
      type="number"
      min="1"
      v-model.number="newItem.quantity"
      placeholder="Item quantity"
      class="input input-bordered max-w-xs" />
    <button type="submit" class="btn btn-primary">Add Item</button>
  </form>
</template>

<script>
export default {
  name: "InventoryForm",
  data() {
    return {
      newItem: {
        name: "",
        quantity: 1,
      },
    };
  },
  methods: {
    addItem() {
      const itemCopy = { ...this.newItem };
      this.$emit("addItem", itemCopy);
      this.newItem.name = "";
      this.newItem.quantity = 1;
    },
  },
};
</script>
