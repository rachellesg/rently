<template>
  <div class="container mx-auto flex justify-between">
    <div class="w-2/5">
      <template v-if="isLoading">
        <span class="loading loading-dots loading-lg"></span>
      </template>
      <template v-else>
        <ApartmentList
          :apartments="apartments"
          :selectedApartment="selectedApartment"
          @selectApartment="selectApartment" />
        <template v-if="error">
          <div class="error-message">{{ error }}</div>
        </template>
      </template>
    </div>
    <section class="w-3/5">
      <template v-if="selectedApartment">
        <h2>{{ selectedApartment.address }}</h2>
      </template>
    </section>
  </div>
</template>

<script>
import ApartmentList from "@/components/ApartmentList.vue";
import { getApartmentsData } from "@/server/api/apartments.ts";

export default {
  name: "ApartmentsIndex",
  components: {
    ApartmentList,
  },
  data() {
    return {
      isLoading: true,
      apartments: [],
      inventory: [],
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
  },
};
</script>
