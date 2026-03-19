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
                  <router-link :to="`/product`" v-for="item in group.items" :key="item.label" class="nb-mega-item"
                    @click="isCategoryOpen = false">
                    <i :class="item.icon"></i>
                    <span>{{ item.label }}</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

        </div>

        <ul class="navbar-nav ms-auto align-items-center flex-row gap-3">

          <li class="nav-item position-relative">
            <router-link to="/cart" class="btn btn-link nb-variant p-0">
              <i class="bi bi-cart fs-5"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill nb-badge">0</span>
            </router-link>
          </li>

          <li class="nav-item position-relative" ref="dropdownRef">
            <button class="nb-btn-account" @click="isOpen = !isOpen">
              <i class="bi bi-person fs-5"></i>
              <span>Tài khoản</span>
              <i class="bi bi-chevron-down nb-chevron" :class="{ 'nb-rotated': isOpen }"></i>
            </button>

            <div class="nb-dropdown" v-show="isOpen">
              <div class="nb-dd-header">
                <div class="nb-avatar">
                  <router-link to="/profile"></router-link>
                </div>
                <div>
                  <p class="nb-dd-name">Xin chào!</p>
                  <p class="nb-dd-email">Đăng nhập để tiếp tục</p>
                </div>
              </div>

              <div class="nb-dd-divider"></div>

              <router-link to="/login" class="nb-dd-item" @click="isOpen = false">
                <i class="bi bi-box-arrow-in-right"></i><span>Đăng nhập</span>
              </router-link>
              <router-link to="/register" class="nb-dd-item" @click="isOpen = false">
                <i class="bi bi-person-plus"></i><span>Đăng ký</span>
              </router-link>

              <div class="nb-dd-divider"></div>

              <a href="#" class="nb-dd-item">
                <i class="bi bi-heart"></i><span>Yêu thích</span>
              </a>
              <a href="#" class="nb-dd-item">
                <i class="bi bi-bag"></i><span>Đơn hàng</span>
              </a>

            </div>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import logo from '../assets/logo/logo.png'
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const isCategoryOpen = ref(false)
const dropdownRef = ref(null)
const categoryRef = ref(null)

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
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false
  }
  if (categoryRef.value && !categoryRef.value.contains(e.target)) {
    isCategoryOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.nb-glass {
  background: rgba(248, 249, 250, 0.7) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1000;
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

/* ── Account Dropdown ── */
.nb-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 220px;
  background: #fff;
  border: 1px solid rgba(144, 77, 0, 0.12);
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 9999;
}

.nb-dd-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: rgba(255, 140, 0, 0.05);
}

.nb-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #FF8C00;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.nb-dd-name {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 13px;
  color: #191C1D;
  margin: 0;
}

.nb-dd-email {
  font-size: 11px;
  color: #94A3B8;
  margin: 0;
}

.nb-dd-divider {
  height: 1px;
  background: rgba(144, 77, 0, 0.08);
  margin: 4px 0;
}

.nb-dd-item {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  padding: 10px 16px !important;
  font-family: 'Manrope', sans-serif !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #191C1D !important;
  background: transparent !important;
  text-decoration: none !important;
  cursor: pointer !important;
  transition: background .15s !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.nb-dd-item:hover {
  background: rgba(255, 140, 0, 0.06) !important;
  color: #FF8C00 !important;
}

.nb-dd-item i {
  font-size: 15px;
  color: #94A3B8 !important;
}

.nb-dd-item:hover i {
  color: #FF8C00 !important;
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