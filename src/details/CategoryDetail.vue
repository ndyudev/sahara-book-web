<template>
  <div>
    <router-link to="/admin/categories" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
    </router-link>

    <h3 class="fw-bold mb-4">Chi tiết danh mục: <span class="text-primary">#{{ category.categoryId }}</span></h3>

    <div class="card border-0 rounded-4 shadow-sm p-4" style="max-width: 600px;">
      <div class="mb-3">
        <label class="form-label fw-bold small text-muted text-uppercase">Tên danh mục</label>
        <input v-model="category.categoryName" type="text" class="form-control bg-light border-0 py-2">
      </div>
      <div class="mb-3">
        <label class="form-label fw-bold small text-muted text-uppercase">Trạng thái</label>
        <select v-model="category.status" class="form-select bg-light border-0 py-2 fw-bold" :class="{
          'text-success': category.status === 'ACTIVE',
          'text-warning': category.status === 'DISABLE'
        }">
          <option value="ACTIVE" class="text-success fw-bold">Hoạt động</option>
          <option value="DISABLE" class="text-warning fw-bold">Tạm ngưng</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="form-label fw-bold small text-muted text-uppercase">Mô tả danh mục</label>
        <textarea v-model="category.description" class="form-control bg-light border-0" rows="4"></textarea>
      </div>

      <div class="d-flex flex-column gap-2">
        <div class="d-flex gap-2">
          <button @click="updateCategory"
            class="btn btn-primary text-white fw-bold px-4 py-2 rounded-3 shadow-sm flex-grow-1">
            Cập nhật thay đổi
          </button>
          <button class="btn btn-outline-danger px-4 py-2 rounded-3 fw-bold border-0" data-bs-toggle="modal"
            data-bs-target="#deleteConfirmModal">
            Xóa danh mục
          </button>
        </div>
        <router-link to="/admin/categories" class="btn btn-light py-2 rounded-3 fw-bold mt-2">Hủy</router-link>
      </div>
    </div>

    <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <span class="material-symbols-outlined text-danger mb-3" style="font-size: 4rem;">warning</span>
            <h4 class="fw-bold">Bạn chắc chắn muốn xóa?</h4>
            <div class="d-flex gap-2 justify-content-center mt-4">
              <button type="button" class="btn btn-light px-4 fw-bold" data-bs-dismiss="modal"
                id="closeDelModal">Hủy</button>
              <button type="button" class="btn btn-danger px-4 fw-bold" @click="confirmDelete">Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import api from '../api/api.js';

const route = useRoute();
const router = useRouter();
const toast = useToast();


const category = ref({
  categoryId: "",
  categoryName: "",
  status: "",
  description: ""
});

const loadCategory = async () => {
  const id = route.params.id;

  try {
    const res = await api.get(`/api/v1/categories/${id}`);
    category.value = res.data.result;
  } catch (error) {
    toast.error("Không tìm thấy ID danh mục này!");
    router.push('/admin/categories');

  }
};

const updateCategory = async () => {
  if (!category.value.categoryName) {
    toast.error("Tên danh mục không được để trống!");
    return;
  }

  try {
    await api.put(`/api/v1/categories/${category.value.categoryId}`, {
      categoryName: category.value.categoryName,
      status: category.value.status,
      description: category.value.description
    });
    toast.success("Cập nhật thành công!");
    router.push("/admin/categories");
  } catch (error) {
    toast.error("Cập nhật thất bại!");
  }
}

const confirmDelete = async () => {
  try {
    await api.delete(`/api/v1/categories/${category.value.categoryId}`);
    document.getElementById('closeDelModal')?.click();

    toast.success("Xóa danh mục thành công!");
    router.push('/admin/categories');
  } catch (error) {
    toast.error("Xóa thất bại!");
    document.getElementById('closeDelModal')?.click();
  }
}


onMounted(() => {
  loadCategory();
});
</script>

<style scoped>
.form-control:focus,
.form-select:focus {
  background-color: #fff !important;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
  border: 1px solid #0d6efd !important;
}
</style>