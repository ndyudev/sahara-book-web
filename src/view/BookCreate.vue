<template>
  <div>
    <router-link to="/admin/books" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
    </router-link>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold mb-0">Thêm sách mới</h3>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4">
          <div class="row g-3">
            <div class="col-md-12">
              <label class="form-label fw-bold">Tên cuốn sách</label>
              <input v-model="newBook.title" type="text" class="form-control bg-light border-0 py-2" placeholder="Nhập tên sách...">
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold">Tác giả</label>
              <input v-model="newBook.author" type="text" class="form-control bg-light border-0 py-2" placeholder="Tên tác giả">
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold">Danh mục</label>
              <select v-model="newBook.categoryId" class="form-select bg-light border-0 py-2">
                <option value="">Chọn danh mục</option>
                <option v-for="cat in categoriesList" :key="cat.categoryId" :value="cat.categoryId">
                  {{ cat.categoryName }}
                </option>
              </select>
            </div>
            <div class="col-md-12">
              <label class="form-label fw-bold">Mô tả ngắn</label>
              <textarea v-model="newBook.description" class="form-control bg-light border-0" rows="4" placeholder="Viết gì đó về cuốn sách này..."></textarea>
            </div>
          </div>
        </div>

        <div class="card border-0 rounded-4 shadow-sm p-4">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label fw-bold">Giá bán (VNĐ)</label>
              <input v-model="newBook.price" type="number" class="form-control bg-light border-0 py-2" placeholder="0">
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold">Số lượng trong kho</label>
              <input v-model="newBook.stockQuantity" type="number" class="form-control bg-light border-0 py-2" placeholder="0">
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4 text-center">
          <label class="form-label fw-bold d-block text-start">Ảnh bìa sách</label>
          <div @click="triggerUpload" class="border border-2 border-dashed rounded-4 bg-light d-flex flex-column align-items-center justify-content-center overflow-hidden" 
               style="cursor: pointer; min-height: 250px;">
            <template v-if="imagePreview">
                <img :src="imagePreview" class="w-100 h-100 object-fit-cover">
            </template>
            <template v-else>
                <span class="material-symbols-outlined fs-1 text-muted mb-2">add_a_photo</span>
                <small class="text-muted fw-bold">Bấm để tải ảnh lên</small>
            </template>
            <input type="file" ref="fileInput" class="d-none" @change="handleFileUpload" accept="image/*">
          </div>
        </div>

        <div class="d-grid gap-2">
          <button @click="saveBook" :disabled="isSaving" class="btn btn-primary text-white fw-bold py-3 rounded-3 shadow-sm">
            <span v-if="isSaving" class="spinner-border spinner-border-sm me-2"></span>
            Lưu sách mới
          </button>
          <button @click="$router.push('/admin/books')" class="btn btn-outline-secondary border-0 py-2">Hủy bỏ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import api from '../api/api'; 

const toast = useToast();
const router = useRouter();
const fileInput = ref(null);
const imagePreview = ref(null);
const selectedFile = ref(null);
const isSaving = ref(false);
const categoriesList = ref([]);

const newBook = ref({
    title: "",
    author: "",
    categoryId: "",
    description: "",
    price: null,
    stockQuantity: null,
});

const loadCategories = async () => {
    try {
        const res = await api.get("/api/v1/categories");
        categoriesList.value = res.data.result;
    } catch (error) {
        console.error("Lỗi tải danh mục:", error);
    }
};

onMounted(loadCategories);

const triggerUpload = () => fileInput.value.click();

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        imagePreview.value = URL.createObjectURL(file);
    }
};

const saveBook = async () => {

    if (!newBook.value.title || !newBook.value.price || !newBook.value.categoryId) {
        toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc!");
        return;
    }

    isSaving.value = true;
    try {

        const payload = {
            title: newBook.value.title,
            author: newBook.value.author,
            categoryId: newBook.value.categoryId,
            description: newBook.value.description,
            price: newBook.value.price,
            stockQuantity: newBook.value.stockQuantity,
            imageUrl: "" 
        };

        await api.post("/api/v1/books", payload);
        
        toast.success("Thêm sách mới thành công!");
        router.push('/admin/books'); 
    } catch (error) {
        console.error("Lỗi khi tạo sách:", error);
        toast.error(error.response?.data?.message || "Không thể lưu sách!");
    } finally {
        isSaving.value = false;
    }
};
</script>

<style scoped>
.form-control:focus, .form-select:focus {
  background-color: #fff !important;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
  border: 1px solid #0d6efd !important;
}
.border-dashed {
  border-style: dashed !important;
}
</style>