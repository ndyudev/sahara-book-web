<template>
  <div>
    <router-link to="/admin/categories" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
    </router-link>

    <h3 class="fw-bold mb-4">Thêm danh mục mới</h3>

    <div class="card border-0 rounded-4 shadow-sm p-4" style="max-width: 600px;">
      <div class="mb-3">
        <label class="form-label fw-bold small text-muted text-uppercase">Tên danh mục</label>
        <input v-model="newCategory.categoryName" type="text" class="form-control bg-light border-0 py-2"
          placeholder="Nhập tên danh mục...">
      </div>
      <div class="mb-3">
        <label class="form-label fw-bold small text-muted text-uppercase">Trạng thái</label>
        <select v-model="newCategory.status" class="form-select bg-light border-0 py-2 fw-bold" :class="{
          'text-success': newCategory.status === 'ACTIVE',
          'text-warning': newCategory.status === 'DISABLE'
        }">
          <option value="ACTIVE" class="text-success fw-bold">Hoạt động</option>
          <option value="DISABLE" class="text-warning fw-bold">Tạm ngưng</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="form-label fw-bold small text-muted  text-uppercase">Mô tả danh mục</label>
        <textarea v-model="newCategory.description" class="form-control bg-light border-0" rows="3"
          placeholder="Mô tả ngắn về danh mục..."></textarea>
      </div>

      <div class="d-flex gap-2">
        <button @click="saveCategory" class="btn btn-primary text-white fw-bold px-4 py-2 rounded-3 shadow-sm">Lưu danh
          mục</button>
        <router-link to="/admin/categories" class="btn btn-light px-4 py-2 rounded-3 fw-bold">Hủy bỏ</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api/api.js';

const router = useRouter();
const toast = useToast();


const newCategory = ref({
  categoryName: "",
  status: "",
  description: ""
});
const saveCategory = async () => {
  if (!newCategory.value.categoryName) {
    toast.error("Vui lòng nhập tên danh mục!");
    return;
  }

  try {
    await api.post("/api/v1/categories", {
      categoryName: newCategory.value.categoryName,
      status: newCategory.value.status,
      description: newCategory.value.description
    });
    toast.success("Thêm danh mục thành công!");
    router.push('/admin/categories');
  } catch (error) {
    toast.error("Lỗi thêm mới", error);
    toast.error("Thêm mới thất bại. Vui lòng thử lại!");
  }
};

</script>

<style scoped>
.form-control:focus,
.form-select:focus {
  background-color: #fff !important;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
  border: 1px solid #0d6efd !important;
}
</style>