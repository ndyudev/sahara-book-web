<template>
  <div>
    <router-link to="/admin/categories" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
    </router-link>

    <h3 class="fw-bold mb-4">Thêm danh mục mới</h3>

    <div class="card border-0 rounded-4 shadow-sm p-4" style="max-width: 600px;">
      <div class="mb-3">
        <label class="form-label fw-bold small text-muted">Tên danh mục</label>
        <input v-model="newCategory.name" type="text" class="form-control bg-light border-0 py-2" placeholder="Nhập tên danh mục...">
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold small text-muted">Chỉ mục</label>
        <select v-model="newCategory.parentId" class="form-select bg-light border-0 py-2">
          <option :value="null"></option>
          <option v-for="cat in categoriesList" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
      
      <div class="mb-4">
        <label class="form-label fw-bold small text-muted">Mô tả danh mục</label>
        <textarea v-model="newCategory.description" class="form-control bg-light border-0" rows="3" placeholder="Mô tả ngắn về danh mục..."></textarea>
      </div>

      <div class="d-flex gap-2">
        <button @click="saveCategory" class="btn btn-primary text-white fw-bold px-4 py-2 rounded-3 shadow-sm">Lưu danh mục</button>
        <router-link to="/admin/categories" class="btn btn-light px-4 py-2 rounded-3 fw-bold">Hủy bỏ</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
  name: "CategoryCreate",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      categoriesList: [], 
      newCategory: {
        name: "",
        parentId: null, 
        description: ""
      }
    };
  },
  mounted() {

    const savedCats = localStorage.getItem('categories');
    if (savedCats) {
      this.categoriesList = JSON.parse(savedCats);
    }
  },
  methods: {
    saveCategory() {
      if (!this.newCategory.name) {
        this.toast.error("Vui lòng nhập tên danh mục!");
        return;
      }

      let list = JSON.parse(localStorage.getItem('categories')) || [];

      let nextId = 1;
      if (list.length > 0) {
        const maxId = Math.max(...list.map(item => Number(item.id)));
        nextId = maxId + 1;
      }

      const newCatObj = {
        id: nextId, 
        name: this.newCategory.name,
        parentId: this.newCategory.parentId,
        description: this.newCategory.description || "Chưa có mô tả"
      };

      list.unshift(newCatObj);
      localStorage.setItem('categories', JSON.stringify(list));

      this.toast.success("Đã thêm danh mục #" + nextId + " thành công!");
      
      this.$router.push('/admin/categories');
    }
  }
};
</script>

<style scoped>
.form-control:focus, .form-select:focus {
  background-color: #fff !important;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
  border: 1px solid #0d6efd !important;
}
</style>