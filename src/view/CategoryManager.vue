<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold mb-0">Quản lý danh mục</h3>
      <router-link to="/admin/categories/create"
        class="btn btn-primary text-white fw-bold d-flex align-items-center gap-2 px-4 py-2 rounded-3 shadow-sm">
        <span class="material-symbols-outlined fs-5">add</span> Thêm danh mục
      </router-link>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded-4 shadow-sm">
          <div class="card-body p-4 border-bottom">
            <div class="input-group" style="max-width: 300px;">
              <span class="input-group-text bg-light border-0">
                <span class="material-symbols-outlined text-muted fs-5">search</span>
              </span>
              <input v-model="searchQuery" type="text" class="form-control bg-light border-0 ps-0"
                placeholder="Tìm kiếm danh mục...">
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light text-muted small text-uppercase">
                  <tr>
                    <th class="ps-4 py-3" style="width: 100px;">ID</th>
                    <th>Tên danh mục</th>
                    <th>Cấp bậc</th>
                    <th>Mô tả</th>
                    <th class="text-end pe-4">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cat in filteredCategories" :key="cat.id">
                    <td class="ps-4 fw-bold text-muted">#{{ cat.id }}</td>
                    <td><span class="fw-bold text-dark">{{ cat.name }}</span></td>
                    <td>
                      <span v-if="!cat.parentId" class="badge bg-primary bg-opacity-10 text-primary">
                        Danh mục Gốc
                      </span>
                      <span v-else class="badge bg-info bg-opacity-10 text-info">
                        Con của: {{ getParentName(cat.parentId) }}
                      </span>
                    </td>
                    <td class="text-muted small">{{ cat.description }}</td>
                    <td class="text-end pe-4">
                      <router-link :to="'/admin/categories/' + cat.id" class="btn btn-sm btn-light text-primary rounded-circle p-2 me-2"
                        title="Sửa">
                        <span class="material-symbols-outlined fs-5 d-block">edit</span>
                      </router-link>
                      <button @click="openDeleteModal(cat)" class="btn btn-sm btn-light text-danger rounded-circle p-2"
                        data-bs-toggle="modal" data-bs-target="#deleteCatModal" title="Xóa">
                        <span class="material-symbols-outlined fs-5 d-block">delete</span>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="filteredCategories.length === 0">
                    <td colspan="5" class="text-center py-5 text-muted">Không tìm thấy danh mục nào.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteCatModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <span class="material-symbols-outlined text-danger mb-3" style="font-size: 4rem;">warning</span>
            <h4 class="fw-bold">Xác nhận xóa?</h4>
            <p class="text-muted">Bạn có chắc muốn xóa danh mục </p>
            <div class="d-flex gap-2 justify-content-center mt-4">
              <button type="button" class="btn btn-light px-4 fw-bold" data-bs-dismiss="modal" id="closeDelCatBtn">Hủy</button>
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
  name: "CategoryManager",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      searchQuery: "",
      categories: [],
      deleteTarget: { id: null, name: '' }
    };
  },
  mounted() {
    this.loadCategories();
  },
  computed: {
    filteredCategories() {
      const query = this.searchQuery.toLowerCase();
      return this.categories.filter(cat => {
        return (
          cat.name.toLowerCase().includes(query) ||
          (cat.description && cat.description.toLowerCase().includes(query))
        );
      });
    }
  },
  methods: {
    loadCategories() {
      const savedCats = localStorage.getItem('categories');
      if (savedCats) {
        this.categories = JSON.parse(savedCats);
      } else {

        const defaultData = [
          { id: 1, name: "Văn học", description: "Các tác phẩm văn học", parentId: null },
          { id: 2, name: "Kinh tế", description: "Sách quản trị, đầu tư", parentId: null },
          { id: 3, name: "Tiểu thuyết", description: "Các loại tiểu thuyết", parentId: 1 }, 
          { id: 4, name: "Marketing", description: "Sách Marketing chuyên sâu", parentId: 2 } 
        ];
        this.categories = defaultData;
        localStorage.setItem('categories', JSON.stringify(defaultData));
      }
    },

    getParentName(parentId) {
      const parent = this.categories.find(c => c.id === parentId);
      return parent ? parent.name : 'N/A';
    },
    openDeleteModal(cat) {
      this.deleteTarget = { id: cat.id, name: cat.name };
    },
    confirmDelete() {

      const hasChild = this.categories.some(c => c.parentId === this.deleteTarget.id);
      if (hasChild) {
        this.toast.error("Không thể xóa! Danh mục này đang có các danh mục con.");
        document.getElementById('closeDelCatBtn').click();
        return;
      }

      this.categories = this.categories.filter(item => item.id !== this.deleteTarget.id);
      localStorage.setItem('categories', JSON.stringify(this.categories));
      this.toast.success("Đã xóa danh mục thành công!");
      document.getElementById('closeDelCatBtn').click();
    }
  }
};
</script>