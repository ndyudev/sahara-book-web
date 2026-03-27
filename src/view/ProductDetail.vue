<template>
  <div class="pd-page">
    <div class="pd-inner">

      <div class="pd-cover-wrap">
        <img :src="book.imageUrl" :alt="book.title" class="pd-cover" referrerpolicy="no-referrer" />
      </div>

      <div class="pd-detail">

        <span class="pd-badge">{{ book.badge }}</span>

        <h1 class="pd-title">{{ book.title }}</h1>
        <p class="pd-author">by {{ book.author }}</p>

        <div class="pd-rating">
          <div class="pd-stars">
            <i v-for="n in 5" :key="n" class="bi"
              :class="n <= Math.round(book.rating) ? 'bi-star-fill' : 'bi-star'"></i>
          </div>
          <span class="pd-reviews">({{ book.reviewCount.toLocaleString('vi-VN') }} đánh giá)</span>
        </div>
        <div class="pd-price-row">
          <span class="pd-price-sale">{{ formatPrice(book.salePrice) }}</span>
          <span class="pd-price-original">{{ formatPrice(book.originalPrice) }}</span>
          <span class="pd-discount-badge">{{ book.discountPercent }}% OFF</span>
        </div>


        <div class="pd-desc-section">
          <p class="pd-desc-label">Mô tả</p>
          <p class="pd-desc-text">{{ book.description }}</p>
        </div>


        <div class="pd-meta-grid">
          <div class="pd-meta-item" v-for="meta in bookMeta" :key="meta.label">
            <span class="pd-meta-label">{{ meta.label }}</span>
            <span class="pd-meta-value">{{ meta.value }}</span>
          </div>
        </div>

        <div class="pd-actions">
          <button class="pd-btn-cart" @click="addToCart()">
            <i class="bi bi-bag-plus"></i>
            Thêm vào giỏ
          </button>
          <button class="pd-btn-buy" @click="buyNow()">Mua ngay</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import books from '../data/products.json'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const book = books.find(b => b.id === Number(route.params.id))
if (!book) router.push('/')

const addToCart = () => {
  const cartData = localStorage.getItem('cart')
  let cart = cartData ? JSON.parse(cartData) : []

  const index = cart.findIndex(item => item.id === book.id)

  if (index !== -1) {
    cart[index].quantity += 1
  } else {

    const newProduct = {
      id: book.id,
      title: book.title,
      price: book.salePrice,
      image: book.imageUrl,
      quantity: 1,
      author: book.author,
      category: book.category
    }
    cart.push(newProduct)
  }

  localStorage.setItem('cart', JSON.stringify(cart))

  window.dispatchEvent(new Event('storage'))


  toast.success(`Đã thêm "${book.title}" vào giỏ hàng!`)

}

const buyNow = () => {
  const cartData = localStorage.getItem('cart')
  let cart = cartData ? JSON.parse(cartData) : []

  const index = cart.findIndex(item => item.id === book.id)

  if (index !== -1) {
    cart[index].quantity += 1
  } else {

    const newProduct = {
      id: book.id,
      title: book.title,
      price: book.salePrice,
      image: book.imageUrl,
      quantity: 1,
      author: book.author,
      category: book.category
    }
    cart.push(newProduct)
  }

  localStorage.setItem('cart', JSON.stringify(cart))

  window.dispatchEvent(new Event('storage'))
  router.push('/checkout')
}
const bookMeta = computed(() => [
  { label: 'ISBN-13', value: book?.isbn },
  { label: 'NXB', value: book?.publisher },
  { label: 'Số trang', value: book?.pages + ' trang' },
  { label: 'Định dạng', value: book?.format },
])

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