<template>
  <nav class="navbar navbar-expand-lg nb-glass shadow-sm">
    <div class="container-xl">

      <router-link to="/"><img :src="logo" alt="SaharaBook" height="36"></router-link>

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
            <div class="nb-mega-menu" v-show="isCategoryOpen">
              <div class="nb-mega-inner">
                <div class="nb-mega-col" v-for="group in categories" :key="group.title">
                  <p class="nb-mega-title">{{ group.title }}</p>
                  <RouterLink :to="`/product`" v-for="item in group.items" :key="item.label" class="nb-mega-item"
                    @click="isCategoryOpen = false">
                    <i :class="item.icon"></i>
                    <span>{{ item.label }}</span>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul class="navbar-nav ms-auto align-items-center flex-row gap-3">
          <li class="nav-item position-relative">
            <RouterLink to="/cart" class="btn btn-link nb-variant p-0">
              <i class="bi bi-cart fs-5"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill nb-badge">{{ cartCount
              }}</span>
            </RouterLink>
          </li>

          <li class="nav-item position-relative" ref="dropdownRef">
            <button class="nb-btn-account" :class="{ 'nb-logged-in': isLoggedIn }" @click="isOpen = !isOpen">
              <template v-if="isLoggedIn">
                <div class="nb-avatar-nav">
                  {{ user.name.charAt(0).toUpperCase() }}
                </div>
                <span class="d-none d-xl-block ms-2">{{ user.name }}</span>
              </template>
              <template v-else>
                <i class="bi bi-person fs-5"></i>
                <span>Tài khoản</span>
              </template>
              <i class="bi bi-chevron-down nb-chevron ms-1" :class="{ 'nb-rotated': isOpen }"></i>
            </button>

            <div class="nb-dropdown" v-show="isOpen">
              <template v-if="isLoggedIn">
                <div class="nb-dd-header-new">
                  <div class="nb-avatar-large">{{ user.name.charAt(0).toUpperCase() }}</div>
                  <div class="ms-3 overflow-hidden">
                    <p class="nb-dd-name">Xin chào, {{ user.name }}</p>
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
                    style="background: #FF8C00; border: none;">Đăng nhập
                  </RouterLink>
                  <RouterLink to="/register" class="btn btn-outline-secondary w-100 rounded-pill small"
                    @click="isOpen = false">Đăng ký tài khoản</RouterLink>
                </div>
              </template>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import logo from '../assets/logo/logo.png'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)
const isCategoryOpen = ref(false)
const dropdownRef = ref(null)
const categoryRef = ref(null)

const user = ref(null)
const isLoggedIn = computed(() => !!user.value)

const checkUser = () => {
  const data = localStorage.getItem('user-info')
  user.value = data ? JSON.parse(data) : null
}

const handleLogout = () => {
  if (confirm('Bạn muốn đăng xuất chứ?')) {
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-info')
    user.value = null
    isOpen.value = false
    router.push('/')
  }
}
const cartCount = ref(0)

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
  window.addEventListener('localstorage-changed', checkUser)

  updateCartCount()
  window.addEventListener('storage', updateCartCount)
})
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

</script>

<style scoped>
.nb-glass {
  background: rgba(248, 249, 250, 0.7) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 9999;
}

.nb-logo {
  color: #FF8C00 !important;
  text-decoration: none !important;
  font-size: 1.75rem;
  font-weight: 800;
}

.nb-search {
  background-color: #f3f4f5 !important;
  border: none !important;
}

.nb-search:focus {
  background-color: #edeeef !important;
  box-shadow: 0 0 0 0.25rem rgba(144, 77, 0, 0.25) !important;
  outline: none !important;
}

.nb-variant {
  color: #FF8C00 !important;
  cursor: pointer;
}

.nb-badge {
  background-color: #FF8C00 !important;
  color: #fff !important;
}

.nb-btn-account {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #FF8C00;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 8px 20px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
}

.nb-btn-account:focus,
.nb-btn-account:active {
  background: #FF8C00 !important;
  outline: none !important;
  box-shadow: none !important;
}

.nb-chevron {
  font-size: 12px;
  transition: transform .2s;
}

.nb-rotated {
  transform: rotate(180deg);
}

.nb-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 280px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 1000;
}

.nb-dd-header-new {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-bottom: 1px solid #f8f9fa;
}

.nb-avatar-large {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #FF8C00, #FFA500);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.nb-dd-name {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: #1e293b;
  margin: 0;
}

.nb-dd-email {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}

.nb-dd-body {
  padding: 8px;
}

.nb-dd-item-new {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.2s;
}

.nb-dd-item-new:hover {
  background: #fff7ed;
  color: #FF8C00;
}

.nb-dd-item-new i {
  font-size: 18px;
  color: #94a3b8;
}

.nb-dd-item-new:hover i {
  color: #FF8C00;
}

.nb-btn-account.nb-logged-in {
  background: #fff;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  padding: 6px 12px 6px 6px;
}

.nb-avatar-nav {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #FF8C00;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nb-avatar-placeholder {
  width: 60px;
  height: 60px;
  background: #f1f5f9;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* ── Mega Menu ── */
.nb-mega-menu {
  position: absolute;
  top: calc(100% + 16px);
  left: 50%;
  transform: translateX(-50%);
  width: 680px;
  background: #fff;
  border: 1px solid rgba(144, 77, 0, 0.12);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 9999;

}

.nb-mega-inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 8px;
}

.nb-mega-col {
  padding: 16px 12px;
  border-right: 1px solid rgba(144, 77, 0, 0.06);
}

.nb-mega-col:last-child {
  border-right: none;
}

.nb-mega-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #FF8C00;
  margin: 0 0 12px 8px;
}

.nb-mega-item {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 8px !important;
  font-family: 'Manrope', sans-serif !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  color: #191C1D !important;
  text-decoration: none !important;
  border-radius: 8px !important;
  transition: background .15s !important;
  cursor: pointer !important;
}

.nb-mega-item:hover {
  background: rgba(255, 140, 0, 0.07) !important;
  color: #FF8C00 !important;
}

.nb-mega-item i {
  font-size: 14px !important;
  color: #94A3B8 !important;
  width: 16px !important;
  text-align: center !important;
}

.nb-mega-item:hover i {
  color: #FF8C00 !important;
}
</style>