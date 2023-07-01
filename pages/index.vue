<template>
  <div class="container mx-auto">
    <h1 class="left">{{ pageTitle }}</h1>
    <template v-if="isLoading">
      <span class="loading loading-dots loading-lg"></span>
    </template>
    <template v-else>
      <ApartmentList :apartments="apartments" />
      <template v-if="error">
        <div class="error-message">{{ error }}</div>
      </template>
    </template>
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
      pageTitle: "Apartment List",
      isLoading: true,
      apartments: [],
      error: null,
    };
  },
  async mounted() {
    try {
      this.apartments = await getApartmentsData();
      this.isLoading = false;
    } catch (error) {
      console.error("Error fetching data:", error);
      this.isLoading = false;
      this.error = "Failed to fetch data. Please try again later.";
    }
  },
};
</script>
