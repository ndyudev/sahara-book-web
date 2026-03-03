<template>
  <div>
    <nav class="container mt-3 mb-4">
      <router-link to="/" class="btn btn-primary me-2"
        >Trang Chủ (Home)</router-link
      >
      <router-link to="/product" class="btn btn-success"
        >Sản Phẩm (Product)</router-link
      >
      <router-link to="/login" class="btn btn-success"
        >Đăng Nhập (Login)</router-link
      >
      <router-link to="/register" class="btn btn-success"
        >Đăng Ký (Register)</router-link
      >
      <router-link to="/cart" class="btn btn-success"
        >Giỏ Hàng (Cart)</router-link
      >
      <router-link to="/product/:id" class="btn btn-success"
        >Chi Tiết Sản Phẩm (Product Detail)</router-link
      >
    </nav>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
