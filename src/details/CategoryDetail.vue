<template>
  <div>
    <router-link to="/admin/categories" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
    </router-link>

    <h3 class="fw-bold mb-4">Chi tiết danh mục: <span class="text-primary">#{{ category.id }}</span></h3>

    <div class="card border-0 rounded-4 shadow-sm p-4" style="max-width: 600px;">
      <div class="mb-3">
        <label class="form-label fw-bold small text-muted">Tên danh mục</label>
        <input v-model="category.name" type="text" class="form-control bg-light border-0 py-2">
      </div>
      
      <div class="mb-4">
        <label class="form-label fw-bold small text-muted">Mô tả danh mục</label>
        <textarea v-model="category.description" class="form-control bg-light border-0" rows="4"></textarea>
      </div>

      <div class="d-flex flex-column gap-2">
        <div class="d-flex gap-2">
          <button @click="updateCategory" class="btn btn-primary text-white fw-bold px-4 py-2 rounded-3 shadow-sm flex-grow-1">
            Cập nhật thay đổi
          </button>
          <button @click="deleteCategory" class="btn btn-outline-danger px-4 py-2 rounded-3 fw-bold border-0">
            Xóa danh mục
          </button>
        </div>
        <router-link to="/admin/categories" class="btn btn-light py-2 rounded-3 fw-bold mt-2">Hủy bỏ</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryDetail",
  data() {
    return {
      category: {
        id: "",
        name: "",
        description: ""
      }
    };
  },
  mounted() {
    const catId = this.$route.params.id;
    this.fetchCategory(catId);
  },
  methods: {
    fetchCategory(id) {
      const list = JSON.parse(localStorage.getItem('categories')) || [];

      const found = list.find(item => String(item.id) === String(id));
      
      if (found) {
        this.category = { ...found };
      } else {
        alert("Không tìm thấy danh mục!");
        this.$router.push('/admin/categories');
      }
    },
    updateCategory() {
      if (!this.category.name) {
        alert("Tên danh mục không được để trống!");
        return;
      }

      let list = JSON.parse(localStorage.getItem('categories')) || [];
      const index = list.findIndex(item => String(item.id) === String(this.category.id));

      if (index !== -1) {
        list[index] = this.category;
        localStorage.setItem('categories', JSON.stringify(list));
        alert("Đã cập nhật danh mục thành công!");
        this.$router.push('/admin/categories');
      }
    },
    deleteCategory() {
      if (confirm(`Bạn có chắc muốn xóa danh mục này không?`)) {
        let list = JSON.parse(localStorage.getItem('categories')) || [];
        list = list.filter(item => String(item.id) !== String(this.category.id));
        localStorage.setItem('categories', JSON.stringify(list));
        
        alert("Xóa danh mục thành công!");
        this.$router.push('/admin/categories');
      }
    }
  }
};
</script>

<style scoped>
.form-control:focus {
  background-color: #fff !important;
  box-shadow: 0 0 0 0.25rem rgba(255, 178, 122, 0.25);
  border: 1px solid #ffb27a !important;
}
</style>