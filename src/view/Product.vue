<template>
  <div class="product-layout">
    <FilterSidebar :filters="filters" :categoryOptions="categoryOptions" />

    <main class="product-main">
      <div class="product-header">
        <div>
          <h2 class="product-title">Tất cả sản phẩm</h2>
          <p class="product-subtitle">Khám phá kho tàng tri thức với hơn 5,000 đầu sách tuyển chọn.</p>
        </div>
        <div class="sort-tabs">
          <button v-for="sort in sortOptions" :key="sort.value" class="sort-tab"
            :class="{ active: activeSort === sort.value }" @click="activeSort = sort.value">
            {{ sort.label }}
          </button>
        </div>
      </div>

      <ProductGrid :books="books" />

      <ProductPg :pages="pages" :currentPage="currentPage" @changePage="currentPage = $event" />
    </main>

    <SgSidebar :books="suggestedBooks" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import allProducts from '../data/products.json'
import FilterSidebar from '../components/product/FilterSidebar.vue'
import ProductGrid from '../components/product/ProductGrid.vue'
import ProductPg from '../components/product/ProductPg.vue'
import SgSidebar from '../components/product/SgSidebar.vue'

const books = ref(allProducts)

const suggestedBooks = ref(allProducts.slice(0, 3))


const filters = reactive({
  search: '',
  categories: [],
  maxPrice: 1000000,
})

const categoryOptions = [
  { label: 'Văn học', value: 'van-hoc' },
  { label: 'Kinh tế', value: 'kinh-te' },
  { label: 'Tâm lý', value: 'tam-ly' },
  { label: 'Ngoại ngữ', value: 'ngoai-ngu' },
]

const sortOptions = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Bán chạy', value: 'bestseller' },
  { label: 'Giá thấp - cao', value: 'price-asc' },
]

const activeSort = ref('newest')
const currentPage = ref(1)
const pages = [1, 2, 3]
</script>

<style scoped>
.product-layout {
  display: grid;
  grid-template-columns: 260px 1fr 220px;
  gap: 24px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 24px;
  align-items: start;
}

.product-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}

.product-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 24px;
  color: #191C1D;
  margin: 0 0 4px;
}

.product-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #64748B;
  margin: 0;
}

.sort-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.sort-tab {
  padding: 7px 16px;
  border: 1px solid rgba(144, 77, 0, 0.2);
  border-radius: 50px;
  background: transparent;
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #564334;
  cursor: pointer;
  transition: all .15s;
}

.sort-tab.active,
.sort-tab:hover {
  background: #FF8C00;
  color: #fff;
  border-color: #FF8C00;
}
</style>