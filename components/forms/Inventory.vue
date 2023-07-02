<template>
  <div class="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
    <p class="text-xs mb-2">
      Click on the preview button to view the items, you will need to approve
      the final list before it will be added to the listing.
    </p>
    <form @submit.prevent="addItem" class="flex flex-col justify-between">
      <div class="flex justify-between mb-3">
        <select
          v-model="newItem.name"
          required
          ref="nameInput"
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
          ref="quantityInput"
          type="number"
          min="1"
          :max="20 - totalItems"
          v-model.number="newItem.quantity"
          placeholder="Item quantity"
          class="input input-bordered input-sm w-1/4" />
      </div>
      <div class="mb-3">
        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg, image/png"
          @change="handleImageUpload"
          class="file-input file-input-sm w-full" />
      </div>
      <button type="submit" class="btn btn-accent btn-sm">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "InventoryForm",
  props: {
    totalItems: {
      type: Number,
    },
  },
  data() {
    return {
      newItem: {
        name: "",
        quantity: 1,
        imageUrl: "",
      },
    };
  },
  methods: {
    addItem() {
      const itemCopy = { ...this.newItem };
      this.$emit("addItem", itemCopy);
      this.resetForm();
    },
    resetForm() {
      this.newItem.name = "";
      this.newItem.quantity = 1;
      this.newItem.imageUrl = "";
      this.$refs.nameInput.selectedIndex = -1;
      this.$refs.quantityInput.value = 1;
      this.$refs.fileInput.value = "";
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      const maxFileSizeInBytes = 1 * 1024 * 1024; // 1MB
      if (file.size > maxFileSizeInBytes) {
        console.log("File size exceeds the maximum limit.");
        return;
      }
      this.newItem.imageUrl = URL.createObjectURL(file);
    },
  },
};
</script>
