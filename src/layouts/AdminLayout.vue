<template>
  <div class="admin-portal d-flex bg-light min-vh-100 font-sans">
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

<style lang="scss">
@import "@/style.scss";
</style>