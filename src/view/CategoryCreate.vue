
<template>
  <div>
    <router-link to="/admin/categories" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
    </router-link>

    <h3 class="fw-bold mb-4">Thêm danh mục mới</h3>

    <div class="card border-0 rounded-4 shadow-sm p-4" style="max-width: 600px;">
      <div class="mb-3">
        <label class="form-label fw-bold small text-muted">Tên danh mục</label>
        <input v-model="newCategory.name" type="text" class="form-control bg-light border-0 py-2" >
      </div>
      
      <div class="mb-4">
        <label class="form-label fw-bold small text-muted">Mô tả danh mục</label>
        <textarea v-model="newCategory.description" class="form-control bg-light border-0" rows="3" ></textarea>
      </div>

      <div class="d-flex gap-2">
        <button @click="saveCategory" class="btn btn-primary text-white fw-bold px-4 py-2 rounded-3 shadow-sm">Lưu danh mục</button>
        <router-link to="/admin/categories" class="btn btn-light px-4 py-2 rounded-3 fw-bold">Hủy bỏ</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryCreate",
  data() {
    return {
      newCategory: {
        name: "",
        description: ""
      }
    };
  },
  methods: {
saveCategory() {
  if (!this.newCategory.name) {
    alert("Hãy nhập tên danh mục!");
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
    description: this.newCategory.description || "Chưa có mô tả"
  };


  list.unshift(newCatObj);
  localStorage.setItem('categories', JSON.stringify(list));

  alert("Đã thêm danh mục số #" + nextId + " thành công!");
  this.$router.push('/admin/categories');
}
  }
};
</script>