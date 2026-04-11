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
      <div v-for="cat in categories" :key="cat.categoryId" class="cat-card" @click="filterByCategory(cat.categoryId)">
        <img
          :src="cat.imageUrl || 'https://images.unsplash.com/photo-1543004218-ee14110497f8?q=80&w=1000&auto=format&fit=crop'"
          :alt="cat.categoryName" class="cat-img" referrerpolicy="no-referrer" />
        <div class="cat-overlay"></div>
        <div class="cat-label">
          {{ cat.categoryName }}
          <span class="cat-count">{{ cat.count }} sản phẩm</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api/api';

const router = useRouter()
const categories = ref([])
const isLoading = ref(true)

const fetchData = async () => {
  try {
    isLoading.value = true
    const res = await api.get("/api/v1/categories")

    categories.value = res.data.result.filter(cat => !cat.parentId)
  } catch (error) {
    console.error("Lỗi lấy danh mục", error)
  } finally {
    isLoading.value = false
  }
}

const filterByCategory = (id) => {
  router.push({ path: '/product', query: { categoryId: id } })
}

onMounted(() => {
  fetchData()
})
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