<template>
    <div class="od-page" v-if="order">
        <div class="row g-4">
            <div class="col-12 col-lg-9">
                <div class="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
                    <div>
                        <nav class="od-breadcrumb mb-2">
                            <RouterLink to="/profile/orders" class="text-decoration-none text-muted">Đơn hàng của tôi
                            </RouterLink>
                            <span class="mx-2 text-muted">/</span>
                            <span class="text-dark fw-bold">#{{ order.id }}</span>
                        </nav>
                        <h1 class="od-title mb-1">Chi tiết đơn hàng</h1>
                        <p class="od-subtitle mb-0">
                            <i class="bi bi-clock me-1"></i> Ngày đặt: {{ order.date }}
                        </p>
                    </div>
                    <div class="d-flex gap-2">
                        <button class="od-btn-secondary" @click="window.print()">
                            <i class="bi bi-printer me-2"></i>In hóa đơn
                        </button>
                        <button @click="reOrder" class="od-reorder-btn d-flex align-items-center gap-2">
                            <i class="bi bi-arrow-repeat"></i> Mua lại đơn này
                        </button>
                    </div>
                </div>

                <div class="od-info-grid mb-4 border shadow-sm rounded-4 overflow-hidden">
                    <div class="od-info-block p-4 border-end bg-white">
                        <p class="od-info-label text-uppercase small fw-bold text-muted mb-3">Địa chỉ nhận hàng</p>
                        <div class="d-flex gap-2">
                            <i class="bi bi-geo-alt text-secondary mt-1"></i>
                            <div>
                                <p class="fw-bold mb-1 text-dark">{{ order.fullname }}</p>
                                <p class="mb-1 text-muted small">{{ order.phone }}</p>
                                <p class="od-info-text text-dark mb-0">{{ order.address }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="od-info-block od-info-block--right p-4 bg-white">
                        <p class="od-info-label text-uppercase small fw-bold text-muted mb-3">Hình thức thanh toán</p>
                        <div class="d-flex align-items-center gap-3 mt-2">
                            <div class="od-card-icon">
                                <i class="bi bi-credit-card-2-front"></i>
                            </div>
                            <div>
                                <p class="fw-bold mb-0 text-dark" style="font-size:15px;">{{ order.paymentMethod }}</p>
                                <p class="mb-0 text-muted" style="font-size:13px;">
                                    Trạng thái: {{ order.status === 'pending' ? 'Chờ xác nhận' : 'Đã thanh toán' }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="od-items-card border shadow-sm p-4 bg-white rounded-4">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <p class="od-section-label mb-0 fw-bold">Sản phẩm trong đơn ({{ order.books?.length || 0 }})</p>
                        <span class="badge rounded-pill bg-light text-dark border px-3">Kiện hàng 1/1</span>
                    </div>

                    <div class="d-flex flex-column gap-3">
                        <div v-for="item in order.books" :key="item.id"
                            class="d-flex align-items-center gap-4 py-3 border-bottom">
                            <div class="od-book-cover shadow-sm">
                                <img :src="item.imageUrl || item.image" :alt="item.title"
                                    class="w-100 h-100 object-fit-cover rounded-2" />
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fw-bolder mb-1" style="font-size:17px; color:#191C1D;">{{ item.title }}</h5>
                                <p class="mb-2 text-muted" style="font-size:14px;">
                                    {{ item.author || 'Tác giả' }} | <span class="text-secondary">{{ item.format ||
                                        'Bản in' }}
                                    </span>
                                </p>
                                <div class="d-flex align-items-center gap-3 mt-1">
                                    <span class="od-qty-badge text-muted">Số lượng: {{ item.quantity }}</span>
                                    <span class="fw-bold fs-6" style="color:#904D00;">{{ formatPrice(item.salePrice ||
                                        item.price) }}</span>
                                </div>
                            </div>
                            <button class="product-wish-btn" :class="{ 'is-active': isWishlisted }"
                                @click.stop="toggleWishlist">
                                <i :class="isWishlisted ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                            </button>
                        </div>
                    </div>

                    <div class="pt-4 mt-2 ms-auto" style="max-width: 350px;">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-secondary">Tạm tính</span>
                            <span class="fw-medium text-dark">{{ formatPrice(order.total) }}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-secondary">Phí vận chuyển</span>
                            <span class="fw-medium text-success">Miễn phí</span>
                        </div>
                        <div class="d-flex justify-content-between pt-3 mt-2 border-top">
                            <span class="fw-bold fs-5 text-dark">Tổng thanh toán</span>
                            <span class="fw-bolder fs-4" style="color:#904D00;">{{ formatPrice(order.total) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-3">
                <div class="od-timeline-card border shadow-sm p-4 bg-white rounded-4">
                    <p class="od-section-label mb-4 fw-bold">Hành trình đơn hàng</p>
                    <div class="position-relative ps-2">
                        <div class="od-timeline-line"></div>
                        <div class="d-flex flex-column gap-4">
                            <div v-for="(step, i) in timeline" :key="i"
                                class="od-timeline-step d-flex gap-3 position-relative"
                                :class="{ 'od-step--pending': step.status === 'pending' }">
                                <div class="od-dot-wrap">
                                    <div class="od-dot" :class="{
                                        'od-dot--done': step.status === 'done',
                                        'od-dot--active': step.status === 'active',
                                        'od-dot--pending': step.status === 'pending'
                                    }">
                                        <i v-if="step.status === 'done'" class="bi bi-check-lg text-white"></i>
                                        <div v-else-if="step.status === 'active'" class="od-dot-pulse"></div>
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                    <p class="fw-bold mb-0"
                                        :style="step.status === 'active' ? 'color:#FF8C00;' : 'color:#191C1D;'"
                                        style="font-size:14px;">{{ step.label }}</p>
                                    <p class="mb-0 text-muted" style="font-size:12px;">{{ step.time }}</p>
                                    <div v-if="step.note" class="od-step-note mt-2">
                                        <p class="mb-0 small text-secondary">{{ step.note }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="container text-center py-5">
        <div class="spinner-border text-warning mb-3"></div>
        <p>Đang tải thông tin đơn hàng...</p>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter();
const order = ref(null);
const isWishlisted = ref(false);


onMounted(() => {
    const orderId = route.params.id;
    const allOrders = JSON.parse(localStorage.getItem('user_orders')) || [];
    const found = allOrders.find(o => String(o.id) === String(orderId));

    if (found) {
        order.value = found;
    } else {
        router.push('/profile/orders');
    }

    checkWishlistStatus();
});

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const reOrder = () => {
    if (!order.value || !order.value.books) return;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    order.value.books.forEach(book => {
        const existing = cart.find(c => c.id === book.id);
        if (existing) {
            existing.quantity += book.quantity;
        } else {
            cart.push({ ...book });
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    router.push('/cart');
};


const checkWishlistStatus = () => {
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (order.value) {
    
    }
};

const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event('storage'));
};


const timeline = computed(() => {
    if (!order.value) return [];

    const isPending = order.value.status === 'pending';
    const isCanceled = order.value.status === 'canceled';

    if (isCanceled) {
        return [
            { label: 'Đã đặt hàng', time: order.value.date, status: 'done' },
            { label: 'Đã hủy đơn', time: 'Yêu cầu từ bạn', status: 'active', note: 'Đơn hàng này đã bị hủy.' }
        ];
    }

    return [
        { label: 'Đặt hàng thành công', time: order.value.date, status: 'done', note: 'Đơn hàng đã được ghi nhận.' },
        { label: 'Đang chuẩn bị hàng', time: isPending ? 'Chờ xử lý' : order.value.date, status: isPending ? 'active' : 'done' },
        { label: 'Đang giao hàng', time: isPending ? 'Dự kiến 2-3 ngày' : 'Đang trên đường', status: isPending ? 'pending' : 'active' },
        { label: 'Giao hàng thành công', time: '--:--', status: 'pending' }
    ];
});
</script>

<style scoped>
.od-book-cover {
    width: 60px;
    height: 85px;
    flex-shrink: 0;
}

.od-card-icon {
    width: 45px;
    height: 45px;
    background: #f8f9fa;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #FF8C00;
}

.od-reorder-btn {
    background: #FF8C00;
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 10px;
    font-weight: 600;
    transition: 0.3s;
}

.od-reorder-btn:hover {
    background: #e67e00;
    transform: translateY(-2px);
}

.od-btn-secondary {
    background: white;
    border: 1px solid #dee2e6;
    padding: 8px 20px;
    border-radius: 10px;
    transition: 0.2s;
}

.od-btn-secondary:hover {
    background: #f8f9fa;
}

.od-timeline-line {
    position: absolute;
    width: 2px;
    left: 18px;
    top: 10px;
    bottom: 10px;
    background: #F3F4F5;
}

.od-dot-wrap {
    z-index: 1;
}

.od-dot {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.od-dot--done {
    background: #191C1D;
}

.od-dot--active {
    background: #FF8C00;
    box-shadow: 0 0 0 4px #FFF7ED;
}

.od-dot--pending {
    background: #E1E3E4;
    border: 2px solid #fff;
}

.od-dot-pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(0.95);
        opacity: 0.7;
    }

    70% {
        transform: scale(1.2);
        opacity: 1;
    }

    100% {
        transform: scale(0.95);
        opacity: 0.7;
    }
}
</style>