<template>
    <div class="pagination-wrap">
        <button class="page-btn"><i class="bi bi-chevron-left"></i></button>
        <button v-for="page in pages" :key="page" class="page-btn" :class="{ active: currentPage === page }"
            @click="$emit('changePage', page)">
            {{ page }}
        </button>
        <span class="page-dots">...</span>
        <button class="page-btn" @click="$emit('changePage', 12)">12</button>
        <button class="page-btn"><i class="bi bi-chevron-right"></i></button>
    </div>
</template>

<script setup>
defineProps({
    pages: { type: Array, required: true },
    currentPage: { type: Number, required: true },
})
defineEmits(['changePage'])
</script>

<style>
.pagination-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.page-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(144, 77, 0, 0.15);
    border-radius: 8px;
    background: transparent;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #564334;
    cursor: pointer;
    transition: all .15s;
}

.page-btn.active,
.page-btn:hover {
    background: #FF8C00;
    color: #fff;
    border-color: #FF8C00;
}

.page-dots {
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    color: #94A3B8;
}
</style>