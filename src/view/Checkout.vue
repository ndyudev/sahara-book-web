<template>
    <div class="container-xl py-5">
        <div class="row g-4">

            <div class="col-12 col-lg-8">
                <div class="d-flex flex-column gap-4">
                    <div class="checkout-card p-4">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <div class="d-flex align-items-center gap-2">
                                <h5 class="mb-0 fw-bold">Thông tin vận chuyển</h5>
                            </div>
                            <button class="btn btn-link p-0 text-warning fw-semibold text-decoration-none">
                                Thay đổi địa chỉ
                            </button>
                        </div>

                        <div class="row g-3">
                            <div class="col-12">
                                <label class="form-label fw-semibold small">Họ và tên</label>
                                <input class="form-control co-input" v-model="form.name" placeholder="Họ và tên" />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold small">Số điện thoại</label>
                                <input class="form-control co-input" v-model="form.phone" placeholder="0901234567" />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold small">Email</label>
                                <input class="form-control co-input" v-model="form.email"
                                    placeholder="khachhang@example.com" />
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-semibold small">Địa chỉ cụ thể</label>
                                <div class="position-relative">
                                    <input class="form-control co-input co-input--address pe-5"
                                        v-model="form.address" />
                                    <i
                                        class="bi bi-geo-alt position-absolute top-50 end-0 translate-middle-y me-3 text-warning"></i>
                                </div>
                                <p class="mt-1 mb-0 small text-warning">
                                    <i class="bi bi-info-circle-fill me-1"></i>
                                    Đã tự động điền từ địa chỉ mặc định của bạn.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="checkout-card p-4">
                        <div class="d-flex align-items-center gap-2 mb-4">
                            <h5 class="mb-0 fw-bold">Phương thức vận chuyển</h5>
                        </div>

                        <div class="d-flex flex-column gap-3">
                            <label v-for="opt in shippingOptions" :key="opt.value"
                                class="shipping-option d-flex align-items-center gap-3 p-3 rounded-3"
                                :class="form.shipping === opt.value ? 'shipping-selected' : 'shipping-default'">
                                <input type="radio" :value="opt.value" v-model="form.shipping" class="co-radio" />
                                <div class="flex-grow-1">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="fw-bold">{{ opt.name }}</span>
                                        <span class="fw-bold"
                                            :class="form.shipping === opt.value ? 'text-warning' : 'text-secondary'">
                                            {{ formatPrice(opt.price) }}
                                        </span>
                                    </div>
                                    <p class="mb-0 small text-muted mt-1">{{ opt.eta }}</p>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="checkout-card p-4">
                        <div class="d-flex align-items-center gap-2 mb-4">
                            <h5 class="mb-0 fw-bold">Hình thức thanh toán</h5>
                        </div>

                        <div class="row g-3">
                            <div v-for="method in paymentMethods" :key="method.value" class="col-4">
                                <label
                                    class="payment-option d-flex flex-column align-items-center justify-content-center gap-2 p-3 rounded-3 w-100"
                                    :class="form.payment === method.value ? 'payment-selected' : 'payment-default'">
                                    <input type="radio" :value="method.value" v-model="form.payment" class="d-none" />
                                    <div class="payment-icon rounded-circle d-flex align-items-center justify-content-center"
                                        :class="form.payment === method.value ? 'payment-icon--active' : 'payment-icon--default'">
                                        <i :class="method.icon" style="font-size: 18px;"></i>
                                    </div>
                                    <span class="fw-semibold small">{{ method.label }}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="col-12 col-lg-4">
                <div class="checkout-card p-4 sticky-top" style="top: 80px;">

                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 class="mb-0 fw-bold">Tóm tắt đơn hàng</h5>
                        <span class="text-muted small">({{ cartItems.length }} sản phẩm)</span>
                    </div>

                    <div class="d-flex flex-column gap-3 mb-4">
                        <div v-for="item in cartItems" :key="item.id" class="d-flex align-items-start gap-3">
                            <div class="position-relative flex-shrink-0">
                                <img :src="item.imageUrl" :alt="item.title" class="rounded-2 object-fit-cover"
                                    style="width:64px; height:64px;" />
                                <span class="position-absolute badge rounded-pill bg-dark border border-white"
                                    style="top:-8px; right:-8px; font-size:10px;">
                                    {{ item.quantity }}
                                </span>
                            </div>
                            <div class="flex-grow-1">
                                <p class="mb-0 fw-bold small" style="color:#1E293B;">{{ item.title }}</p>
                                <p class="mb-0 text-muted" style="font-size:12px;">{{ item.variant }}</p>
                            </div>
                            <span class="fw-bold small">{{ formatPrice(item.price) }}</span>
                        </div>
                    </div>

                    <hr class="text-light opacity-25" />
                    <div class="d-flex flex-column gap-2 mb-3">
                        <div class="d-flex justify-content-between">
                            <span class="text-secondary">Tạm tính</span>
                            <span>{{ formatPrice(subtotal) }}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="text-secondary">Phí vận chuyển</span>
                            <span class="fw-bold text-warning">+ {{ formatPrice(shippingFee) }}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="text-secondary">Giảm giá</span>
                            <span class="text-success">- {{ formatPrice(discount) }}</span>
                        </div>
                    </div>

                    <hr class="text-light opacity-25" />
                    <div class="d-flex justify-content-between align-items-end mb-4">
                        <span class="fw-bold fs-6">Tổng thanh toán</span>
                        <div class="text-end">
                            <p class="mb-0 fw-bolder text-warning" style="font-size:24px;">{{ formatPrice(total) }}
                            </p>
                            <p class="mb-0 text-muted"
                                style="font-size:10px; letter-spacing:.5px; text-transform:uppercase;">
                                Đã bao gồm VAT
                            </p>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input class="form-control bg-light border-end-0" v-model="couponCode"
                            placeholder="Mã giảm giá" />
                        <button class="btn btn-dark fw-bold px-3" @click="applyCoupon">Áp dụng</button>
                    </div>
                    <button class="btn w-100 py-3 fw-bold text-white rounded-3 co-btn-order" @click="placeOrder">
                        <i class="bi bi-bag-check me-2"></i>
                        ĐẶT HÀNG NGAY
                    </button>

                    <p class="text-center text-muted mt-3 mb-0" style="font-size:11px;">
                        Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý với
                        <a href="#" class="text-muted">Điều khoản dịch vụ</a>
                        của SaharaBook.
                    </p>

                </div>
            </div>

        </div>
    </div>
    <Transition name="toast">
        <div v-if="showToast" class="toast-success">
            <div class="toast-icon">
                <i class="bi bi-check-circle-fill"></i>
            </div>
            <div class="toast-content">
                <p class="toast-title">Đặt hàng thành công!</p>
                <p class="toast-sub">Đơn hàng của bạn đang được xử lý.</p>
            </div>
            <button class="toast-close" @click="showToast = false">
                <i class="bi bi-x"></i>
            </button>
        </div>
    </Transition>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


