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

                <div class="d-flex gap-2">
                    <button class="product-wish-btn" :class="{ 'is-active': isWishlisted }"
                        @click.stop="toggleWishlist">
                        <i :class="isWishlisted ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                    </button>
                    <button class="product-cart-btn" @click.stop="addToCart">
                        <i class="bi bi-bag-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const toat = useToast();

const props = defineProps({
    book: { type: Object, required: true }
})
const isWishlisted = ref(false)

const checkWishlistStatus = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    isWishlisted.value = wishlist.some(item => item.id === props.book.id)
}

onMounted(() => {
    checkWishlistStatus()
})

const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    const index = wishlist.findIndex(item => item.id === props.book.id)

    if (index > -1) {
        wishlist.splice(index, 1)
        isWishlisted.value = false
    } else {

        wishlist.push({
            id: props.book.id,
            name: props.book.title,
            price: props.book.salePrice,
            image: props.book.imageUrl || props.book.image
        })
        isWishlisted.value = true
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist))

    window.dispatchEvent(new Event('storage'))
}

const addToCart = () => {
    const cartData = localStorage.getItem('cart');
    let cart = cartData ? JSON.parse(cartData) : [];

    const index = cart.findIndex(item => item.id === props.book.id);

    if (index !== -1) {
        cart[index].quantity += 1;
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
    toat.success(`Đã thêm "${props.book.title}" vào giỏ hàng!`, {
        timeout: 2000,
        icon: "bi-bag-plus",
        closeOnClick: true,
        pauseOnHover: false
    });
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

/* Nút yêu thích */
.product-wish-btn {
    width: 34px;
    height: 34px;
    background: rgba(239, 68, 68, 0.05);
    /* Màu đỏ nhạt */
    border: 1px solid rgba(239, 68, 68, 0.1);
    border-radius: 8px;
    color: #ef4444;
    /* Màu đỏ trái tim */
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.product-wish-btn:hover {
    background: rgba(239, 68, 68, 0.1);
    transform: scale(1.1);
}

.product-wish-btn.is-active {
    background: #ef4444;
    color: #fff;
    border-color: #ef4444;
}

/* Điều chỉnh lại layout footer một chút */
.product-footer {
    display: flex;
    align-items: flex-end;
    /* Căn nút xuống dưới cùng */
    justify-content: space-between;
}
</style>