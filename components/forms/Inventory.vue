<template>
  <div class="bg-gray-100 px-4 py-2 rounded-lg">
    <form @submit.prevent="addItem" class="flex justify-between gap-1">
      <select
        v-model="newItem.name"
        required
        class="select select-bordered select-sm w-4/5">
        <option value="" disabled selected>Please select an item</option>
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
        class="input input-bordered w-1/5 input-sm" />
      <button type="submit" class="btn btn-accent btn-sm w-1/5">
        Add Item
      </button>
    </form>
  </div>
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
      this.newItem.quantity = 1;
    },
  },
};
</script>
