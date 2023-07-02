<template>
  <template v-if="isLoading">
    <div class="container mx-auto flex items-center justify-center">
      <span class="loading loading-dots loading-lg mr-5"></span> Loading data...
    </div>
  </template>
  <template v-else>
    <div
      class="container mx-auto md:flex-row flex-col flex justify-between md:gap-5">
      <div class="w-full md:w-2/5">
        <ApartmentList
          :apartments="apartments"
          :selectedApartment="selectedApartment"
          @selectApartment="selectApartment" />
        <template v-if="error">
          <div class="error-message">{{ error }}</div>
        </template>
      </div>
      <section class="w-full md:w-3/5">
        <template v-if="selectedApartment">
          <h2>
            {{ selectedApartment.address }} #{{ selectedApartment.floor }}-{{
              selectedApartment.doorNumber
            }}
          </h2>
          <InventoryList :inventory="selectedApartment.inventory" />
          <InventoryForm @addItem="addItem" />
        </template>
      </section>
    </div>
  </template>
</template>

<script>
import ApartmentList from "@/components/ApartmentList.vue";
import InventoryList from "@/components/InventoryList.vue";
import InventoryForm from "@/components/forms/Inventory.vue";
import { getApartmentsData } from "@/server/api/apartments.ts";

export default {
  name: "List of Apartments",
  components: {
    ApartmentList,
    InventoryList,
    InventoryForm,
  },
  data() {
    return {
      isLoading: true,
      apartments: [],
      error: null,
      selectedApartment: null,
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
      this.selectedApartment = apartment;
    },
    addItem(newItem) {
      if (newItem.name !== "" && newItem.quantity !== 0) {
        const existingItem = this.selectedApartment.inventory.find(
          (item) => item.name === newItem.name
        );
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          this.selectedApartment.inventory.push(newItem);
        }
      }
    },
  },
};
</script>
