<template>
    <div class="container-xl py-5">
        <div class="row g-4">
            <div class="col-12 col-lg-8">
                <div class="d-flex flex-column gap-4">
                    <div class="checkout-card p-4">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h5 class="mb-0 fw-bold">Thông tin vận chuyển</h5>
                            <button @click="router.push('/profile/address')"
                                class="btn btn-link p-0 text-warning fw-semibold text-decoration-none">
                                Thay đổi địa chỉ
                            </button>
                        </div>

                        <div class="row g-3">
                            <div class="col-12">
                                <label class="form-label fw-semibold small">Họ và tên</label>
                                <input class="form-control co-input" v-model="form.fullname" placeholder="Họ và tên" />
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
                        <h5 class="mb-0 fw-bold mb-4">Phương thức vận chuyển</h5>
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
                        <h5 class="mb-0 fw-bold mb-4">Hình thức thanh toán</h5>
                        <div class="row g-3">
                            <div v-for="method in paymentMethods" :key="method.value" class="col-6">
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
                <div class="checkout-card p-4" style="top: 80px;">
                    <h5 class="mb-4 fw-bold">Tóm tắt đơn hàng <span class="text-muted fw-normal small">({{
                        cartBooks.length }})</span></h5>

                    <div class="cart-items-preview mb-4">
                        <div v-for="b in cartBooks" :key="b.bookId" class="d-flex align-items-center gap-3 mb-3">
                            <div class="position-relative">
                                <img :src="b.image" class="rounded-2"
                                    style="width:50px; height:50px; object-fit: cover;" />
                                <span
                                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                                    style="font-size: 10px;">
                                    {{ b.quantity }}
                                </span>
                            </div>
                            <div class="flex-grow-1 overflow-hidden">
                                <p class="mb-0 small fw-bold text-truncate">{{ b.title }}</p>
                                <p class="mb-0 small text-muted">{{ formatPrice(b.price) }}</p>
                            </div>
                        </div>
                    </div>

                    <hr class="opacity-25" />
                    <div class="d-flex flex-column gap-2 mb-4">
                        <div class="d-flex justify-content-between small">
                            <span class="text-secondary">Tạm tính</span>
                            <span>{{ formatPrice(subtotal) }}</span>
                        </div>
                        <div class="d-flex justify-content-between small">
                            <span class="text-secondary">Phí vận chuyển</span>
                            <span class="text-warning fw-bold">+ {{ formatPrice(shippingFee) }}</span>
                        </div>
                        <div class="d-flex justify-content-between small" v-if="discount > 0">
                            <span class="text-secondary">Giảm giá</span>
                            <span class="text-success">- {{ formatPrice(discount) }}</span>
                        </div>
                        <div class="d-flex justify-content-between mt-2 pt-2 border-top">
                            <span class="fw-bold">Tổng thanh toán</span>
                            <span class="fw-bold text-warning fs-5">{{ formatPrice(total) }}</span>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <input class="form-control bg-light border-end-0" v-model="couponCode"
                            placeholder="Mã giảm giá" />
                        <button class="btn btn-dark fw-bold" @click="applyCoupon">Áp dụng</button>
                    </div>

                    <button class="btn w-100 py-3 fw-bold text-white rounded-3 co-btn-order" @click="placeOrder">
                        <i class="bi bi-bag-check me-2"></i> ĐẶT HÀNG NGAY
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification"

const router = useRouter()
const toast = useToast()

const cartBooks = ref([])
const couponCode = ref('')
const discount = ref(0)

const form = ref({
    fullname: '',
    phone: '',
    email: '',
    address: '',
    shipping: 'ghn',
    payment: 'bank',
})

const shippingOptions = [
    { value: 'ghn', name: 'Giao hàng nhanh', price: 30000, eta: 'Dự kiến: 2-3 ngày' },
    { value: 'express', name: 'Hỏa tốc', price: 55000, eta: 'Dự kiến: Trong ngày' },
]

const paymentMethods = [
    { value: 'cod', label: 'COD', icon: 'bi bi-cash-stack' },
    { value: 'bank', label: 'Chuyển khoản', icon: 'bi bi-bank2' },
]

onMounted(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
        cartBooks.value = JSON.parse(savedCart)
    }

    if (cartBooks.value.length === 0) {
        toast.info("Giỏ hàng của bạn đang trống.");
        router.push('/product')
        return
    }

    const savedUser = localStorage.getItem('user-info')
    if (savedUser) {
        const user = JSON.parse(savedUser)
        form.value.fullname = user.fullname || ''
        form.value.phone = user.phone || ''
        form.value.email = user.email || ''
        form.value.address = user.address || ''
    }
})

const subtotal = computed(() => cartBooks.value.reduce((s, i) => s + i.price * i.quantity, 0))
const shippingFee = computed(() => shippingOptions.find(o => o.value === form.value.shipping)?.price || 0)
const total = computed(() => subtotal.value + shippingFee.value - discount.value)

const applyCoupon = () => {
    if (couponCode.value.toUpperCase() === 'SAHARA10') {
        discount.value = Math.round(subtotal.value * 0.1)
        toast.success("Áp dụng mã giảm giá 10% thành công!");
    } else if (!couponCode.value) {
        toast.warning("Vui lòng nhập mã giảm giá");
    } else {
        toast.error("Mã không hợp lệ");
        discount.value = 0
    }
}

const placeOrder = () => {
    const token = localStorage.getItem('user-token')

    if (!token) {
        toast.warning("Vui lòng đăng nhập để đặt hàng");
        router.push({ path: '/login', query: { redirect: router.currentRoute.value.fullPath } })
        return
    }

    if (!form.value.fullname || !form.value.phone || !form.value.address) {
        toast.error("Vui lòng nhập đầy đủ thông tin giao hàng!");
        return
    }

    const newOrder = {
        id: 'SAHARA-' + Date.now(),
        date: new Date().toLocaleDateString('vi-VN'),
        status: 'pending',
        customerName: form.value.fullname,
        address: form.value.address,
        paymentMethod: form.value.payment === 'cod' ? 'COD' : 'Chuyển khoản',
        total: total.value,
        books: cartBooks.value
    }

    const existingOrders = JSON.parse(localStorage.getItem('user_orders')) || []

    existingOrders.unshift(newOrder

    )
    localStorage.setItem('user_orders', JSON.stringify(existingOrders))

    toast.success("Đặt hàng thành công! Đang chuyển hướng...", {
        timeout: 2000
    });

    localStorage.removeItem('cart')
    window.dispatchEvent(new Event('storage'))

    setTimeout(() => {
        router.push('/profile/orders')
    }, 2000)
}

const formatPrice = (p) => (Number(p) || 0).toLocaleString('vi-VN') + 'đ'
</script>

<style scoped>
.checkout-card {
    background: #fff;
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(226, 232, 240, 0.4);
}

.co-input {
    height: 50px;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
}

.co-input:focus {
    border-color: #F59E0B;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

.co-input--address {
    background: rgba(245, 158, 11, 0.05);
}

.shipping-option,
.payment-option {
    cursor: pointer;
    border: 2px solid #E2E8F0;
    transition: all .2s;
}

.shipping-selected,
.payment-selected {
    border-color: #F59E0B;
    background: rgba(245, 158, 11, 0.05);
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
    box-shadow: 0 10px 15px -3px rgba(245, 158, 11, 0.25);
}

.co-btn-order:hover {
    background: #d97706;
}

.cart-items-preview {
    max-height: 200px;
    overflow-y: auto;
}
</style>