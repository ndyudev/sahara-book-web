<template>
    <div class="product-card">
        <RouterLink :to="`/product/${book.id}`" class="product-link">
            <div class="product-img-wrap">
                <img :src="book.imageUrl || book.image" :alt="book.title" class="product-img"
                    referrerpolicy="no-referrer" />

                <span v-if="book.badge" class="product-badge"
                    :class="book.badge === 'NEW' ? 'badge-new' : 'badge-sale'">
                    {{ book.badge }}
                </span>
            </div>
        </RouterLink>

        <div class="product-info">
            <span class="product-category">{{ book.category }}</span>
            <p class="product-title">{{ book.title }}</p>
            <p class="product-desc">{{ book.description }}</p>
        </div>

        <div class="product-info pt-0">
            <div class="product-footer">
                <div class="price-stack">
                    <span class="product-price">{{ formatPrice(book.salePrice) }}</span>
                    <span v-if="book.originalPrice > book.salePrice" class="product-price-old">
                        {{ formatPrice(book.originalPrice) }}
                    </span>
                </div>
                <button class="product-cart-btn" @click.stop="addToCart">
                    <i class="bi bi-bag-plus"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    book: { type: Object, required: true }
})

const addToCart = () => {
    const cartData = localStorage.getItem('cart');
    let cart = cartData ? JSON.parse(cartData) : [];

    const index = cart.findIndex(item => item.id === props.book.id);

    if (index !== -1) {
        cart[index].quantity += 1;
        // Cập nhật lại giá mới nhất nếu lỡ giá trong kho thay đổi
        cart[index].price = Number(props.book.salePrice) || 0;
    } else {
        const newProduct = {
            id: props.book.id,
            title: props.book.title,
            price: Number(props.book.salePrice) || 0,
            image: props.book.imageUrl || props.book.image,
            quantity: 1
        };
        cart.push(newProduct);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    alert(`Đã thêm "${props.book.title}" vào giỏ hàng!`);
}

const formatPrice = (p) => {
    const value = Number(p) || 0
    return value.toLocaleString('vi-VN') + 'đ'
}
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

.price-stack {
    display: flex;
    flex-direction: column;
}

.product-price-old {
    font-size: 11px;
    color: #94A3B8;
    text-decoration: line-through;
    font-weight: 500;
}

.badge-new {
    background: #FF8C00;
}
</style>