<template>
  <section class="categories-section">
    <div class="categories-header">
      <h2 class="section-title">Danh mục</h2>
      <RouterLink to="/product" class="see-all-link text-decoration-none">
        Xem tất cả
        <i class="bi bi-arrow-right see-all-icon"></i>
      </RouterLink>
    </div>

    <div class="cat-grid">
      <div v-for="cat in uniqueCategories" :key="cat.slug" class="cat-card" @click="filterByCategory(cat.slug)">
        <img
          :src="cat.image || 'https://images.unsplash.com/photo-1543004218-ee14110497f8?q=80&w=1000&auto=format&fit=crop'"
          :alt="cat.name" class="cat-img" referrerpolicy="no-referrer" />
        <div class="cat-overlay"></div>
        <div class="cat-label">
          {{ cat.name }}
          <span class="cat-count">{{ cat.count }} sản phẩm</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import books from '../../data/products.json'
const router = useRouter()

const uniqueCategories = computed(() => {
  const map = {}

  books.forEach(b => {
    if (!map[b.category]) {
      map[b.category] = {
        name: b.category,
        slug: b.categorySlug,
        image: b.imageUrl,
        count: 0
      }
    }
    map[b.category].count++

    if (!map[b.category].image && b.imageUrl) {
      map[b.category].image = b.imageUrl
    }
  })

  return Object.values(map)
})

const filterByCategory = (slug) => {
  router.push({ path: '/product', query: { category: slug } })
}
</script>

<style scoped>
.categories-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px;
}

.categories-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 32px;
  color: #1e293b;
}

.see-all-link {
  color: #f59e0b;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.cat-card {
  position: relative;
  height: 220px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.cat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cat-card:hover .cat-img {
  transform: scale(1.1);
}

.cat-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0) 100%);
}

.cat-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  color: white;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 22px;
  display: flex;
  flex-direction: column;
}

.cat-count {
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
}
</style>