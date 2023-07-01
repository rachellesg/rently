<template>
  <div class="container mx-auto">
    <h1 class="left">{{ pageTitle }}</h1>
    <template v-if="isLoading">
      <span class="loading loading-dots loading-lg"></span>
    </template>
    <template v-else>
      <ApartmentList :apartments="apartments" />
    </template>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ApartmentList from "@/components/ApartmentList.vue";

export default {
  name: "List of Apartments",
  components: {
    ApartmentList,
  },
  setup() {
    const pageTitle = ref("Apartment List");
    const isLoading = ref(true);
    const apartments = ref([]);

    onMounted(() => {
      isLoading.value = false;
      apartments.value = [
        { address: "6 Kim Tian Road", floor: 1, doorNumber: 46 },
        { address: "39 Punggol Drive", floor: 24, doorNumber: 288 },
        { address: "29 Nasim Avenue", floor: 0, doorNumber: 320 },
        { address: "266 Ang Mo Kio Avenue 1", floor: 8, doorNumber: 25 },
        { address: "Jurong East Street 56 Blk 246D", floor: 8, doorNumber: 25 },
      ];
    });

    return {
      pageTitle,
      isLoading,
      apartments,
    };
  },
};
</script>
