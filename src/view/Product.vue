<template>
  <div class="product-layout">
    <FilterSidebar :filters="filters" :categoryOptions="categoryOptions" @apply="fetchData(false)" />

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

      <ProductGrid v-if="books && books.length > 0" :books="books" />
      <div v-else-if="books && books.length === 0" class="text-center py-5">
        Đang tải sản phẩm hoặc không tìm thấy kết quả...
      </div>

      <ProductPg v-if="pagesArray && pagesArray.length > 0" :pages="pagesArray" :currentPage="currentPage"
        @changePage="currentPage = $event" />
    </main>

    <SgSidebar v-if="suggestedBooks.length > 0" :books="suggestedBooks" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router' // 1. Thêm useRoute để đọc URL
import { useToast } from 'vue-toastification';
import api from '../api/api.js'
import FilterSidebar from '../components/product/FilterSidebar.vue'
import ProductGrid from '../components/product/ProductGrid.vue'
import ProductPg from '../components/product/ProductPg.vue'
import SgSidebar from '../components/product/SgSidebar.vue'

const route = useRoute() // 2. Khai báo route
const toast = useToast();
const books = ref([])
const suggestedBooks = ref([])
const categoryOptions = ref([])

const filters = reactive({
  search: '',
  categories: [],
  maxPrice: 1000000,
})

const activeSort = ref('newest')
const currentPage = ref(1)
const totalPages = ref(0);

const pagesArray = computed(() => {
  const total = totalPages.value || 0;
  return total > 0 ? Array.from({ length: total }, (_, i) => i + 1) : [];
});

const fetchData = async (isInitiaLoad = false) => {
  try {
    if (isInitiaLoad && route.query.categoryId) {
      const catIdFromUrl = parseInt(route.query.categoryId);
      if (!filters.categories.includes(catIdFromUrl)) {
        filters.categories = [catIdFromUrl];
      }
    }

    const [bookRes, catRes, suggestRes] = isInitiaLoad
      ? await Promise.all([
        api.get("/api/v1/books"),
        api.get("/api/v1/categories"),
        api.get("/api/v1/books", { params: { size: 3 } })
      ])
      : [await api.get("/api/v1/books"), null, null];

    // Lấy toàn bộ mảng sách từ kết quả trả về
    let allBooks = bookRes.data.result.content || bookRes.data.result || [];

    let filtered = [...allBooks];

    // Lọc theo Tên sách
    if (filters.search) {
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Lọc theo Danh mục
    if (filters.categories.length > 0) {
      filtered = filtered.filter(b =>
        filters.categories.includes(b.categoryId || b.category?.bookId || b.category?.categoryId)
      );
    }
    filtered = filtered.filter(b => (b.price || b.salePrice) <= filters.maxPrice);

  
    books.value = filtered;

   
    if (isInitiaLoad) {
      categoryOptions.value = catRes.data.result.map(cat => ({
        label: cat.categoryName,
        value: cat.categoryId
      }));
      suggestedBooks.value = suggestRes.data.result.content || suggestRes.data.result;
    }

    // Tính toán lại số trang dựa trên mảng đã lọc
    totalPages.value = Math.ceil(filtered.length / 12);

  } catch (error) {
    books.value = [];
    toast.error("Lỗi tải dữ liệu");
    console.error(error);
  }
}

watch(() => route.query.categoryId, (newId) => {
  if (newId) {
    filters.categories = [parseInt(newId)];
    fetchData();
  }
});

watch([currentPage, activeSort], () => {
  fetchData();
});

onMounted(() => {
  fetchData(true);
})

const sortOptions = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Bán chạy', value: 'bestseller' },
  { label: 'Giá thấp - cao', value: 'price-asc' },
]
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