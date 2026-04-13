<template>
  <div>
    <router-link to="/admin/books" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
    </router-link>

    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted">Đang tải thông tin sách...</p>
    </div>

    <div v-else class="row">
      <div class="col-md-8">
        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4">
          <div class="row g-3">
            <div class="col-md-12">
              <label class="form-label fw-bold">Tên cuốn sách</label>
              <input v-model="book.title" type="text" class="form-control bg-light border-0 py-2">
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold">Tác giả</label>
              <input v-model="book.author" type="text" class="form-control bg-light border-0 py-2">
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold">Danh mục</label>
              <select v-model="book.categoryId" class="form-select bg-light border-0 py-2">
                <option v-for="cat in categoriesList" :key="cat.categoryId" :value="cat.categoryId">
                  {{ cat.categoryName }}
                </option>
              </select>
            </div>
            <div class="col-md-12">
              <label class="form-label fw-bold">Mô tả ngắn</label>
              <textarea v-model="book.description" class="form-control bg-light border-0" rows="5"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4 text-center">
          <label class="form-label fw-bold d-block text-start">Ảnh bìa sách</label>
          <div @click="triggerUpload" class="border border-2 border-dashed rounded-4 bg-light d-flex align-items-center justify-content-center overflow-hidden mt-2" 
               style="cursor: pointer; min-height: 250px;">
            <img :src="book.imageUrl || 'https://via.placeholder.com/150'" class="w-100 h-100 object-fit-cover">
            <input type="file" ref="fileInput" class="d-none" @change="handleFileUpload" accept="image/*">
          </div>
          <small class="text-primary fw-bold mt-2 d-block">Bấm để đổi ảnh bìa</small>
        </div>

        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4">
          <div class="mb-3">
            <label class="form-label fw-bold">Giá bán (VNĐ)</label>
            <input v-model="book.price" type="number" class="form-control bg-light border-0 py-2">
          </div>
          <div>
            <label class="form-label fw-bold">Số lượng tồn</label>
            <input v-model="book.stockQuantity" type="number" class="form-control bg-light border-0 py-2">
          </div>
        </div>

        <div class="d-grid gap-2">
          <button @click="updateBook" :disabled="isProcessing" class="btn btn-primary text-white fw-bold py-3 rounded-3 shadow-sm">
            <span v-if="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
            Cập nhật thông tin
          </button>
          <button @click="deleteBook" :disabled="isProcessing" class="btn btn-outline-danger border-0 py-2">
            Xóa cuốn sách này
          </button>
          <hr>
          <button @click="$router.push('/admin/books')" class="btn btn-light py-2 rounded-3 fw-bold">Hủy bỏ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import api from '../api/api';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const fileInput = ref(null);
const isLoading = ref(true);
const isProcessing = ref(false);
const categoriesList = ref([]);
const selectedFile = ref(null); 

const book = ref({
  bookId: null,
  title: "",
  author: "",
  categoryId: "",
  description: "",
  price: 0,
  stockQuantity: 0,
  imageUrl: "",
  status: "ACTIVE" 
});

const initData = async () => {
  isLoading.value = true;
  const bookId = route.params.id;
  try {
    const [catRes, bookRes] = await Promise.all([
      api.get("/api/v1/categories"),
      api.get(`/api/v1/books/${bookId}`)
    ]);

    categoriesList.value = catRes.data.result;
    const data = bookRes.data.result;
    
    book.value = {
      ...data,

      categoryId: data.categoryId || (data.category ? data.category.categoryId : "")
    };
  } catch (error) {
    toast.error("Không thể tải thông tin sách!");
    router.push('/admin/books');
  } finally {
    isLoading.value = false;
  }
};

onMounted(initData);

const triggerUpload = () => fileInput.value.click();

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file; 
    book.value.imageUrl = URL.createObjectURL(file); 
    toast.info("Đã chọn ảnh mới. Nhấn Cập nhật để lưu.");
  }
};

const updateBook = async () => {
  if (!book.value.title || !book.value.price) {
    toast.error("Vui lòng nhập tên và giá sách!");
    return;
  }

  isProcessing.value = true;
  try {

    const formData = new FormData();
    
    formData.append('title', book.value.title);
    formData.append('author', book.value.author || "");
    formData.append('categoryId', book.value.categoryId);
    formData.append('description', book.value.description || "");
    formData.append('price', book.value.price);
    formData.append('stockQuantity', book.value.stockQuantity);
    formData.append('status', book.value.status); 

    if (selectedFile.value) {
        formData.append('file', selectedFile.value);
    }


    await api.put(`/api/v1/books/${book.value.bookId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    toast.success("Cập nhật thành công!");
    router.push('/admin/books');
  } catch (error) {
    console.error(error);
    const msg = error.response?.data?.message || "Lỗi khi cập nhật!";
    toast.error(msg);
  } finally {
    isProcessing.value = false;
  }
};

const deleteBook = async () => {
  if (confirm(`Bạn có chắc muốn xóa cuốn "${book.value.title}"?`)) {
    isProcessing.value = true;
    try {
      await api.delete(`/api/v1/books/${book.value.bookId}`);
      toast.success("Đã xóa sách!");
      router.push('/admin/books');
    } catch (error) {
      toast.error("Xóa thất bại!");
    } finally {
      isProcessing.value = false;
    }
  }
};
</script>