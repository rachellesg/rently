<template>
  <div>
    <ul>
      <li
        v-for="apartment in apartments"
        :key="apartment.id"
        @click="selectApartment(apartment)"
        :class="{
          'text-pink-500 font-bold': selectedApartment === apartment,
          'hover:bg-stone-900 light:border-gray-200 p-3 hover:text-pink-500 hover:font-bold cursor-pointer': true,
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
li {
  list-style-type: none;
}
</style>