const cartItems = ref([])
const couponCode = ref('')
const discount = ref(0)
const showToast = ref(false)

const form = ref({
    name: '',
    phone: '',
    email: '',
    address: '',
    shipping: 'ghn',
    payment: 'bank',
})

const shippingOptions = [
    { value: 'ghn', name: 'Giao hàng nhanh', price: 30000, eta: 'Dự kiến nhận hàng: 2-3 ngày' },
    { value: 'express', name: 'Hỏa tốc', price: 55000, eta: 'Dự kiến nhận hàng: Trong ngày' },
]

const paymentMethods = [
    { value: 'cod', label: 'COD', icon: 'bi bi-cash-stack' },
    { value: 'bank', label: 'Chuyển khoản', icon: 'bi bi-bank2' },
]

onMounted(() => {

    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
        cartItems.value = JSON.parse(savedCart)
    }

    if (cartItems.value.length === 0) {
        alert('Giỏ hàng của bạn đang trống!')
        router.push('/cart')
        return
    }

    const savedUser = localStorage.getItem('user-info')
    if (savedUser) {
        const user = JSON.parse(savedUser)
        form.value.name = user.name || ''
        form.value.phone = user.phone || ''
        form.value.email = user.email || ''
        form.value.address = user.address || ''
    }
})

