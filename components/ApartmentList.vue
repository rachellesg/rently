<template>
  <div>
    <h2>Apartment List</h2>
    <ul>
      <li v-for="apartment in apartments" :key="apartment.id">
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
