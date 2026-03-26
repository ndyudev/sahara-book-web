
<template>
  <div>
    <router-link to="/admin/books" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
    </router-link>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold mb-0">Thêm sách mới</h3>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4">
          <div class="row g-3">
            <div class="col-md-12">
              <label class="form-label fw-bold">Tên cuốn sách</label>
              <input v-model="newBook.title" type="text" class="form-control bg-light border-0 py-2" placeholder="Nhập tên sách...">
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold">Tác giả</label>
              <input v-model="newBook.author" type="text" class="form-control bg-light border-0 py-2" placeholder="Tên tác giả">
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold">Danh mục</label>
              <select v-model="newBook.category" class="form-select bg-light border-0 py-2">
                <option value="">Chọn danh mục</option>
                <option v-for="cat in categoriesList" :key="cat.id" :value="cat.name">
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div class="col-md-12">
              <label class="form-label fw-bold">Mô tả ngắn</label>
              <textarea v-model="newBook.description" class="form-control bg-light border-0" rows="4" placeholder="Viết gì đó về cuốn sách này..."></textarea>
            </div>
          </div>
        </div>

        <div class="card border-0 rounded-4 shadow-sm p-4">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label fw-bold">Giá bán (VNĐ)</label>
              <input v-model="newBook.price" type="number" class="form-control bg-light border-0 py-2" placeholder="0">
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold">Số lượng trong kho</label>
              <input v-model="newBook.stock" type="number" class="form-control bg-light border-0 py-2" placeholder="0">
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4 text-center">
          <label class="form-label fw-bold d-block text-start">Ảnh bìa sách</label>
          <div @click="triggerUpload" class="border border-2 border-dashed rounded-4 bg-light d-flex flex-column align-items-center justify-content-center overflow-hidden" 
               style="cursor: pointer; min-height: 250px;">
            <template v-if="newBook.imagePreview">
                <img :src="newBook.imagePreview" class="w-100 h-100 object-fit-cover">
            </template>
            <template v-else>
                <span class="material-symbols-outlined fs-1 text-muted mb-2">add_a_photo</span>
                <small class="text-muted fw-bold">Bấm để tải ảnh lên</small>
            </template>
            <input type="file" ref="fileInput" class="d-none" @change="handleFileUpload" accept="image/*">
          </div>
        </div>

        <div class="d-grid gap-2">
          <button @click="saveBook" class="btn btn-primary text-white fw-bold py-3 rounded-3 shadow-sm">Lưu sách mới</button>
          <button @click="$router.push('/admin/books')" class="btn btn-outline-secondary border-0 py-2">Hủy bỏ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookCreate",
  data() {
    return {
      categoriesList: [], 
      newBook: {
        title: "",
        author: "",
        category: "",
        description: "",
        price: null,
        stock: null,
        imagePreview: null
      }
    }
  },
  mounted() {
    const savedCats = localStorage.getItem('categories');
    if (savedCats) {
      this.categoriesList = JSON.parse(savedCats);
    } else {

      this.categoriesList = [
        { name: "Văn học" }, { name: "Kinh tế" }, { name: "Tâm lý học" }, { name: "Khoa học" }
      ];
    }
  },
  methods: {
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.newBook.imagePreview = URL.createObjectURL(file);
      }
    },
    saveBook() {
      if (!this.newBook.title || !this.newBook.price || !this.newBook.category) {
        alert("Sếp vui lòng nhập tên sách, giá và chọn danh mục nhé!");
        return;
      }

      let list = JSON.parse(localStorage.getItem('books'));


      if (!list) {
        list = [
            { id: 101, image: "https://via.placeholder.com/150", title: "Đắc Nhân Tâm", category: "Tâm lý học", author: "Dale Carnegie", price: "86.000đ", stock: 45 },
            { id: 102, image: "https://via.placeholder.com/150", title: "Nhà Lãnh Đạo Không Chức Danh", category: "Kinh tế", author: "Robin Sharma", price: "110.000đ", stock: 12 },
            { id: 103, image: "https://via.placeholder.com/150", title: "Sapiens - Lược Sử Loài Người", category: "Khoa học", author: "Yuval Noah Harari", price: "255.000đ", stock: 0 },
            { id: 104, image: "https://via.placeholder.com/150", title: "Số Đỏ", category: "Văn học", author: "Vũ Trọng Phụng", price: "55.000đ", stock: 20 },
            { id: 105, image: "https://via.placeholder.com/150", title: "Cha Giàu Cha Nghèo", category: "Kinh tế", author: "Robert Kiyosaki", price: "125.000đ", stock: 15 },
            { id: 106, image: "https://via.placeholder.com/150", title: "Cho Tôi Xin Một Vé Đi Tuổi Thơ", category: "Văn học", author: "Nguyễn Nhật Ánh", price: "65.000đ", stock: 30 },
            { id: 107, image: "https://via.placeholder.com/150", title: "Doraemon - Tập 1", category: "Thiếu nhi", author: "Fujiko F. Fujio", price: "20.000đ", stock: 100 },
            { id: 108, image: "https://via.placeholder.com/150", title: "Vũ Trụ", category: "Khoa học", author: "Carl Sagan", price: "350.000đ", stock: 5 }
        ];
      }

      const ids = list.map(b => Number(b.id));
      const nextId = Math.max(...ids) + 1;

      const newBookObj = {
        id: nextId,
        title: this.newBook.title,
        author: this.newBook.author || "Khuyết danh",
        category: this.newBook.category,

        price: new Intl.NumberFormat('vi-VN').format(this.newBook.price) + "đ",
        stock: Number(this.newBook.stock) || 0,
        image: this.newBook.imagePreview || "https://via.placeholder.com/150"
      };

      list.unshift(newBookObj);
      localStorage.setItem('books', JSON.stringify(list));

      alert("Đã thêm cuốn sách: " + this.newBook.title);
      this.$router.push('/admin/books');
    }
  }
}
</script>

<style scoped>
.form-control:focus, .form-select:focus {
  background-color: #fff !important;
  box-shadow: 0 0 0 0.25rem rgba(255, 178, 122, 0.25);
  border: 1px solid #ffb27a !important;
}
.border-dashed {
  border-style: dashed !important;
}
</style>