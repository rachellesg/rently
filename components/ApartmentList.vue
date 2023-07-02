<template>
  <div>
    <ul>
      <li
        v-for="apartment in apartments"
        :key="apartment.id"
        @click="selectApartment(apartment)"
        :class="{ active: selectedApartment === apartment }">
        <strong>Address:</strong> {{ apartment.address }}<br />
        <strong>Floor:</strong> {{ apartment.floor }}<br />
        <strong>Door Number:</strong> {{ apartment.doorNumber }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ApartmentList",
  props: {
    apartments: {
      type: Array,
      required: true,
    },
    selectedApartment: {
      type: Object,
      default: () => null,
    },
  },
  methods: {
    selectApartment(apartment) {
      this.$emit("selectApartment", apartment);
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}

li {
  margin-bottom: 20px;
  list-style-type: none;
}
.active {
  border: 1px solid white;
}
</style>
