<template>

  <aside class="bg-white border-end d-flex flex-column p-3 vh-100 sticky-top flex-shrink-0"
    style="width: 260px; min-width: 260px;">

    <div class="mb-4 px-2 text-center">
      <img src="../assets/logo/logo.png" alt="Sahara KBK Logo" class="img-fluid mb-2">
    </div>

    <nav class="nav flex-column gap-1 overflow-auto custom-scrollbar flex-grow-1">
      <router-link v-for="item in menu" :key="item.path" :to="item.path" exact-active-class="bg-primary text-white"
        class="nav-link text-dark rounded d-flex align-items-center gap-2 py-2 px-3">
        <span class="material-symbols-outlined fs-5">{{ item.icon }}</span>
        <span class="menu-text">{{ item.name }}</span>
      </router-link>

      <a href="#" @click.prevent="handleLogout"
        class="nav-link text-danger rounded d-flex align-items-center gap-2 py-2 px-3 mt-auto">
        <span class="material-symbols-outlined fs-5">logout</span>
        <span class="menu-text">Đăng xuất</span>
      </a>

    </nav>

  </aside>

</template>

<script setup>
import { reactive } from 'vue'
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const menu = [
  { name: 'Tổng quan', path: '/admin', icon: 'dashboard' },
  { name: 'Quản lý sách', path: '/admin/books', icon: 'menu_book' },
  { name: 'Danh mục', path: '/admin/categories', icon: 'category' },
  { name: 'Đơn hàng', path: '/admin/orders', icon: 'shopping_bag' },
  { name: 'Hóa đơn', path: '/admin/invoices', icon: 'receipt_long' },
  { name: 'Người dùng', path: '/admin/users', icon: 'group' }
]


const confirmData = reactive({
  show: false
})

const handleLogout = () => {
  localStorage.removeItem('user-token')
  localStorage.removeItem('user-info')
  confirmData.show = false
  toast.success("Bạn đã đăng xuất thành công!", "success")
  router.push('/login');
}

</script>