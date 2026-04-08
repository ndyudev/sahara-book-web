<template>
  <div>
    <router-link to="/admin/books" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
    </router-link>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold mb-0">Chi tiết sách: <span class="text-primary">#{{ book.id }}</span></h3>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4">
          <div class="row g-3">
            <div class="col-md-12">
              <label class="form-label fw-bold">Tên cuốn sách</label>
              <input v-model="book.title" type="text" class="form-control bg-light border-0 py-2">
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold">Tác giả</label>
              <input v-model="book.author" type="text" class="form-control bg-light border-0 py-2">
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold">Danh mục</label>
              <select v-model="book.category" class="form-select bg-light border-0 py-2">
                <option v-for="cat in categoriesList" :key="cat.id" :value="cat.name">
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div class="col-md-12">
              <label class="form-label fw-bold">Mô tả ngắn</label>
              <textarea v-model="book.description" class="form-control bg-light border-0" rows="5"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4 text-center">
          <label class="form-label fw-bold d-block text-start">Ảnh bìa sách</label>
          <div @click="triggerUpload" class="border border-2 border-dashed rounded-4 bg-light d-flex align-items-center justify-content-center overflow-hidden mt-2" 
               style="cursor: pointer; min-height: 250px;">
            <img :src="book.image" class="w-100 h-100 object-fit-cover">
            <input type="file" ref="fileInput" class="d-none" @change="handleFileUpload" accept="image/*">
          </div>
          <small class="text-primary fw-bold mt-2 d-block">Bấm để đổi ảnh bìa</small>
        </div>

        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4">
          <div class="mb-3">
            <label class="form-label fw-bold">Giá bán (Số nguyên)</label>
            <input v-model="displayPrice" type="number" class="form-control bg-light border-0 py-2">
            <small class="text-muted">Giá hiện tại: {{ book.price }}</small>
          </div>
          <div>
            <label class="form-label fw-bold">Số lượng tồn</label>
            <input v-model="book.stock" type="number" class="form-control bg-light border-0 py-2">
          </div>
        </div>

        <div class="d-grid gap-2">
          <button @click="updateBook" class="btn btn-primary text-white fw-bold py-3 rounded-3 shadow-sm">
            Cập nhật thông tin
          </button>
          <button @click="deleteBook" class="btn btn-outline-danger border-0 py-2">
            Xóa cuốn sách này
          </button>
          <hr>
          <button @click="$router.push('/admin/books')" class="btn btn-light py-2 rounded-3 fw-bold">Hủy bỏ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { useToast } from 'vue-toastification';

export default {
  name: "BookDetail",

  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      categoriesList: [],
      displayPrice: 0, 
      book: { id: "", title: "", author: "", category: "", description: "", price: "", stock: 0, image: "" }
    }
  },
  mounted() {
    const savedCats = localStorage.getItem('categories');
    this.categoriesList = savedCats ? JSON.parse(savedCats) : [
        { name: "Văn học" }, { name: "Kinh tế" }, { name: "Tâm lý học" }, { name: "Khoa học" }, { name: "Thiếu nhi" }
    ];

    const bookId = this.$route.params.id;
    this.fetchBook(bookId);
  },
  methods: {
    fetchBook(id) {
      const list = JSON.parse(localStorage.getItem('books')) || [];
      const found = list.find(b => String(b.id) === String(id));
      if (found) {
        this.book = { ...found };

        this.displayPrice = parseInt(this.book.price.replace(/\D/g, '')) || 0;
      } else {
     
        this.toast.error("Không tìm thấy sách này!");
        this.$router.push('/admin/books');
      }
    },
    triggerUpload() { this.$refs.fileInput.click(); },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) { 
          this.book.image = URL.createObjectURL(file); 
      }
    },
    updateBook() {

      if (!this.book.title || !this.displayPrice) {
        this.toast.error("Vui lòng nhập đầy đủ tên sách và giá bán!");
        return;
      }
      
      let list = JSON.parse(localStorage.getItem('books')) || [];
      const index = list.findIndex(b => String(b.id) === String(this.book.id));

      if (index !== -1) {

        this.book.price = new Intl.NumberFormat('vi-VN').format(this.displayPrice) + "đ";
        list[index] = this.book;
        localStorage.setItem('books', JSON.stringify(list));
        
        this.toast.success("Đã cập nhật thông tin sách thành công!");
        this.$router.push('/admin/books');
      }
    },
    deleteBook() {

      if (confirm(`Bạn có chắc muốn xóa cuốn sách này không?`)) {
        let list = JSON.parse(localStorage.getItem('books')) || [];
        list = list.filter(b => String(b.id) !== String(this.book.id));
        localStorage.setItem('books', JSON.stringify(list));

        this.toast.success("Đã xóa cuốn sách khỏi hệ thống!");
        this.$router.push('/admin/books');
      }
    }
  }
}
</script>

