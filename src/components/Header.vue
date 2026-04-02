<template>
  <nav class="navbar navbar-expand-lg shadow-sm" style="z-index: 9999;">
    <div class="container-xl">
      <router-link to="/">
        <img :src="logo" alt="SaharaBook" height="36">
      </router-link>

      <div class="collapse navbar-collapse" id="navbarContent">
        <div class="d-flex align-items-center flex-grow-1 ms-lg-5">
          <div class="position-relative flex-grow-1 me-lg-4" style="max-width: 420px;">
            <i class="bi bi-search position-absolute top-50 translate-middle-y"
              style="left: 14px; pointer-events: none;"></i>
            <input type="search" class="form-control rounded-pill py-2 nb-search" style="padding-left: 2.5rem;"
              placeholder="Tìm kiếm....." />
          </div>

          <div class="position-relative" ref="categoryRef">
            <a class="nav-link fw-medium nb-variant d-none d-lg-flex align-items-center gap-2"
              @click.prevent="isCategoryOpen = !isCategoryOpen">
              <i class="bi bi-grid fs-5"></i>
              Danh mục
              <i class="bi bi-chevron-down nb-chevron" :class="{ 'nb-rotated': isCategoryOpen }"></i>
            </a>

            <div name="fade-slide">
              <div class="nb-mega-menu" v-show="isCategoryOpen">
                <div class="nb-mega-inner">
                  <div class="nb-mega-col" v-for="group in categories" :key="group.title">
                    <p class="nb-mega-title">{{ group.title }}</p>
                    <RouterLink to="/product" v-for="item in group.items" :key="item.label" class="nb-mega-item"
                      @click="isCategoryOpen = false">
                      <i :class="item.icon"></i>
                      <span>{{ item.label }}</span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul class="navbar-nav ms-auto align-items-center flex-row gap-3">
          <li class="nav-item position-relative">
            <RouterLink to="/cart" class="btn btn-link nb-variant p-0">
              <i class="bi bi-cart fs-5"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill nb-badge">
                {{ cartCount }}
              </span>
            </RouterLink>
          </li>

          <li class="nav-item position-relative" ref="dropdownRef">
            <button class="nb-btn-account" :class="{ 'nb-logged-in': isLoggedIn }" @click="isOpen = !isOpen">
              <template v-if="isLoggedIn">
                <div class="nb-avatar-nav overflow-hidden">
                  <img v-if="user.avatar" :src="user.avatar" class="w-100 h-100 object-fit-cover">
                  <span v-else>{{ user?.fullname?.charAt(0)?.toUpperCase() }}</span>
                </div>
                <span class="d-none d-xl-block ms-2">{{ user.fullname }}</span>
              </template>
              <template v-else>
                <i class="bi bi-person fs-5"></i>
                <span>Tài khoản</span>
              </template>
              <i class="bi bi-chevron-down nb-chevron ms-1" :class="{ 'nb-rotated': isOpen }"></i>
            </button>

            <Transition name="fade-slide">
              <div class="nb-dropdown" v-show="isOpen">
                <template v-if="isLoggedIn">
                  <div class="nb-dd-header-new">
                    <div class="nb-avatar-large overflow-hidden">
                      <img v-if="user.avatar" :src="user.avatar" class="w-100 h-100 object-fit-cover">
                      <span v-else>{{ user?.fullname?.charAt(0)?.toUpperCase() }}</span>
                    </div>
                    <div class="ms-3 overflow-hidden">
                      <p class="nb-dd-name">Xin chào, {{ user.fullname }}</p>
                      <p class="nb-dd-email">{{ user.email }}</p>
                    </div>
                  </div>
                  <div class="nb-dd-body">
                    <RouterLink to="/profile" class="nb-dd-item-new" @click="isOpen = false">
                      <i class="bi bi-person-circle"></i><span>Hồ sơ cá nhân</span>
                    </RouterLink>
                    <RouterLink to="/profile/wishlist" class="nb-dd-item-new" @click="isOpen = false">
                      <i class="bi bi-heart"></i><span>Sản phẩm yêu thích</span>
                    </RouterLink>
                    <RouterLink to="/profile/orders" class="nb-dd-item-new" @click="isOpen = false">
                      <i class="bi bi-bag-check"></i><span>Quản lý đơn hàng</span>
                    </RouterLink>
                    <div class="nb-dd-divider"></div>
                    <a href="#" class="nb-dd-item-new text-danger" @click.prevent="handleLogout">
                      <i class="bi bi-box-arrow-right"></i><span>Đăng xuất</span>
                    </a>
                  </div>
                </template>
                <template v-else>
                  <div class="p-4 text-center">
                    <div class="nb-avatar-placeholder mb-3">
                      <i class="bi bi-person text-secondary fs-2"></i>
                    </div>
                    <h6 class="fw-bold mb-1">Chào mừng bạn!</h6>
                    <p class="text-muted small mb-3">Đăng nhập để nhận nhiều ưu đãi hơn</p>
                    <RouterLink to="/login" class="btn btn-primary w-100 rounded-pill mb-2" @click="isOpen = false"
                      style="background: #FF8C00; border: none;"> Đăng nhập </RouterLink>
                    <RouterLink to="/register" class="btn btn-outline-secondary w-100 rounded-pill small"
                      @click="isOpen = false"> Đăng ký tài khoản </RouterLink>
                  </div>
                </template>
              </div>
            </Transition>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <Transition name="fade">
    <div v-if="confirmData.show" class="sb-overlay">
      <div class="sb-confirm-card">
        <div class="sb-confirm-icon"><i class="bi bi-box-arrow-right"></i></div>
        <h4 class="fw-bold">Đăng xuất?</h4>
        <p class="text-muted">Bạn có chắc chắn muốn rời khỏi hệ thống SaharaBook không?</p>
        <div class="sb-confirm-btns">
          <button @click="confirmData.show = false" class="btn-cancel">Quay lại</button>
          <button @click="executeLogout" class="btn-confirm">Đăng xuất</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import logo from '../assets/logo/logo.png'
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter();
const toast = useToast();
const isOpen = ref(false);
const isCategoryOpen = ref(false);
const dropdownRef = ref(null);
const categoryRef = ref(null);
const user = ref(null);
const cartCount = ref(0);

