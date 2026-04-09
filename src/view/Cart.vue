<template>
  <div class="min-h-screen bg-light text-dark font-sans py-5">
    <main class="container-xl">
      <div class="row g-4 align-items-start justify-content-center">
        <div class="col-12 col-lg-8">
          <section>
            <div class="d-flex align-items-end justify-content-between mb-4 pb-2 border-bottom">
              <h1 class="h2 fw-bold mb-0">Giỏ hàng của bạn</h1>
              <span class="text-muted fw-medium">{{ cartBooks.length }} sản phẩm</span>
            </div>

            <div class="cart-list-container position-relative">
              <TransitionGroup name="list">
                <div v-for="b in cartBooks" :key="b.bookId"
                  class="cart-item-card p-3 p-md-4 rounded-4 d-flex gap-3 gap-md-4 align-items-center bg-white border mb-3 shadow-sm">

                  <router-link :to="`/product/${b.bookId}`" class="cart-item-img rounded-3 overflow-hidden border">
                    <img :src="b.image" :alt="b.title" class="w-100 h-100 object-fit-cover hover-zoom">
                  </router-link>

                  <div class="flex-grow-1 d-flex flex-column gap-2">
                    <div>
                      <span class="badge bg-soft-brown text-brown extra-small fw-bold text-uppercase mb-1">
                        {{ b.categoryId }}
                      </span>
                      <router-link :to="`/product/${b.bookId}`" class="text-decoration-none text-dark">
                        <h5 class="fw-bold mb-1 line-clamp-1">{{ b.title }}</h5>
                      </router-link>
                      <p class="text-muted small mb-0">{{ b.author }} <span class="mx-1">•</span> {{ b.format }}
                      </p>
                    </div>

                    <div class="d-flex align-items-center justify-content-between mt-2">
                      <div class="qty-group d-flex align-items-center bg-light rounded-pill border">
                        <button @click="updateQty(b.bookId, -1)" class="btn btn-sm px-2 border-0">
                          <i class="bi bi-dash-lg"></i>
                        </button>
                        <span class="px-2 small fw-bold text-center" style="min-width: 30px;">
                          {{ b.quantity }}
                        </span>
                        <button @click="updateQty(b.bookId, 1)" class="btn btn-sm px-2 border-0">
                          <i class="bi bi-plus-lg"></i>
                        </button>
                      </div>

                      <button @click="removeItem(b.bookId)"
                        class="btn btn-link text-danger text-decoration-none small fw-bold p-0 opacity-75 hover-opacity-100">
                        <i class="bi bi-trash3 me-1"></i> Xóa
                      </button>
                    </div>
                  </div>

                  <div class="text-end d-flex flex-column justify-content-center border-start ps-3 ps-md-4"
                    style="min-width: 100px;">
                    <div class="fs-5 fw-bold text-dark">{{ formatPrice(b.price * b.quantity) }}</div>
                    <div class="extra-small text-success fw-bold">{{ b.status || 'Còn hàng' }}</div>
                  </div>
                </div>
              </TransitionGroup>

              <div v-if="cartBooks.length === 0"
                class="text-center py-5 rounded-4 border-2 border-dashed bg-white shadow-sm">
                <div class="mb-3">
                  <i class="bi bi-cart-x display-1 text-muted opacity-25"></i>
                </div>
                <h4 class="fw-bold text-muted">Giỏ hàng đang trống</h4>
                <p class="text-muted mb-4">Có vẻ như bạn chưa chọn được cuốn sách ưng ý nào.</p>
                <RouterLink to="/product" class="btn btn-brown px-4 py-2 rounded-pill fw-bold text-white shadow-sm">
                  <i class="bi bi-arrow-left me-2"></i>Tiếp tục mua sắm
                </RouterLink>
              </div>
            </div>
          </section>
        </div>

        <div class="col-12 col-lg-4">
          <div class="summary-card p-4 rounded-4 bg-white shadow-sm border">
            <h5 class="fw-bold mb-4 border-bottom pb-3">Chi tiết thanh toán</h5>

            <div class="d-flex flex-column gap-3 mb-4">
              <div class="d-flex justify-content-between text-muted">
                <span>Tạm tính ({{ cartBooks.length }} SP)</span>
                <span class="fw-bold text-dark">{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="d-flex justify-content-between text-muted">
                <span>Phí vận chuyển</span>
                <span class="fw-bold text-dark">{{ subtotal > 0 ? formatPrice(shipping) : '0đ' }}</span>
              </div>
              <div class="d-flex justify-content-between text-danger fw-medium">
                <span>Giảm giá</span>
                <span>-0đ</span>
              </div>

              <div class="separator my-2"></div>

              <div class="d-flex justify-content-between align-items-end">
                <span class="fw-bold fs-5">Tổng cộng</span>
                <div class="text-end">
                  <span class="fs-2 fw-bolder text-brown d-block">{{ formatPrice(total) }}</span>
                  <small class="text-muted extra-small">(Đã bao gồm VAT)</small>
                </div>
              </div>
            </div>

            <div class="promo-box mb-4 p-3 bg-light rounded-3">
              <label class="extra-small fw-bold text-muted text-uppercase mb-2 d-block tracking-wider">Mã giảm
                giá</label>
              <div class="d-flex gap-2">
                <input type="text" class="form-control form-control-sm border-0 shadow-none" placeholder="NHAPMA2024">
                <button class="btn btn-dark btn-sm px-3 fw-bold text-uppercase">Áp dụng</button>
              </div>
            </div>

            <router-link to="/checkout" :class="{ 'disabled': cartBooks.length === 0 }"
              class="btn btn-checkout w-100 py-3 rounded-pill fw-bold text-white shadow-orange d-flex align-items-center justify-content-center gap-2">
              Tiến hành thanh toán
              <i class="bi bi-arrow-right fs-5"></i>
            </router-link>

            <div class="mt-4 pt-3 border-top">
              <div class="extra-small text-muted d-flex align-items-center gap-3 mb-2">
                <i class="bi bi-shield-check text-brown fs-6"></i> <span>Thanh toán an toàn 100%</span>
              </div>
              <div class="extra-small text-muted d-flex align-items-center gap-3">
                <i class="bi bi-truck text-brown fs-6"></i><span>Giao hàng từ 1-3 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from "vue-toastification"

const toast = useToast()
const cartBooks = ref([])
const shipping = 30000

const loadCart = () => {
  const data = localStorage.getItem('cart')
  cartBooks.value = data ? JSON.parse(data) : []
}

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cartBooks.value))

  window.dispatchEvent(new Event('storage'))
}

