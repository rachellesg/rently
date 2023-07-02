<template>
  <template v-if="isLoading">
    <div class="container mx-auto flex items-center justify-center">
      <span class="loading loading-dots loading-lg mr-5"></span> Loading data...
    </div>
  </template>
  <template v-else>
    <div class="container mx-auto">
      <h1 class="text-xl font-bold mb-5">
        <span class="text-primary">{{ apartments.length }}</span>
        Available Apartments
      </h1>
      <div class="content md:flex-row flex-col flex justify-between md:gap-5">
        <div
          class="w-full bg-white md:w-1/3 border border-slate-200 rounded-lg p-5">
          <h2 class="mb-4 text-lg font-bold">Listings</h2>
          <ApartmentList
            :apartments="apartments"
            :selectedApartment="selectedApartment"
            @selectApartment="selectApartment" />
          <template v-if="error">
            <div class="error-message">{{ error }}</div>
          </template>
        </div>
        <section
          class="w-full bg-white md:w-2/3 border border-slate-200 rounded-lg p-5">
          <template v-if="selectedApartment">
            <div
              class="flex justify-between items-center pb-5 mb-5 border-b border-slate-200">
              <h2 class="text-xl font-bold text-gray-800 flex">
                {{ selectedApartment.address }} #{{
                  selectedApartment.floor
                }}-{{ selectedApartment.doorNumber }}
              </h2>
              <button
                @click="openModal"
                class="btn btn-primary btn-sm"
                :disabled="inventory.length === 0">
                Preview
              </button>
            </div>
            <p>
              Inventory is a comprehensive list of items present in each
              apartment, ranging from furniture to appliances and other
              essential household items. Each apartment has its own unique
              inventory, reflecting the diverse needs and preferences of the
              residents.
            </p>
            <h3 class="text-lg font-bold text-gray-600 my-5">
              Inventory List ({{ inventory.length }} items)
            </h3>
            <InventoryForm @addItem="addItem" />
            <InventoryList
              :inventory="this.selectedApartment.inventory"
              editable />
          </template>
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
    <InventoryList :inventory="this.inventory" />
    <button class="btn btn-primary" @click="approveList">Approve</button>
  </ModalDialog>
  {{ console.log(inventory, selectedApartment) }}
</template>

<script>
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
  data() {
    return {
      isLoading: true,
      isPreview: false,
      apartments: [],
      error: null,
      selectedApartment: null,
      inventory: [],
      updatedInventory: [],
    };
  },
  async mounted() {
    try {
      this.apartments = await getApartmentsData();
      this.selectedApartment = this.apartments[0] || null;
      this.isLoading = false;
    } catch (error) {
      console.error("Error fetching data:", error);
      this.isLoading = false;
      this.error = "Failed to fetch data. Please try again later.";
    }
  },
  methods: {
    selectApartment(apartment) {
      this.inventory = [];
      this.selectedApartment = apartment;
    },
    addItem(newItem) {
      if (newItem.name !== "" && newItem.quantity !== 0) {
        const existingItem = this.inventory.find(
          (item) => item.name === newItem.name
        );
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          this.inventory.push(newItem);
        }
        console.log(this.inventory, this.apartments);
      }
    },
    approveList() {
      this.selectedApartment.inventory = this.inventory;
      this.updatedInventory = [...this.selectedApartment.inventory];
      console.log(this.updatedInventory);
    },
    openModal() {
      this.isPreview = true;
    },
    closeModal() {
      this.isPreview = false;
    },
  },
};
</script>
