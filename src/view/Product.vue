<template>
  <div class="product-layout">
    <FilterSidebar :filters="filters" :categoryOptions="categoryOptions" @apply="applyFiltersAndFetch" />

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

      <ProductGrid v-if="books.length > 0" :books="books" />
      <div v-else class="text-center py-5 text-muted">
        <p>Không tìm thấy sản phẩm nào phù hợp.</p>
      </div>

      <ProductPg v-if="totalPages > 1" :pages="pagesArray" :currentPage="currentPage" @changePage="handlePageChange" />
    </main>

    <SgSidebar v-if="suggestedBooks.length > 0" :books="suggestedBooks" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useToast } from 'vue-toastification'
import api from '../api/api.js'

import FilterSidebar from '../components/product/FilterSidebar.vue'
import ProductGrid from '../components/product/ProductGrid.vue'
import ProductPg from '../components/product/ProductPg.vue'
import SgSidebar from '../components/product/SgSidebar.vue'

const toast = useToast()

const books = ref([])
const allBooks = ref([])
const suggestedBooks = ref([])
const categoryOptions = ref([])

const filters = reactive({
  search: '',
  categories: [],
  maxPrice: 1000000,
})

const activeSort = ref('newest')
const currentPage = ref(1)
const pageSize = 12

const pagesArray = computed(() => {
  const totalPages = Math.ceil(books.value.length / pageSize) || 1
  const pages = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return pages
})
const fetchData = async () => {
  try {
    const [bookRes, catRes, suggestRes] = await Promise.all([
      api.get('/api/v1/books', { params: { size: 200 } }),
      api.get('/api/v1/categories'),
      api.get('/api/v1/books', { params: { size: 6, sort: 'bestseller' } })
    ])

    allBooks.value = bookRes.data.result?.content || bookRes.data.result || []

    if (categoryOptions.value.length === 0) {
      categoryOptions.value = catRes.data.result?.map(cat => ({
        label: cat.categoryName,
        value: cat.categoryId
      })) || []
    }

    suggestedBooks.value = suggestRes.data.result?.content || suggestRes.data.result || []

    applyFilters()
  } catch (error) {
    console.error(error)
    toast.error("Không thể tải dữ liệu sách")
  }
}


const applyFilters = () => {
  let filtered = [...allBooks.value]


  if (filters.search?.trim()) {
    const keyword = filters.search.toLowerCase().trim()
    filtered = filtered.filter(book =>
      book.title?.toLowerCase().includes(keyword) ||
      book.author?.toLowerCase().includes(keyword)
    )
  }


  if (filters.categories.length > 0) {
    filtered = filtered.filter(book =>
      filters.categories.includes(book.categoryId || book.category?.categoryId)
    )
  }


  filtered = filtered.filter(book => (book.price || 0) <= filters.maxPrice)


  if (activeSort.value === 'price-asc') {
    filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
  } else if (activeSort.value === 'bestseller') {
    filtered.sort((a, b) => (b.soldQuantity || 0) - (a.soldQuantity || 0))
  } else {
    filtered.sort((a, b) => (b.bookId || 0) - (a.bookId || 0))
  }

  books.value = filtered
  currentPage.value = 1
}

const applyFiltersAndFetch = () => {
  applyFilters()
}

const handlePageChange = (page) => {
  currentPage.value = page
}
const sortOptions = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Bán chạy', value: 'bestseller' },
  { label: 'Giá thấp - cao', value: 'price-asc' },
]

watch(() => filters.search, () => {
  applyFilters()
})

onMounted(() => {
  fetchData()
})
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