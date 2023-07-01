<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Rently App",
  components: {
    Footer,
    Header,
  },
};
</script>

<style>
@import "daisyui/dist/full.css";

@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>

<template>
  <div>
    <Header />
    <h1>Welcome</h1>
    <slot />
    <Footer />
  </div>
</template>
