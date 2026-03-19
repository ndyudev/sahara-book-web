<template>
  <div class="min-h-screen bg-light text-dark font-sans py-5">
    <main class="container-xl">
      <div class="row g-4 align-items-start justify-content-center">
        <div class="col-12 col-lg-8">
          <section>
            <div class="d-flex align-items-end justify-content-between mb-4">
              <h1 class="display-6 fw-bold mb-0">Giỏ hàng của bạn</h1>
              <span class="text-muted fw-medium">({{ cartItems.length }} sản phẩm)</span>
            </div>

            <div class="d-flex flex-column gap-3">
              <TransitionGroup name="list">
                <div v-for="item in cartItems" :key="item.id"
                  class="cart-item-card p-4 rounded-4 d-flex gap-4 align-items-center bg-white border">

                  <router-link :to="`/product/${item.id}`" class="cart-item-img rounded-3 overflow-hidden shadow-sm">
                    <img :src="item.image" :alt="item.title" class="w-100 h-100 object-fit-cover">
                  </router-link>

                  <div class="flex-grow-1 h-100 d-flex flex-column justify-content-between">
                    <div>
                      <span class="text-brown extra-small fw-bold text-uppercase tracking-wider">
                        {{ item.category }}
                      </span>
                      <router-link :to="`/product/${item.id}`" class="text-decoration-none text-dark">
                        <h5 class="fw-bold mb-1">{{ item.title }}</h5>
                      </router-link>
                      <p class="text-muted small mb-0">{{ item.author }} • {{ item.format }}</p>
                    </div>

                    <div class="d-flex align-items-center gap-4 mt-3">
                      <div class="qty-toggle d-flex align-items-center bg-light rounded-pill px-2 border">
                        <button @click="updateQty(item.id, -1)" class="btn btn-sm border-0">
                          <i class="bi bi-dash"></i>
                        </button>
                        <span class="px-2 small fw-bold text-center" style="width: 30px;">
                          {{ item.quantity }}
                        </span>
                        <button @click="updateQty(item.id, 1)" class="btn btn-sm border-0">
                          <i class="bi bi-plus"></i>
                        </button>
                      </div>
                      <button @click="removeItem(item.id)"
                        class="btn btn-link text-danger text-decoration-none small fw-bold p-0">
                        <i class="bi bi-trash3 me-1"></i> Xóa
                      </button>
                    </div>
                  </div>

                  <div class="text-end h-100 d-flex flex-column justify-content-between">
                    <div class="fs-5 fw-bold">{{ formatPrice(item.price) }}</div>
                    <div class="extra-small text-muted">{{ item.status }}</div>
                  </div>
                </div>
              </TransitionGroup>

              <div v-if="cartItems.length === 0"
                class="text-center py-5 rounded-4 border-2 border-dashed bg-light shadow-sm">
                <i class="bi bi-cart-x fs-1 text-muted opacity-25"></i>
                <p class="text-muted mt-3 fw-medium">Giỏ hàng của bạn đang trống</p>
                <RouterLink to="/product" class="btn btn-link text-brown fw-bold text-decoration-none">
                  <i class="bi bi-arrow-left me-2"></i>Tiếp tục mua sắm
                </RouterLink>
              </div>
            </div>
          </section>
        </div>

        <div class="col-12 col-lg-4 sticky-sidebar">
          <div class="summary-card p-4 rounded-4 bg-white shadow-sm border">
            <h5 class="fw-bold mb-4">Tóm tắt đơn hàng</h5>
            <div class="d-flex flex-column gap-3 mb-4">
              <div class="d-flex justify-content-between small">
                <span class="text-muted">Tạm tính</span>
                <span class="fw-bold">{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="d-flex justify-content-between small">
                <span class="text-muted">Phí vận chuyển</span>
                <span class="fw-bold">{{ formatPrice(shipping) }}</span>
              </div>
              <div class="d-flex justify-content-between small">
                <span class="text-muted">Giảm giá</span>
                <span class="fw-bold text-danger">-0đ</span>
              </div>
              <hr class="my-2 opacity-10">
              <div class="d-flex justify-content-between align-items-end">
                <span class="fw-bold">Tổng cộng</span>
                <span class="fs-3 fw-bolder text-brown">{{ formatPrice(total) }}</span>
              </div>
            </div>

            <div class="mb-4">
              <label class="extra-small fw-bold text-muted text-uppercase mb-2 d-block tracking-wider">Mã
                giảm giá</label>
              <div class="input-group input-group-sm">
                <input type="text" class="form-control bg-light border-0" placeholder="Nhập mã...">
                <button class="btn btn-dark px-3 fw-bold text-uppercase" style="font-size: 10px;">Áp
                  dụng</button>
              </div>
            </div>

            <button
              class="btn btn-checkout w-100 py-3 rounded-pill fw-bold text-white d-flex align-items-center justify-content-center gap-2">
              Tiến hành thanh toán
              <i class="bi bi-arrow-right"></i>
            </button>

            <div class="mt-4 d-flex flex-column gap-2">
              <div class="extra-small text-muted d-flex align-items-center gap-2 fw-bold opacity-75">
                <i class="bi bi-shield-check text-brown fs-6"></i> Thanh toán an toàn 100%
              </div>
              <div class="extra-small text-muted d-flex align-items-center gap-2 fw-bold opacity-75">
                <i class="bi bi-truck text-brown fs-6"></i> Giao hàng từ 1-3 ngày
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import books from '../data/products.json'

const cartItems = ref(
  books.slice(0, 3).map(b => ({
    id: b.id,
    title: b.title,
    author: b.author,
    category: b.category,
    price: b.salePrice,
    quantity: 1,
    image: b.imageUrl,
    format: b.format,
    status: b.status,
  }))
)

const shipping = 30000
const subtotal = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
)
const total = computed(() => subtotal.value + shipping)

const updateQty = (id, delta) => {
  const item = cartItems.value.find(i => i.id === id)
  if (item) item.quantity = Math.max(1, item.quantity + delta)
}
const removeItem = (id) => {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
}
const formatPrice = (p) => new Intl.NumberFormat('vi-VN').format(p) + 'đ'
</script>

<style scoped>
.text-brown {
  color: #ff8c00;
}

.btn-checkout {
  background: #FF8C00;
  /* Màu cam chủ đạo của bạn */
  border: none;
  font-size: 15px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

}

.btn-checkout:hover {
  background: #e67e00;
  transform: translateY(-1px);

}

.extra-small {
  font-size: 10px;
}

.tracking-wider {
  letter-spacing: 0.1em;
}

.cursor-pointer {
  cursor: pointer;
}

.sticky-sidebar {
  position: sticky;
  top: 20px;
}

.cart-item-img {
  width: 100px;
  height: 140px;
  flex-shrink: 0;
}

.aspect-ratio-book {
  aspect-ratio: 2/3;
}

.hover-scale {
  transition: transform 0.5s ease;
}

.recommend-card:hover .hover-scale {
  transform: scale(1.08);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
  z-index: 0;
}

.list-move {
  transition: transform 0.4s ease;
}
</style>