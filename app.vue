<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

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
</style>

<template>
  <div>
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
