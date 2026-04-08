<template>
  <div>
    <router-link to="/admin/categories" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
    </router-link>

    <h3 class="fw-bold mb-4">Chi tiết danh mục: <span class="text-primary">#{{ category.id }}</span></h3>

    <div class="card border-0 rounded-4 shadow-sm p-4" style="max-width: 600px;">
      <div class="mb-3">
        <label class="form-label fw-bold small text-muted text-uppercase">Tên danh mục</label>
        <input v-model="category.name" type="text" class="form-control bg-light border-0 py-2">
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold small text-muted text-uppercase">Chỉ mục</label>
        <select v-model="category.parentId" class="form-select bg-light border-0 py-2">
          <option :value="null"></option>
          <option v-for="cat in availableParents" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
      
      <div class="mb-4">
        <label class="form-label fw-bold small text-muted text-uppercase">Mô tả danh mục</label>
        <textarea v-model="category.description" class="form-control bg-light border-0" rows="4"></textarea>
      </div>

      <div class="d-flex flex-column gap-2">
        <div class="d-flex gap-2">
          <button @click="updateCategory" class="btn btn-primary text-white fw-bold px-4 py-2 rounded-3 shadow-sm flex-grow-1">
            Cập nhật thay đổi
          </button>
          <button class="btn btn-outline-danger px-4 py-2 rounded-3 fw-bold border-0" 
                  data-bs-toggle="modal" data-bs-target="#deleteConfirmModal">
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
              <button type="button" class="btn btn-light px-4 fw-bold" data-bs-dismiss="modal" id="closeDelModal">Hủy</button>
              <button type="button" class="btn btn-danger px-4 fw-bold" @click="confirmDelete">Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
  name: "CategoryDetail",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      allCategories: [],
      category: {
        id: "",
        name: "",
        parentId: null,
        description: ""
      }
    };
  },
  computed: {

    availableParents() {
      return this.allCategories.filter(c => 
        String(c.id) !== String(this.category.id) && c.parentId === null
      );
    }
  },
  mounted() {
    const catId = this.$route.params.id;
    this.loadData(catId);
  },
  methods: {
    loadData(id) {
      const list = JSON.parse(localStorage.getItem('categories')) || [];
      this.allCategories = list;

      const found = list.find(item => String(item.id) === String(id));
      
      if (found) {
        this.category = { ...found };
      } else {
        this.toast.error("Không tìm thấy danh mục!");
        this.$router.push('/admin/categories');
      }
    },
    updateCategory() {
      if (!this.category.name) {
        this.toast.error("Tên danh mục không được để trống!");
        return;
      }

      let list = JSON.parse(localStorage.getItem('categories')) || [];
      const index = list.findIndex(item => String(item.id) === String(this.category.id));

      if (index !== -1) {
        list[index] = this.category;
        localStorage.setItem('categories', JSON.stringify(list));
        this.toast.success("Đã cập nhật danh mục thành công!");
        this.$router.push('/admin/categories');
      }
    },
    confirmDelete() {

      const hasChildren = this.allCategories.some(c => String(c.parentId) === String(this.category.id));
      
      if (hasChildren) {
        this.toast.error("Không thể xóa! Danh mục này đang có các danh mục con.");
        document.getElementById('closeDelModal').click();
        return;
      }

      let list = this.allCategories.filter(item => String(item.id) !== String(this.category.id));
      localStorage.setItem('categories', JSON.stringify(list));
      
      document.getElementById('closeDelModal').click();
      
      this.toast.success("Xóa danh mục thành công!");
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