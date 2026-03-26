<template>
    <div class="oh-page">
        <div class="row align-items-end mb-4 g-3">
            <div class="col-md-7">
                <h2 class="oh-title mb-1">Lịch sử đơn hàng</h2>
                <p class="oh-subtitle mb-0 text-muted">Theo dõi, quản lý và mua lại các cuốn sách bạn yêu thích.</p>
            </div>
            <div class="col-md-5 d-flex justify-content-md-end">
                <div class="oh-tabs p-1 shadow-sm">
                    <button v-for="tab in tabs" :key="tab.value" class="oh-tab"
                        :class="{ 'oh-tab--active': activeTab === tab.value }" @click="activeTab = tab.value">
                        {{ tab.label }}
                    </button>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-12 col-lg-9">
                <div v-if="filteredOrders.length > 0" class="d-flex flex-column gap-3">
                    <div v-for="order in filteredOrders" :key="order.id" class="oh-card shadow-sm border" :class="{
                        'oh-card--pending': order.status === 'pending',
                        'oh-card--canceled': order.status === 'canceled',
                    }">

                        <div class="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
                            <div class="d-flex align-items-center gap-3 gap-md-4">
                                <div>
                                    <p class="oh-meta-label">Mã đơn</p>
                                    <p class="oh-meta-value oh-meta-value--id">#{{ order.id }}</p>
                                </div>
                                <div class="oh-vdivider"></div>
                                <div>
                                    <p class="oh-meta-label">Ngày đặt</p>
                                    <p class="oh-meta-value">{{ order.date }}</p>
                                </div>
                                <div class="oh-vdivider d-none d-sm-block"></div>
                                <div class="d-none d-sm-block">
                                    <p class="oh-meta-label">Tổng tiền</p>
                                    <p class="oh-meta-value oh-meta-value--total">{{ formatPrice(order.total) }}</p>
                                </div>
                            </div>

                            <div class="d-flex align-items-center gap-2">
                                <span class="oh-badge" :class="order.status ? `oh-badge--${order.status}` : ''">
                                    <span class="oh-badge-dot"></span>
                                    {{ statusLabel[order.status] }}
                                </span>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between align-items-center pt-3 oh-card-footer border-top">
                            <div class="oh-covers">
                                <div v-for="(book, i) in order.books?.slice(0, 3) || []" :key="i" class="oh-cover-wrap"
                                    :style="{ marginLeft: i > 0 ? '-15px' : '0', zIndex: 10 - i }">
                                    <img :src="book.imageUrl" :alt="book.title" class="oh-cover"
                                        :class="order.status === 'canceled' ? 'oh-cover--grayscale' : ''" />
                                </div>
                                <div v-if="order.books.length > 3" class="oh-cover-more" style="margin-left: -15px;">
                                    +{{ order.books.length - 3 }}
                                </div>
                            </div>

                            <div class="oh-actions d-flex align-items-center gap-2">
                                <template v-if="order.status === 'delivered'">
                                    <button @click="reOrder(order)" class="oh-btn oh-btn--primary">
                                        <i class="bi bi-arrow-repeat me-2"></i>Mua lại
                                    </button>
                                    <RouterLink :to="`/profile/orders/${order.id}`" class="oh-btn oh-btn--outline">
                                        Xem chi tiết
                                    </RouterLink>
                                </template>

                                <template v-else-if="order.status === 'pending'">
                                    <div class="d-none d-md-block text-end me-3">
                                        <p class="oh-book-eta mb-0 text-warning fw-bold">{{ order.eta }}</p>
                                    </div>
                                    <button @click="cancelOrder(order.id)" class="oh-btn oh-btn--danger-soft">Hủy
                                        đơn</button>
                                    <RouterLink :to="`/profile/orders/${order.id}`" class="oh-btn oh-btn--outline">
                                        Theo dõi
                                    </RouterLink>
                                </template>

                                <template v-else>
                                    <button class="oh-btn oh-btn--outline">Xem lý do hủy</button>
                                    <button @click="reOrder(order)" class="oh-btn oh-btn--primary-soft">Thử lại</button>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="oh-empty bg-white shadow-sm border">
                    <div class="oh-empty-icon mb-4">
                        <i class="bi bi-journal-x"></i>
                    </div>
                    <h4 class="fw-bold text-dark">Chưa có đơn hàng nào</h4>
                    <p class="text-muted mb-4">Bạn chưa thực hiện giao dịch nào. Hãy bắt đầu hành trình đọc sách của
                        mình ngay!</p>
                    <RouterLink to="/product" class="oh-btn oh-btn--primary px-5 py-3">
                        Tiếp tục mua sắm
                    </RouterLink>
                </div>
            </div>

            <div class="col-12 col-lg-3">
                <div class="sticky-top" style="top: 20px;">
                    <div class="oh-widget-card oh-loyalty-card bg-white border shadow-sm">
                        <p class="oh-loyalty-label">Hạng thành viên</p>
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <i class="bi bi-gem text-primary fs-4"></i>
                            <span class="oh-loyalty-pts">1,250</span>
                            <span class="text-muted small mt-2">điểm</span>
                        </div>
                        <div class="progress mb-2" style="height: 6px;">
                            <div class="progress-bar bg-warning" role="progressbar" style="width: 75%"></div>
                        </div>
                        <p class="oh-loyalty-hint">250 điểm nữa để lên hạng <strong>Vàng</strong>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue'
import { useToast } from "vue-toastification"

const toast = useToast()
const activeTab = ref('all')
const orders = ref([])

