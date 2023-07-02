<template>
  <div>
    <ul>
      <li
        v-for="apartment in apartments"
        :key="apartment.id"
        @click="selectApartment(apartment)"
        :class="{
          'text-pink-500 font-bold': selectedApartment === apartment,
          'border-b border-gray-200 pb-3 hover:text-pink-500 hover:font-bold cursor-pointer': true,
        }">
        {{ apartment.address }}, {{ apartment.floor }}-{{
          apartment.doorNumber
        }}
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
</style>
