<template>
    <div class="product-card">
        <div class="product-img-wrap">
            <img :src="book.image" :alt="book.title" class="product-img" referrerpolicy="no-referrer" />
            <span v-if="book.badge" class="product-badge" :class="book.badge === 'New' ? 'badge-new' : 'badge-sale'">
                {{ book.badge }}
            </span>
        </div>
        <div class="product-info">
            <span class="product-category">{{ book.category }}</span>
            <p class="product-title">{{ book.title }}</p>
            <p class="product-desc">{{ book.desc }}</p>
            <div class="product-footer">
                <span class="product-price">{{ book.price }}</span>
                <button class="product-cart-btn">
                    <i class="bi bi-bag-plus"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({ book: { type: Object, required: true } })
</script>

<style>
.product-card {
    background: #fff;
    border: 1px solid rgba(144, 77, 0, 0.08);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: box-shadow .2s, transform .2s;
}

.product-card:hover {
    box-shadow: 0 8px 24px rgba(144, 77, 0, 0.1);
    transform: translateY(-3px);
}

.product-img-wrap {
    position: relative;
    aspect-ratio: 4/3;
    background: #F3F4F5;
    overflow: hidden;
}

.product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .4s;
}

.product-card:hover .product-img {
    transform: scale(1.05);
}

.product-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 3px 10px;
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 11px;
}

.badge-sale {
    background: #ef4444;
    color: #fff;
}

.badge-new {
    background: #FF8C00;
    color: #fff;
}

.product-info {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.product-category {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: #FF8C00;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.product-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #191C1D;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.product-desc {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #64748B;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.product-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
}

.product-price {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: #FF8C00;
}

.product-cart-btn {
    width: 34px;
    height: 34px;
    background: rgba(144, 77, 0, 0.08);
    border: none;
    border-radius: 8px;
    color: #FF8C00;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background .15s;
}

.product-cart-btn:hover {
    background: #FF8C00;
    color: #fff;
}
</style>