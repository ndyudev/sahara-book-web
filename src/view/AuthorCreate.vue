
<template>
  <div>
    <router-link to="/admin/authors" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
    </router-link>

    <h3 class="fw-bold mb-4">Thêm tác giả mới</h3>

    <div class="row">
      <div class="col-md-8">
        <div class="card border-0 rounded-4 shadow-sm p-4">
          <div class="row g-3">
            <div class="col-md-12">
              <label class="form-label fw-bold small text-muted">Họ và tên tác giả</label>
              <input v-model="newAuthor.name" type="text" class="form-control bg-light border-0 py-2" >
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold small text-muted">Quốc tịch</label>
              <input v-model="newAuthor.nationality" type="text" class="form-control bg-light border-0 py-2">
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card border-0 rounded-4 shadow-sm p-4 text-center mb-4">
          <label class="form-label fw-bold d-block text-start small text-muted">Ảnh đại diện</label>
          <div @click="triggerUpload" class="d-flex flex-column align-items-center justify-content-center py-4 border border-2 border-dashed rounded-4 bg-light mt-2" style="cursor: pointer;">
            <div class="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mb-3" style="width: 100px; height: 100px; overflow: hidden; border: 2px solid #eee;">
              <img v-if="newAuthor.imagePreview" :src="newAuthor.imagePreview" class="w-100 h-100 object-fit-cover">
              <span v-else class="material-symbols-outlined fs-1 text-muted">add_a_photo</span>
            </div>
            <small class="text-muted fw-bold">Tải ảnh lên</small>
            <input type="file" ref="fileInput" class="d-none" @change="onFileChange" accept="image/*">
          </div>
        </div>

        <div class="d-grid gap-2">
          <button @click="saveAuthor" class="btn btn-primary text-white fw-bold py-2 rounded-3 shadow-sm">Lưu thông tin</button>
          <router-link to="/admin/authors" class="btn btn-light py-2 rounded-3 fw-bold">Hủy bỏ</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthorCreate",
  data() {
    return {

      newAuthor: {
        name: "",
        nationality: "",
        imagePreview: null
      }
    }
  },
  methods: {
    triggerUpload() {
      this.$refs.fileInput.click();
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {

        this.newAuthor.imagePreview = URL.createObjectURL(file);
      }
    },

    saveAuthor() {
      if (!this.newAuthor.name || !this.newAuthor.nationality) {
        alert("Hay điền đầy đủ thông tin tác giả sếp ơi!");
        return;
      }

      let list = JSON.parse(localStorage.getItem('authors'));

      if (!list) {
        list = [
          { id: "A01", name: "Dale Carnegie", nationality: "Hoa Kỳ", bookCount: 15, image: "/authors/auth1.png" },
          { id: "A02", name: "Robin Sharma", nationality: "Canada", bookCount: 22, image: "/authors/auth2.png" },
          { id: "A03", name: "Nguyễn Nhật Ánh", nationality: "Việt Nam", bookCount: 50, image: "/authors/auth3.png" },
          { id: "A04", name: "Haruki Murakami", nationality: "Nhật Bản", bookCount: 18, image: "/authors/auth4.png" },
          { id: "A05", name: "J.K. Rowling", nationality: "Anh Quốc", bookCount: 12, image: "/authors/auth5.png" }
        ];
      }

      const newAuthorObj = {
        id: "A" + Math.floor(Math.random() * 1000), 
        name: this.newAuthor.name,
        nationality: this.newAuthor.nationality,
        bookCount: 0, 
        image: this.newAuthor.imagePreview || "https://via.placeholder.com/150" 
      };

      list.unshift(newAuthorObj);

      localStorage.setItem('authors', JSON.stringify(list));

      alert("Thêm tác giả " + this.newAuthor.name + " thành công!");
      
      this.$router.push('/admin/authors');
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