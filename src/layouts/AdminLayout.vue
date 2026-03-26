
<template>

  <div class="d-flex bg-light min-vh-100 font-sans">
    <AdminSidebar />

    <div class="flex-grow-1 d-flex flex-column overflow-hidden">
      <AdminHeader />

      <main class="p-4 overflow-auto flex-grow-1">
        <router-view />
      </main>
    </div>
  </div>
  
</template>

<script>
import AdminSidebar from '../components/AdminSidebar.vue'
import AdminHeader from '../components/AdminHeader.vue'

export default {
  components: { AdminSidebar, AdminHeader }
}
</script>

<style>
/* Nhúng font và icon cho toàn hệ thống */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

.font-sans { font-family: 'Inter', sans-serif; }
h1, h2, h3, h4, h5, .fw-bold { font-family: 'Manrope', sans-serif; }
.material-symbols-outlined { vertical-align: middle; }
</style>