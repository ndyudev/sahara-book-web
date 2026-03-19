<template>
      <div class="min-vh-100 d-flex flex-column bg-surface text-on-surface">
        <main class="container-xl py-5">
            <HeroSection class="mb-5" />
            <Category class="mb-5" />
            <FlashSale class="mb-5" />
            <ShoppingTrends class="mb-5" />
            <WeekRanning class="mb-5" />
            <Recommended />
        </main>
    </div>
</template>

<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import Category from '../components/home/Category.vue';
import FlashSale from '../components/home/FlashSale.vue';
import ShoppingTrends from '../components/home/ShoppingTrends.vue';
import WeekRanning from '../components/home/WeekRanning.vue';
import Recommended from '../components/home/Recommended.vue';
</script>

<style lang="scss" scoped></style>