const subtotal = computed(() =>
  cartBooks.value.reduce((acc, b) => acc + (Number(b.price) * Number(b.quantity)), 0)
)

const total = computed(() => subtotal.value + (cartBooks.value.length > 0 ? shipping : 0))

const updateQty = (bookId, delta) => {
  
  const book = cartBooks.value.find(b => b.bookId === bookId)

  if (book) {
    const newQty = book.quantity + delta

    if (newQty >= 1 && newQty <= 20) {
      book.quantity = newQty 
      saveCart() 
    } else if (newQty < 1) {
      removeItem(bookId) 
    } else {
      toast.warning("Số lượng tối đa là 20 cuốn")
    }
  }
}

const removeItem = (bookId) => {
  const index = cartBooks.value.findIndex(b => b.bookId === bookId)
  if (index === -1) return

  const itemBackup = cartBooks.value[index]
  cartBooks.value.splice(index, 1)
  saveCart()

  toast.error(`Đã xóa "${itemBackup.title}"`, {
    timeout: 5000,
    icon: "bi bi-trash3",
    closeButton: "button",
    onClick: () => {

      cartBooks.value.splice(index, 0, itemBackup)
      saveCart()
      toast.success("Đã khôi phục sản phẩm!")
    }
  })
}

const formatPrice = (p) => {
  return (Number(p) || 0).toLocaleString('vi-VN') + 'đ'
}

onMounted(() => {
  loadCart()
})
</script>

<style scoped>
.text-brown {
  color: #ff8c00;
}

.btn-brown {
  background: #ff8c00;
  border: none;
}

.btn-brown:hover {
  background: #e67e00;
}

.bg-soft-brown {
  background: rgba(255, 140, 0, 0.1);
}


.cart-item-card {
  transition: all 0.3s ease;
}

.cart-item-card:hover {
  border-color: #ff8c00 !important;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05) !important;
}

.cart-item-img {
  width: 90px;
  height: 130px;
  flex-shrink: 0;
}

.hover-zoom {
  transition: transform 0.5s ease;
}

.cart-item-card:hover .hover-zoom {
  transform: scale(1.1);
}

.btn-checkout {
  background: #FF8C00;
  border: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-checkout:hover:not(.disabled) {
  background: #e67e00;
  transform: scale(1.02);
}

.btn-checkout.disabled {
  background: #ccc;
  cursor: not-allowed;
}

.shadow-orange {
  box-shadow: 0 8px 20px rgba(255, 140, 0, 0.3);
}

/* Utilities */
.extra-small {
  font-size: 11px;
}

.separator {
  height: 1px;
  background: #eee;
  width: 100%;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Transition Group */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Khi xóa phần tử, tránh các phần tử khác bị giật */
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>