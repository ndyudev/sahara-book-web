<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold mb-0">Quản lý sách</h3>

            <router-link to="/admin/books/create"
                class="btn btn-primary text-white fw-bold d-flex align-items-center gap-2 px-4 py-2 rounded-3 text-decoration-none">
                <span class="material-symbols-outlined fs-5">add</span> Thêm sách mới
            </router-link>

        </div>

        <div class="card border-0 rounded-4 shadow-sm">

            <div class="card-body border-bottom p-4 d-flex gap-3">
                <div class="input-group" style="max-width: 300px;">
                    <span class="input-group-text bg-light border-end-0">
                        <span class="material-symbols-outlined text-muted fs-5">search</span>
                    </span>
                    <input v-model="searchQuery" type="text" class="form-control bg-light border-start-0 ps-0"
                        placeholder="Search...">
                </div>

                <select v-model="selectedCategory" class="form-select w-auto bg-light border-0 text-muted">
                    <option value="">Tất cả danh mục</option>
                    <option v-for="cat in categoriesList" :key="cat.name" :value="cat.name">
                        {{ cat.name }}
                    </option>
                </select>
            </div>

            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light text-muted small text-uppercase">
                            <tr>
                                <th class="ps-4 py-3" style="width: 80px;">ID</th>
                                <th style="width: 80px;">Ảnh</th>
                                <th>Tên sách</th>
                                <th>Tác giả</th>
                                <th>Giá bán</th>
                                <th>Kho</th>
                                <th class="text-end pe-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="book in filteredBooks" :key="book.id">
                                <td class="ps-4 fw-bold text-muted">#{{ book.id }}</td>
                                <td>
                                    <img :src="book.image" alt="Book Cover" class="rounded shadow-sm"
                                        style="width: 48px; height: 64px; object-fit: cover;">
                                </td>
                                <td>
                                    <div class="fw-bold text-dark">{{ book.title }}</div>
                                    <small class="text-muted">{{ book.category }}</small>
                                </td>
                                <td>{{ book.author }}</td>
                                <td class="fw-bold">{{ book.price }}</td>
                                <td>
                                    <span class="badge"
                                        :class="book.stock > 0 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'">
                                        {{ book.stock > 0 ? 'Còn ' + book.stock : 'Hết hàng' }}
                                    </span>
                                </td>
                                <td class="text-end pe-4">
                                    <router-link :to="'/admin/books/' + book.id"
                                        class="btn btn-sm btn-light text-primary me-2 rounded-circle p-2" title="Sửa">
                                        <span class="material-symbols-outlined fs-6 d-block">edit</span>
                                    </router-link>

                                    <button @click="deleteBook(book.id, book.title)"
                                        class="btn btn-sm btn-light text-danger rounded-circle p-2" title="Xóa">
                                        <span class="material-symbols-outlined fs-6 d-block">delete</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    name: "BookManager",
    data() {
        return {
            searchQuery: "",
            selectedCategory: "", 
            categoriesList: [
                { name: "Văn học" },
                { name: "Kinh tế" },
                { name: "Tâm lý học" },
                { name: "Khoa học" },
                { name: "Thiếu nhi" }
            ],
            books: []
        };
    },
    mounted() {
        this.loadBooks();
    },
    computed: {
        filteredBooks() {
            const query = this.searchQuery.toLowerCase();
            const category = this.selectedCategory;

            return this.books.filter(book => {

                const matchesSearch = book.title.toLowerCase().includes(query) ||
                                      book.author.toLowerCase().includes(query);

 
                const matchesCategory = category === "" || book.category === category;

                return matchesSearch && matchesCategory;
            });
        }
    },
    methods: {
        loadBooks() {
            const savedBooks = localStorage.getItem('books');
            if (savedBooks) {
                this.books = JSON.parse(savedBooks);
            } else {
                const defaultData = [
                    { id: 101, image: "https://via.placeholder.com/150", title: "Đắc Nhân Tâm", category: "Tâm lý học", author: "Dale Carnegie", price: "86.000đ", stock: 45 },
                    { id: 102, image: "https://via.placeholder.com/150", title: "Nhà Lãnh Đạo Không Chức Danh", category: "Kinh tế", author: "Robin Sharma", price: "110.000đ", stock: 12 },
                    { id: 103, image: "https://via.placeholder.com/150", title: "Sapiens - Lược Sử Loài Người", category: "Khoa học", author: "Yuval Noah Harari", price: "255.000đ", stock: 0 },
                    { id: 104, image: "https://via.placeholder.com/150", title: "Số Đỏ", category: "Văn học", author: "Vũ Trọng Phụng", price: "55.000đ", stock: 20 },
                    { id: 105, image: "https://via.placeholder.com/150", title: "Cha Giàu Cha Nghèo", category: "Kinh tế", author: "Robert Kiyosaki", price: "125.000đ", stock: 15 },
                    { id: 106, image: "https://via.placeholder.com/150", title: "Cho Tôi Xin Một Vé Đi Tuổi Thơ", category: "Văn học", author: "Nguyễn Nhật Ánh", price: "65.000đ", stock: 30 },
                    { id: 107, image: "https://via.placeholder.com/150", title: "Doraemon - Tập 1", category: "Thiếu nhi", author: "Fujiko F. Fujio", price: "20.000đ", stock: 100 },
                    { id: 108, image: "https://via.placeholder.com/150", title: "Vũ Trụ", category: "Khoa học", author: "Carl Sagan", price: "350.000đ", stock: 5 }
                ];
                this.books = defaultData;
                localStorage.setItem('books', JSON.stringify(defaultData));
            }
        },
        deleteBook(id, title) {
            if (confirm(`Bạn có muốn xóa sách này không?`)) {

                this.books = this.books.filter(b => b.id !== id);

                localStorage.setItem('books', JSON.stringify(this.books));
                alert("Đã xóa xong!");
            }
        }
    }
};
</script>

<style scoped>
.input-group-text,
.form-control,
.form-select {
    border-radius: 0.5rem;
}

.btn-light:hover {
    background-color: #e2e6ea;
}
</style>