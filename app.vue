<script>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  name: "Rently App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
@import "daisyui/dist/full.css";
</style>

<template>
  <div class="flex flex-col h-screen bg-stone-50 dark:bg-stone-900">
    <Header />
    <main class="flex flex-1">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