const tabs = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Đã giao', value: 'delivered' },
    { label: 'Đang xử lý', value: 'pending' },
]

const statusLabel = {
    delivered: 'Thành công',
    pending: 'Chờ giao',
    canceled: 'Đã hủy',
}

onMounted(() => {
    const savedOrders = JSON.parse(localStorage.getItem('user_orders')) || []
    orders.value = savedOrders.filter(o => o && o.id && o.status)
})

const filteredOrders = computed(() =>
    activeTab.value === 'all'
        ? orders.value
        : orders.value.filter(o => o.status === activeTab.value)
)

const formatPrice = (p) => {
    if (!p) return '0đ';
    return p.toLocaleString('vi-VN') + 'đ';
}

// HÀM HỦY ĐƠN HÀNG VỚI TOAST XÁC NHẬN
const cancelOrder = (id) => {
    toast.warning({
        component: {
            render() {
                return h('div', { class: 'p-1' }, [
                    h('p', { class: 'mb-2 small text-dark' }, [
                        'Bạn chắc chắn muốn hủy đơn hàng ',
                        h('strong', `#${id}`),
                        '?'
                    ]),
                    h('div', { class: 'd-flex gap-2' }, [
                        h('button', {
                            class: 'btn btn-danger btn-sm px-3 fw-bold border-0',
                            onClick: () => {
                                this.$emit("close-toast");
                                executeCancel(id);
                            }
                        }, 'Xác nhận hủy'),
                        h('button', {
                            class: 'btn btn-light btn-sm px-3 border',
                            onClick: () => this.$emit("close-toast")
                        }, 'Quay lại')
                    ])
                ])
            }
        }
    }, {
        timeout: 5000,
        closeOnClick: false,
        icon: "bi bi-exclamation-circle-fill"
    });
}

const executeCancel = (id) => {
    const index = orders.value.findIndex(o => o.id === id)
    if (index !== -1) {
        orders.value[index].status = 'canceled'
        localStorage.setItem('user_orders', JSON.stringify(orders.value))
        window.dispatchEvent(new Event('storage'))
        toast.error(`Đã hủy đơn hàng #${id}`, { timeout: 2000 });
    }
}

const reOrder = (order) => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || []

    order.books.forEach(book => {
        const exists = cart.find(item => item.id === book.id)
        if (exists) {
            exists.quantity += 1
        } else {
            cart.push({ ...book, quantity: 1 })
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(cart))
    window.dispatchEvent(new Event('storage'))

    toast.success(`Đã thêm ${order.books.length} sản phẩm vào giỏ hàng!`, {
        icon: "bi bi-cart-check-fill",
        timeout: 3000
    });
}
</script>

<style scoped>
.oh-page {
    font-family: 'Manrope', sans-serif;
}


.oh-tabs {
    background: #eee;
    border-radius: 12px;
    display: inline-flex;
}

.oh-tab {
    border: none;
    background: none;
    padding: 8px 20px;
    font-size: 14px;
    font-weight: 600;
    color: #666;
    border-radius: 9px;
    transition: 0.2s;
}

.oh-tab--active {
    background: #fff;
    color: #FF8C00;
}

.oh-card {
    background: #fff;
    border-radius: 16px;
    padding: 20px;
    transition: transform 0.2s;
}

.oh-card:hover {
    transform: translateY(-2px);
}

.oh-card--pending {
    border-left: 5px solid #ffc107 !important;
}

.oh-card--canceled {
    background: #fcfcfc;
}

.oh-meta-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #999;
    margin: 0;
}

.oh-meta-value {
    font-weight: 700;
    color: #333;
    margin: 0;
}

.oh-meta-value--total {
    color: #FF8C00;
}

.oh-vdivider {
    width: 1px;
    height: 30px;
    background: #eee;
}

/* Badges */
.oh-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
}

.oh-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
}

.oh-badge--delivered {
    background: #e8f5e9;
    color: #2e7d32;
}

.oh-badge--delivered .oh-badge-dot {
    background: #2e7d32;
}

.oh-badge--pending {
    background: #fff8e1;
    color: #f57f17;
}

.oh-badge--pending .oh-badge-dot {
    background: #f57f17;
}

.oh-badge--canceled {
    background: #ffebee;
    color: #c62828;
}

/* Covers (Stacking effect) */
.oh-covers {
    display: flex;
}

.oh-cover-wrap {
    width: 50px;
    height: 70px;
    border-radius: 6px;
    overflow: hidden;
    border: 2px solid #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.oh-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.oh-cover--grayscale {
    filter: grayscale(1);
    opacity: 0.6;
}

.oh-cover-more {
    width: 50px;
    height: 70px;
    background: #f0f0f0;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    border: 2px solid #fff;
}

.oh-btn {
    padding: 8px 18px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 13px;
    border: none;
    transition: 0.2s;
}

.oh-btn--primary {
    background: #FF8C00;
    color: #fff;
}

.oh-btn--primary:hover {
    background: #e67e00;
}

.oh-btn--outline {
    background: #f8f9fa;
    border: 1px solid #ddd;
    color: #333;
}

.oh-btn--danger-soft {
    background: #fff5f5;
    color: #e53e3e;
}

.oh-widget-card {
    padding: 20px;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
}

.oh-loyalty-pts {
    font-size: 28px;
    font-weight: 800;
    color: #FF8C00;
}

.oh-loyalty-hint {
    font-size: 12px;
    color: #666;
    margin: 0;
}

.oh-empty {
    padding: 60px;
    text-align: center;
    border-radius: 20px;
}

.oh-empty-icon {
    font-size: 60px;
    color: #eee;
}
</style>