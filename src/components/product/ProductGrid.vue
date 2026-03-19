<template>
    <div class="product-grid">
        <ProductCard v-for="book in books" :key="book.id" :book="book" />
    </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
defineProps({ books: { type: Array, required: true } })
</script>

<style>
.product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

</style>