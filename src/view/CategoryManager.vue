<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold mb-0">Quản lý danh mục</h3>
      <router-link to="/admin/categories/create"
        class="btn btn-primary text-white fw-bold d-flex align-items-center gap-2 px-4 py-2 rounded-3 shadow-sm">
        <span class="material-symbols-outlined fs-5">add</span> Thêm danh mục
      </router-link>
    </div>

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
                <th class="ps-4 py-3">ID</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th class="text-end pe-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cat in filteredCategories" :key="cat.categoryId">
                <td class="ps-4 fw-bold text-muted">#{{ cat.categoryId }}</td>
                <td><span class="fw-bold text-dark">{{ cat.categoryName }}</span></td>
                <td class="text-muted small">{{ cat.description }}</td>
                <td>
                  <span class="badge"
                    :class="cat.status === 'ACTIVE' ? 'bg-success bg-opacity-10 text-success' : 'bg-secondary bg-opacity-10 text-secondary'">
                    {{ cat.status === 'ACTIVE' ? 'Đang hoạt động' : 'Tạm ngưng' }}
                  </span>
                </td>
                <td class="text-end pe-4">
                  <router-link :to="'/admin/categories/' + cat.categoryId"
                    class="btn btn-sm btn-light text-primary rounded-circle p-2 me-2" title="Sửa">
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

    <div class="modal fade" id="deleteCatModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <span class="material-symbols-outlined text-danger mb-3" style="font-size: 4rem;">warning</span>
            <h4 class="fw-bold">Xác nhận xóa?</h4>
            <p class="text-muted">Bạn có chắc muốn xóa danh mục <b>{{ deleteTarget.name }}</b>?</p>
            <div class="d-flex gap-2 justify-content-center mt-4">
              <button type="button" class="btn btn-light px-4 fw-bold" data-bs-dismiss="modal"
                id="closeDelCatBtn">Hủy</button>
              <button type="button" class="btn btn-danger px-4 fw-bold" @click="confirmDelete">Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import api from '../api/api';

const toast = useToast();
const searchQuery = ref("");
const list = ref([]);
const deleteTarget = ref({ id: null, name: '' });


const fetchData = async () => {
  try {

    const res = await api.get("/api/v1/categories");
    list.value = res.data.result;
  } catch (error) {
    console.error(error);
    toast.error("Không tải được danh mục sách!");
  }
};

const openDeleteModal = (cat) => {
  deleteTarget.value = { id: cat.categoryId, name: cat.categoryName };
};

const confirmDelete = async () => {
  try {
    await api.delete(`/api/v1/categories/${deleteTarget.value.id}`);
    toast.success(`Đã xóa danh mục "${deleteTarget.value.name}"`);

    const closeBtn = document.getElementById('closeDelCatBtn');
    if (closeBtn) closeBtn.click();

    await fetchData();
  } catch (error) {
    console.error("Lỗi xóa:", error);
    toast.error("Xóa thất bại!");
  }
};

const filteredCategories = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return list.value.filter(cat =>
    cat.categoryName.toLowerCase().includes(query) ||
    (cat.description && cat.description.toLowerCase().includes(query))
  );
});

onMounted(() => {
  fetchData();
});
</script>