<template>
    <div class="wishlist-page">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 class="wish-title mb-1">Danh sách yêu thích</h2>
                <p class="text-muted small mb-0">Lưu lại những sản phẩm bạn quan tâm để mua sau.</p>
            </div>
            <span class="badge rounded-pill bg-white text-dark border px-3 py-2 shadow-sm">
                <i class="bi bi-heart-fill text-danger me-2"></i>{{ wishlistItems.length }} sản phẩm
            </span>
        </div>

        <div v-if="wishlistItems.length > 0" class="row g-4">
            <div v-for="item in wishlistItems" :key="item.id" class="col-12 col-md-6 col-xl-4">
                <div class="wish-card shadow-sm border-0">
                    <div class="wish-img-container">
                        <img :src="item.image" :alt="item.name" class="wish-img">
                        <button @click="removeFromWishlist(item.id)" class="wish-remove-btn" title="Xóa khỏi danh sách">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>

                    <div class="wish-content p-3">
                        <h5 class="wish-item-name text-truncate" :title="item.name">{{ item.name }}</h5>
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <span class="wish-price">{{ formatPrice(item.price) }}</span>
                            <span v-if="item.oldPrice" class="wish-old-price text-decoration-line-through">
                                {{ formatPrice(item.oldPrice) }}
                            </span>
                        </div>

                        <div class="d-grid gap-2">
                            <button @click="moveToCart(item)" class="wish-add-cart-btn">
                                <i class="bi bi-cart-plus me-2"></i>Chuyển vào giỏ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-5 empty-state-container">
            <div class="mb-4">
                <div class="empty-icon-circle">
                    <i class="bi bi-heart text-muted"></i>
                </div>
            </div>
            <h4 class="fw-bold">Danh sách đang trống</h4>
            <p class="text-muted mb-4">Có vẻ như bạn chưa thích sản phẩm nào. <br>Hãy khám phá thêm hàng ngàn sản phẩm
                hấp dẫn nhé!</p>
            <RouterLink to="/product" class="btn btn-dark px-5 py-2 rounded-pill fw-bold">
                Tiếp tục mua sắm
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const wishlistItems = ref([])

const loadWishlist = () => {
    try {
        const saved = JSON.parse(localStorage.getItem('wishlist')) || []
        wishlistItems.value = saved
    } catch (e) {
        console.error("Lỗi khi tải wishlist:", e)
        wishlistItems.value = []
    }
}

const handleStorageChange = (e) => {
    if (e.key === 'wishlist') loadWishlist()
}

onMounted(() => {
    loadWishlist()
    window.addEventListener('storage', handleStorageChange)
})

onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange)
})

const removeFromWishlist = (id) => {
    wishlistItems.value = wishlistItems.value.filter(item => item.id !== id)
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems.value))
    window.dispatchEvent(new Event('storage'))
}

const moveToCart = (item) => {
    const cartData = localStorage.getItem('cart')
    let cart = cartData ? JSON.parse(cartData) : []

    const index = cart.findIndex(c => c.id === item.id)
    if (index !== -1) {
        cart[index].quantity += 1
    } else {
        cart.push({
            id: item.id,
            title: item.name,
            price: Number(item.price) || 0,
            image: item.image,
            quantity: 1
        })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('storage'))

    removeFromWishlist(item.id)

    console.log(`Đã thêm ${item.name} vào giỏ hàng thành công!`)
}

const formatPrice = (p) => {
    const value = Number(p) || 0
    return value.toLocaleString('vi-VN') + 'đ'
}
</script>

<style scoped>
.wish-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    color: #191C1D;
    font-size: 28px;
}

.wish-card {
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.wish-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}

.wish-img-container {
    position: relative;
    aspect-ratio: 1/1;
    /* Chuyển sang tỉ lệ 1:1 cho gọn hoặc giữ 3/4 tùy bạn */
    background: #f8f9fa;
    overflow: hidden;
}

.wish-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.wish-card:hover .wish-img {
    transform: scale(1.08);
}

.wish-remove-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    backdrop-filter: blur(4px);
    transition: 0.2s;
}

.wish-remove-btn:hover {
    background: #fee2e2;
    color: #ef4444;
}

.wish-item-name {
    font-size: 17px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 6px;
}

.wish-price {
    color: #f59e0b;
    /* Màu cam thương hiệu của bạn */
    font-weight: 800;
    font-size: 19px;
}

.wish-old-price {
    font-size: 14px;
    color: #94a3b8;
}

.wish-add-cart-btn {
    background: #1e293b;
    color: #fff;
    border: none;
    padding: 12px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 14px;
    transition: 0.3s;
}

.wish-add-cart-btn:hover {
    background: #f59e0b;
    transform: translateY(-2px);
}

/* Empty State Styles */
.empty-state-container {
    background: #f8fafc;
    border-radius: 30px;
    margin-top: 2rem;
}

.empty-icon-circle {
    width: 120px;
    height: 120px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-size: 50px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}
</style>