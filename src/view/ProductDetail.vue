<template>
  <div class="pd-page" v-if="book">
    <div class="pd-inner">

      <div class="pd-cover-wrap">
        <img :src="book.imageUrl" :alt="book.title" class="pd-cover" referrerpolicy="no-referrer" />
      </div>

      <div class="pd-detail">
        <span class="pd-badge">{{ book.status }}</span>

        <h1 class="pd-title">{{ book.title }}</h1>
        <p class="pd-author">Tác giả: {{ book.author }}</p>

        <div class="pd-rating">
          <div class="pd-stars">
            <i v-for="n in 5" :key="n" class="bi bi-star-fill"></i>
          </div>
          <span class="pd-reviews">(Sản phẩm chính hãng Sahara)</span>
        </div>

        <div class="pd-price-row">
          <span class="pd-price-sale">{{ formatPrice(book.price) }}</span>
          <span v-if="book.stockQuantity > 0" class="pd-badge" style="background: #e7f6e7; color: #28a745;">
            Còn {{ book.stockQuantity }} cuốn
          </span>
        </div>

        <div class="pd-desc-section">
          <p class="pd-desc-label">Mô tả sản phẩm</p>
          <p class="pd-desc-text">
            {{ book.description || 'Hiện chưa có mô tả chi tiết cho cuốn sách này.' }}
          </p>
        </div>

        <div class="pd-meta-grid">
          <div class="pd-meta-item" v-for="meta in bookMeta" :key="meta.label">
            <span class="pd-meta-label">{{ meta.label }}</span>
            <span class="pd-meta-value">{{ meta.value }}</span>
          </div>
        </div>

        <div class="pd-actions">
          <button class="pd-btn-cart" @click="addToCart" :disabled="book.stockQuantity === 0">
            <i class="bi bi-bag-plus"></i> Thêm vào giỏ
          </button>
          <button class="pd-btn-buy" @click="buyNow" :disabled="book.stockQuantity === 0">Mua ngay</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-5">
    Đang tải thông tin sách...
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '../api/api.js';

const route = useRoute()
const router = useRouter()
const toast = useToast()

const book = ref(null) 

// Hàm lấy chi tiết sách từ API
const fetchBookDetail = async () => {
  try {
    const res = await api.get(`/api/v1/books/${route.params.id}`)
    book.value = res.data.result
  } catch (error) {
    toast.error("Không tìm thấy sách này!")
    router.push('/product')
  }
}

onMounted(() => {
  fetchBookDetail()
})

const addToCart = () => {
  if (!book.value) return

  const cartData = localStorage.getItem('cart')
  let cart = cartData ? JSON.parse(cartData) : []

  const index = cart.findIndex(item => item.bookId === book.value.bookId)

  if (index !== -1) {
    cart[index].quantity += 1
  } else {
    cart.push({
      bookId: book.value.bookId,
      title: book.value.title,
      price: book.value.price,
      image: book.value.imageUrl,
      quantity: 1,
      author: book.value.author
    })
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  window.dispatchEvent(new Event('storage'))
  toast.success(`Đã thêm vào giỏ hàng!`)
}

// Hàm Mua ngay
const buyNow = () => {
  addToCart()
  router.push('/checkout')
}

// Meta data động từ API
const bookMeta = computed(() => {
  if (!book.value) return []
  return [
    { label: 'Mã sách', value: '#' + book.value.bookId },
    { label: 'Danh mục', value: book.value.category?.categoryName || 'Chưa phân loại' },
    { label: 'Tác giả', value: book.value.author || 'Ẩn danh' },
    { label: 'Tình trạng', value: book.value.stockQuantity > 0 ? 'Còn hàng' : 'Hết hàng' },
  ]
})

const formatPrice = (price) => {
  return Number(price || 0).toLocaleString('vi-VN') + 'đ'
}
</script>
<style>
.pd-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 24px;
}

.pd-inner {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 48px;
  align-items: start;
}

.pd-cover-wrap {
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 8px;
  overflow: hidden;
  background: #E2E8F0;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.pd-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pd-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pd-badge {
  display: inline-flex;
  background: rgba(255, 140, 0, 0.1);
  color: #FF8C00;
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 50px;
  letter-spacing: 0.5px;
  width: fit-content;
}

.pd-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 48px;
  line-height: 1.1;
  color: #0F172A;
  margin: 0;
}

.pd-author {
  font-family: 'Manrope', sans-serif;
  font-size: 20px;
  color: #FF8C00;
  margin: 0;
}

.pd-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pd-stars {
  display: flex;
  gap: 2px;
}

.pd-stars .bi-star-fill {
  color: #FF8C00;
  font-size: 18px;
}

.pd-stars .bi-star {
  color: #CBD5E1;
  font-size: 18px;
}

.pd-reviews {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  color: #64748B;
}

.pd-price-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.pd-price-sale {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 30px;
  color: #0F172A;
}

.pd-price-original {
  font-family: 'Manrope', sans-serif;
  font-size: 20px;
  color: #94A3B8;
  text-decoration: line-through;
}

.pd-discount-badge {
  background: #ef4444;
  color: #fff;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 14px;
  padding: 2px 10px;
  border-radius: 4px;
}

.pd-desc-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
  border-top: 1px solid rgba(144, 77, 0, 0.08);
  border-bottom: 1px solid rgba(144, 77, 0, 0.08);
}

.pd-desc-label {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.pd-desc-text {
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: #475569;
  margin: 0;
}

.pd-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 24px;
}

.pd-meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pd-meta-label {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pd-meta-value {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #0F172A;
}

.pd-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.pd-btn-cart {
  flex: 1;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #FF8C00;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
}

.pd-btn-buy {
  flex: 1;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #FF8C00;
  border: 2px solid #FF8C00;
  border-radius: 8px;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
}
</style>