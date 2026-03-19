<template>
    <aside class="filter-sidebar">
        <div class="filter-header">
            <i class="bi bi-sliders"></i>
            <span>Bộ lọc</span>
        </div>

        <div class="filter-group">
            <label class="filter-label">Tên sách</label>
            <div class="filter-search-wrap">
                <i class="bi bi-search filter-search-icon"></i>
                <input type="text" class="filter-input" placeholder="Tìm kiếm..." v-model="filters.search" />
            </div>
        </div>

        <div class="filter-group">
            <label class="filter-label">Danh mục</label>
            <div class="filter-check-list">
                <label v-for="cat in categoryOptions" :key="cat.value" class="filter-check-item">
                    <input type="checkbox" :value="cat.value" v-model="filters.categories" class="filter-checkbox" />
                    <span>{{ cat.label }}</span>
                </label>
            </div>
        </div>

        <div class="filter-group">
            <label class="filter-label">Khoảng giá</label>
            <input type="range" min="0" max="1000000" step="10000" v-model="filters.maxPrice" class="filter-range" />
            <div class="filter-price-row">
                <span>0đ</span>
                <span>{{ Number(filters.maxPrice).toLocaleString('vi-VN') }}đ</span>
            </div>
        </div>

        <button class="filter-apply-btn" @click="$emit('apply')">Áp dụng lọc</button>
    </aside>
</template>

<script setup>
defineProps({
    filters: { type: Object, required: true },
    categoryOptions: { type: Array, required: true },
})
defineEmits(['apply'])
</script>

<style>
.filter-sidebar {
    background: #fff;
    border: 1px solid rgba(144, 77, 0, 0.1);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: sticky;
    top: 80px;
}

.filter-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #191C1D;
}

.filter-header i {
    color: #FF8C00;
    font-size: 18px;
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.filter-label {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 13px;
    color: #191C1D;
}

.filter-search-wrap {
    position: relative;
}

.filter-search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #94A3B8;
    font-size: 13px;
    pointer-events: none;
}

.filter-input {
    width: 100%;
    height: 40px;
    padding: 0 12px 0 34px;
    border: 1px solid rgba(144, 77, 0, 0.15);
    border-radius: 8px;
    font-family: 'Manrope', sans-serif;
    font-size: 13px;
    color: #191C1D;
    background: #F8F7F5;
    outline: none;
}

.filter-input:focus {
    border-color: rgba(144, 77, 0, 0.4);
    box-shadow: 0 0 0 3px rgba(144, 77, 0, 0.08);
}

.filter-check-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.filter-check-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    color: #191C1D;
    cursor: pointer;
}

.filter-checkbox {
    width: 16px;
    height: 16px;
    accent-color: #FF8C00;
    flex-shrink: 0;
    cursor: pointer;
}

.filter-range {
    width: 100%;
    accent-color: #FF8C00;
}

.filter-price-row {
    display: flex;
    justify-content: space-between;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: hsl(46, 95%, 25%);
}

.filter-apply-btn {
    width: 100%;
    height: 44px;
    background: #FF8C00;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
}

.filter-apply-btn:hover {
    background: #7a4100;
}
</style>