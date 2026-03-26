
<template>
  <div>
    <router-link to="/admin/authors" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
    </router-link>

    <h3 class="fw-bold mb-4">Chi tiết tác giả: <span class="text-primary">#{{ author.id }}</span></h3>

    <div class="row">
      <div class="col-md-8">
        <div class="card border-0 rounded-4 shadow-sm p-4">
          <h5 class="fw-bold mb-3">Thông tin cơ bản</h5>
          <div class="row g-3">
            <div class="col-md-12">
              <label class="form-label fw-bold small text-muted">Họ và tên tác giả</label>
              <input v-model="author.name" type="text" class="form-control bg-light border-0 py-2">
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold small text-muted">Quốc tịch</label>
              <input v-model="author.nationality" type="text" class="form-control bg-light border-0 py-2">
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold small text-muted">Số lượng sách (Hệ thống tự đếm)</label>
              <input :value="author.bookCount" type="text" class="form-control bg-light border-0 py-2" disabled>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card border-0 rounded-4 shadow-sm p-4 text-center mb-4">
          <label class="form-label fw-bold d-block text-start small text-muted">Ảnh đại diện</label>
          <div @click="triggerUpload" class="d-flex flex-column align-items-center justify-content-center py-4 border border-2 border-dashed rounded-4 bg-light mt-2" style="cursor: pointer;">
            <div class="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mb-3" style="width: 120px; height: 120px; overflow: hidden; border: 2px solid #eee;">
              <img :src="author.image" class="w-100 h-100 object-fit-cover">
            </div>
            <small class="text-primary fw-bold">Bấm để đổi ảnh</small>
            <input type="file" ref="fileInput" class="d-none" @change="onFileChange" accept="image/*">
          </div>
        </div>

        <div class="d-grid gap-2">
          <button @click="updateAuthor" class="btn btn-primary text-white fw-bold py-2 rounded-3 shadow-sm">
            Cập nhật thông tin
          </button>
          <button @click="deleteAuthor" class="btn btn-outline-danger py-2 rounded-3 fw-bold border-0">
            Xóa tác giả này
          </button>
          <hr class="my-1">
          <router-link to="/admin/authors" class="btn btn-light py-2 rounded-3 fw-bold">Hủy bỏ</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthorDetail",
  data() {
    return {
      author: {
        id: "",
        name: "",
        nationality: "",
        bookCount: 0,
        image: ""
      }
    }
  },
  mounted() {

    const authorId = this.$route.params.id;
    this.fetchAuthor(authorId);
  },
  methods: {
    fetchAuthor(id) {

      const list = JSON.parse(localStorage.getItem('authors')) || [];
      const found = list.find(a => a.id === id);
      
      if (found) {
        this.author = { ...found }; 
      } else {
        alert("Không tìm thấy tên tác giả!");
        this.$router.push('/admin/authors');
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.author.image = URL.createObjectURL(file);
      }
    },
    updateAuthor() {
      if (!this.author.name || !this.author.nationality) {
        alert("Hãy nhập đầy đủ thông tin!");
        return;
      }

      let list = JSON.parse(localStorage.getItem('authors')) || [];
      const index = list.findIndex(a => a.id === this.author.id);

      if (index !== -1) {
        list[index] = this.author; 
        localStorage.setItem('authors', JSON.stringify(list));
        alert("Đã cập nhật tác giả: " + this.author.name);
        this.$router.push('/admin/authors');
      }
    },
    deleteAuthor() {
      if (confirm(`Bạn có muốn xóa tác giả này không ?`)) {
        let list = JSON.parse(localStorage.getItem('authors')) || [];
        list = list.filter(a => a.id !== this.author.id);
        localStorage.setItem('authors', JSON.stringify(list));
        
        alert("Đã xóa tác giả thành công!");
        this.$router.push('/admin/authors');
      }
    }
  }
}
</script>

<style scoped>
.border-dashed {
  border-style: dashed !important;
}
.form-control:focus {
  background-color: #fff !important;
  box-shadow: 0 0 0 0.25rem rgba(255, 178, 122, 0.25);
  border: 1px solid #ffb27a !important;
}
</style>