
<template>
  <div class="user-portal">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue"; 
import Footer from "../components/Footer.vue";
</script>

<style>
@import "@/assets/style.scss";
</style>