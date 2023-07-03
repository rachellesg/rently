<template>
  <template v-if="isLoading">
    <div class="container mx-auto flex items-center justify-center">
      <span class="loading loading-dots loading-lg mr-5"></span> Loading data...
    </div>
  </template>
  <template v-else>
    <div class="container mx-auto">
      <h1 class="text-xl font-bold mb-5">
        <span class="text-primary">{{ apartments?.length }}</span>
        Available Apartments
      </h1>
      <div class="content md:flex-row flex-col flex justify-between md:gap-5">
        <div
          class="w-full dark:bg-stone-800 bg-white md:w-1/3 border border-slate-200 rounded-lg p-5 md:m-0 mb-5">
          <h2 class="mb-4 text-lg font-bold">
            Listings ({{ filteredListings?.length }})
          </h2>
          <input
            type="text"
            class="input input-sm input-bordered mb-5 w-full"
            ref="searchInput"
            v-model="searchQuery"
            placeholder="Search..." />
          <ApartmentList
            :apartments="filteredListings"
            :selectedApartment="selectedApartment"
            @selectApartment="selectApartment" />
          <template v-if="error">
            <div class="error-message">{{ error }}</div>
          </template>
        </div>
        <section
          class="w-full dark:bg-stone-800 bg-white md:w-2/3 border border-slate-200 rounded-lg p-5">
          <div
            class="flex justify-between items-center pb-5 mb-5 border-b border-slate-200">
            <h2 class="text-xl font-bold flex">
              {{ selectedApartment?.address }} #{{
                selectedApartment?.floor
              }}-{{ selectedApartment?.doorNumber }}
            </h2>
            <button
              @click="openModal"
              class="btn btn-primary btn-sm"
              :disabled="inventory.length === 0">
              Preview
            </button>
          </div>
          <img src="https://placehold.co/1000x300" alt="Main Image " />
          <h3 class="text-lg font-bold my-5">
            Inventory List ({{ totalInventoryItems }}
            items)
          </h3>
          <p class="text-xs">
            Inventory is a comprehensive list of items present in each
            apartment, ranging from furniture to appliances and other essential
            household items. Each apartment has its own unique inventory,
            reflecting the diverse needs and preferences of the residents.
            <span class="font-bold">Maximum of 20 items allowed.</span>
          </p>
          <InventoryList
            :inventory="selectedApartment.inventory"
            @deleteItem="deleteItem"
            editable />
          <InventoryForm
            v-if="totalInventoryItems < 20"
            :totalItems="totalInventoryItems + totalStagedInventoryItems"
            @addItem="addItem" />
        </section>
      </div>
    </div>
  </template>
  <ModalDialog
    modal-id="preview-modal"
    :visible="isPreview"
    @close="closeModal"
    :buttonClick="approveList">
    <h3 class="font-bold text-lg">Preview Inventory List</h3>
    <InventoryList :inventory="inventory" />
    <button class="btn btn-primary" @click="approveList">Approve</button>
  </ModalDialog>
</template>

<script>
import { ref, onMounted } from "vue";
import ApartmentList from "@/components/ApartmentList.vue";
import InventoryList from "@/components/InventoryList.vue";
import InventoryForm from "@/components/forms/Inventory.vue";
import ModalDialog from "@/components/common/Modal.vue";
import { getApartmentsData } from "@/server/api/apartments.ts";

export default {
  name: "List of Apartments",
  components: {
    ApartmentList,
    InventoryList,
    InventoryForm,
    ModalDialog,
  },
  setup() {
    const isLoading = ref(true);
    const isPreview = ref(false);
    const apartments = ref([]);
    const error = ref(null);
    const selectedApartment = ref(null);
    const inventory = ref([]);
    const updatedInventory = ref([]);
    const searchQuery = ref("");

    const totalInventoryItems = computed(() => {
      if (selectedApartment.value && selectedApartment.value.inventory) {
        return selectedApartment.value.inventory.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      }
      return 0;
    });

    const totalStagedInventoryItems = computed(() => {
      if (inventory.value) {
        return inventory.value.reduce((sum, item) => sum + item.quantity, 0);
      }
      return 0;
    });

    const filteredListings = computed(() => {
      const query = searchQuery.value.toLowerCase().toString();
      return apartments.value.filter(
        (item) =>
          item.address.toLowerCase().includes(query) ||
          item.floor.toString().includes(query) ||
          item.doorNumber.toString().includes(query)
      );
    });

    const selectApartment = (apartment) => {
      inventory.value = [];
      selectedApartment.value = apartment;
    };

    const addItem = (newItem) => {
      if (newItem.name !== "" && newItem.quantity !== 0) {
        const existingItem = inventory.value.find(
          (item) => item.name === newItem.name
        );
        if (existingItem) {
          // if exists, add quantity
          existingItem.quantity += newItem.quantity;
        } else {
          inventory.value.push(newItem);
        }
      }
    };

    const approveList = () => {
      const mergedInventory = [
        ...selectedApartment.value.inventory,
        ...inventory.value,
      ];
      const updatedInventory = mergedInventory.reduce((updated, item) => {
        const existingItem = updated.find(
          (updatedItem) => updatedItem.name === item.name
        );

        if (existingItem) {
          // if exists, add quantity
          existingItem.quantity += item.quantity;
        } else {
          // else add item to array
          updated.push({ ...item });
        }

        return updated;
      }, []);

      // update the inventory
      updatedInventory.value = updatedInventory;
      // update data's inventory with updated inventory
      selectedApartment.value.inventory = updatedInventory;
      // clear staged inventory
      inventory.value = [];
    };

    const deleteItem = (item) => {
      // find the index of the item in the inventory array
      const index = selectedApartment.value.inventory.findIndex(
        (inventoryItem) => inventoryItem.name === item.name
      );

      if (index !== -1) {
        // remove the item from the inventory array
        selectedApartment.value.inventory.splice(index, 1);
      }
    };

    const openModal = () => {
      isPreview.value = true;
    };

    const closeModal = () => {
      isPreview.value = false;
    };

    onMounted(() => {
      getApartmentsData()
        .then((apartmentData) => {
          apartments.value = apartmentData;
          selectedApartment.value = apartments.value[0] || null;
          isLoading.value = false;
          console.log(apartmentData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          isLoading.value = false;
          error.value = "Failed to fetch data. Please try again later.";
        });
    });

    return {
      isLoading,
      isPreview,
      apartments,
      error,
      selectedApartment,
      inventory,
      updatedInventory,
      searchQuery,
      totalInventoryItems,
      totalStagedInventoryItems,
      filteredListings,
      selectApartment,
      addItem,
      approveList,
      deleteItem,
      openModal,
      closeModal,
    };
  },
};
</script>