const isAdmin = computed(() => {
  return user.value && user.value.role === 'ADMIN'
})

const confirmData = reactive({
  show: false
})

const handleLogout = () => {
  confirmData.show = true
}

const executeLogout = () => {
  localStorage.removeItem('user-token')
  localStorage.removeItem('user-info')
  user.value = null
  isOpen.value = false
  confirmData.show = false

  toast.success("Bạn đã đăng xuất thành công!", "success")
  router.push('/')
}

const isLoggedIn = computed(() => !!user.value)

const checkUser = () => {
  const data = localStorage.getItem('user-info')
  user.value = data ? JSON.parse(data) : null
}

const updateCartCount = () => {
  const data = localStorage.getItem('cart')
  if (data) {
    const cart = JSON.parse(data)
    cartCount.value = cart.reduce((total, item) => total + item.quantity, 0)
  } else {
    cartCount.value = 0
  }
}
const categories = [
  {
    title: 'Văn học',
    items: [
      { label: 'Tiểu thuyết', icon: 'bi bi-book' },
      { label: 'Truyện ngắn', icon: 'bi bi-journal-text' },
      { label: 'Thơ ca', icon: 'bi bi-feather' },
      { label: 'Hồi ký', icon: 'bi bi-person-lines-fill' },
    ]
  },
  {
    title: 'Kinh tế',
    items: [
      { label: 'Kinh doanh', icon: 'bi bi-briefcase' },
      { label: 'Tài chính', icon: 'bi bi-currency-dollar' },
      { label: 'Đầu tư', icon: 'bi bi-graph-up-arrow' },
      { label: 'Khởi nghiệp', icon: 'bi bi-rocket' },
    ]
  },
  {
    title: 'Tâm lý',
    items: [
      { label: 'Tâm lý học', icon: 'bi bi-brain' },
      { label: 'Kỹ năng sống', icon: 'bi bi-person-check' },
      { label: 'Thiền định', icon: 'bi bi-peace' },
      { label: 'Hạnh phúc', icon: 'bi bi-emoji-smile' },
    ]
  },
  {
    title: 'Ngoại ngữ',
    items: [
      { label: 'Tiếng Anh', icon: 'bi bi-translate' },
      { label: 'Tiếng Nhật', icon: 'bi bi-translate' },
      { label: 'Tiếng Trung', icon: 'bi bi-translate' },
      { label: 'Tiếng Hàn', icon: 'bi bi-translate' },
    ]
  },
]

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) isOpen.value = false
  if (categoryRef.value && !categoryRef.value.contains(e.target)) isCategoryOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  checkUser()
  updateCartCount()
  window.addEventListener('user-info-changed', checkUser)
  window.addEventListener('storage', () => {
    checkUser()
    updateCartCount()
  })
})

onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped></style>