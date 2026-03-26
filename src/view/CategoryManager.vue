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
                placeholder="Search...">
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light text-muted small text-uppercase">
                  <tr>
                    <th class="ps-4 py-3">ID</th>
                    <th>Tên danh mục</th>
                    <th>Mô tả</th>
                    <th class="text-end pe-4">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cat in filteredCategories" :key="cat.id">
                    <td class="ps-4 fw-bold text-muted">#{{ cat.id }}</td>
                    <td><span class="fw-bold text-dark">{{ cat.name }}</span></td>
                    <td class="text-muted small">{{ cat.description }}</td>
                    <td class="text-end pe-4">
                      <router-link :to="'/admin/categories/' + cat.id" class="btn btn-sm btn-link text-primary p-1 me-2"
                        title="Sửa">
                        <span class="material-symbols-outlined fs-5">edit</span>
                      </router-link>
                      <button @click="deleteCategory(cat.id, cat.name)" class="btn btn-sm btn-link text-danger p-1"
                        title="Xóa">
                        <span class="material-symbols-outlined fs-5">delete</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryManager",
  data() {
    return {
      searchQuery: "",
      categories: []
    };
  },
  mounted() {

    const savedCats = localStorage.getItem('categories');

    if (savedCats) {

      this.categories = JSON.parse(savedCats);
    } else {

      const defaultData = [
        { id: 1, name: "Văn học", description: "Các tác phẩm văn học trong và ngoài nước" },
        { id: 2, name: "Kinh tế", description: "Sách về quản trị, đầu tư, tài chính" },
        { id: 3, name: "Tâm lý học", description: "Sách phát triển bản thân, tâm lý" },
        { id: 4, name: "Khoa học", description: "Khám phá vũ trụ và tự nhiên" },
        { id: 5, name: "Thiếu nhi", description: "Truyện tranh và sách cho bé" }
      ];
      this.categories = defaultData;

      localStorage.setItem('categories', JSON.stringify(defaultData));
    }
  },
  computed: {
    filteredCategories() {
      const query = this.searchQuery.toLowerCase();
      return this.categories.filter(cat => {
        return (
          cat.name.toLowerCase().includes(query) ||
          cat.description.toLowerCase().includes(query)
        );
      });
    }
  },
  methods: {
    deleteCategory(id, name) {
      if (confirm(`Bạn có muốn xóa dnah mục này không?`)) {
        let list = JSON.parse(localStorage.getItem('categories')) || [];
        const newList = list.filter(item => String(item.id) !== String(id));
        localStorage.setItem('categories', JSON.stringify(newList));

        this.categories = newList;
        alert("Đã xóa thành công!");
      }
    }
  }
};
</script>