<template>
    <aside class="suggest-sidebar">
        <div class="suggest-header">
            <i class="bi bi-stars" style="color: #FF8C00;"></i>
            <span>Gợi ý cho bạn</span>
        </div>
        <div class="suggest-list">
            <div v-for="book in books" :key="book.id" class="suggest-item">
                <div class="suggest-img-wrap">
                    <img :src="book.image" :alt="book.title" class="suggest-img" referrerpolicy="no-referrer" />
                </div>
                <div>
                    <p class="suggest-title">{{ book.title }}</p>
                    <p class="suggest-author">{{ book.author }}</p>
                </div>
            </div>
        </div>
        <a href="#" class="suggest-see-all">Xem tất cả</a>
    </aside>
</template>

<script setup>
defineProps({ books: { type: Array, required: true } })
</script>

<style>
.suggest-sidebar {
    background: #fff;
    border: 1px solid rgba(144, 77, 0, 0.1);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: sticky;
    top: 80px;
}

.suggest-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: #191C1D;
}

.suggest-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.suggest-item {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.suggest-img-wrap {
    width: 52px;
    height: 52px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    background: #F3F4F5;
}

.suggest-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.suggest-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 13px;
    color: #191C1D;
    margin: 0 0 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 130px;
}

.suggest-author {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: #94A3B8;
    margin: 0;
}

.suggest-see-all {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 13px;
    color: #FF8C00;
    text-decoration: none;
    text-align: center;
}
</style>