const subtotal = computed(() =>
    cartItems.value.reduce((s, i) => s + i.price * i.quantity, 0)
)

const shippingFee = computed(() =>
    shippingOptions.find(o => o.value === form.value.shipping)?.price || 0
)

const total = computed(() => subtotal.value + shippingFee.value - discount.value)

const applyCoupon = () => {
    if (couponCode.value === 'SAHARA10') {
        discount.value = Math.round(subtotal.value * 0.1)
        alert('Áp dụng mã giảm giá 10% thành công!')
    } else {
        alert('Mã giảm giá không hợp lệ')
        discount.value = 0
    }
}

const placeOrder = () => {

    const token = localStorage.getItem('user-token')
    if (!token) {
        alert('Bạn cần đăng nhập để thực hiện đặt hàng!')
        router.push({ path: '/login', query: { redirect: router.currentRoute.value.fullPath } })
        return
    }

    if (!form.value.name || !form.value.phone || !form.value.address) {
        alert('Vui lòng nhập đầy đủ thông tin giao hàng!')
        return
    }

    showToast.value = true


    localStorage.removeItem('cart')

    window.dispatchEvent(new Event('storage'))


    setTimeout(() => {
        showToast.value = false
        setTimeout(() => {
            router.push('/')
        }, 400)
    }, 2500)
}
const formatPrice = (p) => {
    const value = Number(p) || 0
    return value.toLocaleString('vi-VN') + 'đ'
}
</script>

<style scoped>
.checkout-card {
    background: #fff;
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(226, 232, 240, 0.4);
}

.step-badge {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(245, 158, 11, 0.1);
    color: #F59E0B;
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

/* Input */
.co-input {
    height: 50px;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    font-family: 'Manrope', sans-serif;
    font-size: 15px;
}

.co-input:focus {
    border-color: #F59E0B;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

.co-input--address {
    background: rgba(245, 158, 11, 0.05);
    border-color: rgba(245, 158, 11, 0.5);
}

/* Radio */
.co-radio {
    accent-color: #F59E0B;
    width: 18px;
    height: 18px;
}

.shipping-option {
    cursor: pointer;
    border: 2px solid transparent;
    transition: all .2s;
}

.shipping-default {
    border-color: #E2E8F0;
}

.shipping-selected {
    border-color: #F59E0B;
    background: rgba(245, 158, 11, 0.05);
    border-radius: 16px !important;
}

.payment-option {
    cursor: pointer;
    border: 2px solid transparent;
    transition: all .2s;
}

.payment-default {
    border-color: #E2E8F0;
}

.payment-selected {
    border-color: #F59E0B;
    background: rgba(245, 158, 11, 0.05);
    border-radius: 16px !important;
}

.payment-icon {
    width: 40px;
    height: 40px;
}

.payment-icon--active {
    background: #F59E0B;
    color: #fff;
}

.payment-icon--default {
    background: #F1F5F9;
    color: #64748B;
}

.co-btn-order {
    background: #F59E0B;
    font-size: 17px;
    letter-spacing: .3px;
    box-shadow: 0 10px 15px -3px rgba(245, 158, 11, 0.25);
}

.co-btn-order:hover {
    background: #d97706;
}

.toast-success {
    position: fixed;
    top: 32px;
    right: 32px;
    display: flex;
    align-items: center;
    gap: 14px;
    background: #fff;
    border: 1px solid #E2E8F0;
    border-left: 4px solid #10B981;
    border-radius: 12px;
    padding: 16px 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    z-index: 9999;
    min-width: 300px;
}

.toast-icon {
    font-size: 28px;
    color: #10B981;
    flex-shrink: 0;
    line-height: 1;
}

.toast-content {
    flex: 1;
}

.toast-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: #0F172A;
    margin: 0 0 2px;
}

.toast-sub {
    font-family: 'Manrope', sans-serif;
    font-size: 13px;
    color: #64748B;
    margin: 0;
}

.toast-close {
    background: none;
    border: none;
    color: #94A3B8;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
}

.toast-enter-active,
.toast-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateX(60px);
}
</style>