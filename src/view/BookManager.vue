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
                                    <div class="fw-bold text-dark">
                                        {{ book.title }}
                                        <span v-if="book.isSale" class="badge bg-danger ms-1" style="font-size: 0.65rem;">SALE</span>
                                    </div>
                                    <small class="text-muted">{{ book.category }}</small>
                                </td>
                                <td>{{ book.author }}</td>
                                <td>
                                    <div v-if="book.isSale">
                                        <span class="fw-bold text-danger">{{ book.discountPrice }}</span><br>
                                        <small class="text-muted text-decoration-line-through">{{ book.price }}</small>
                                    </div>
                                    <div v-else class="fw-bold">{{ book.price }}</div>
                                </td>
                                <td>
                                    <span class="badge"
                                        :class="book.stock > 0 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'">
                                        {{ book.stock > 0 ? 'Còn ' + book.stock : 'Hết hàng' }}
                                    </span>
                                </td>
                                <td class="text-end pe-4">
                                    <button @click="openSaleModal(book)" class="btn btn-sm btn-light text-warning rounded-circle p-2 me-2" 
                                            data-bs-toggle="modal" data-bs-target="#saleModal" title="Cài đặt Giảm giá">
                                        <span class="material-symbols-outlined fs-6 d-block">campaign</span>
                                    </button>

                                    <router-link :to="'/admin/books/' + book.id"
                                        class="btn btn-sm btn-light text-primary me-2 rounded-circle p-2" title="Sửa">
                                        <span class="material-symbols-outlined fs-6 d-block">edit</span>
                                    </router-link>

                                    <button @click="openDeleteModal(book)"
                                        class="btn btn-sm btn-light text-danger rounded-circle p-2" 
                                        data-bs-toggle="modal" data-bs-target="#deleteConfirmModal" title="Xóa">
                                        <span class="material-symbols-outlined fs-6 d-block">delete</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="modal fade" id="saleModal" tabindex="-1" aria-labelledby="saleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content border-0 shadow">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title fw-bold" id="saleModalLabel">Cài đặt Giảm giá (Flash Sale)</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalBtn"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label fw-bold small text-uppercase text-muted">Tên sách</label>
                            <input type="text" class="form-control bg-light border-0" :value="saleForm.bookName" disabled>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold small text-uppercase text-muted">Giá khuyến mãi mới</label>
                            <input type="text" class="form-control border-primary-subtle" v-model="saleForm.discountPrice" placeholder="VD: 50.000đ">
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold small text-uppercase text-muted">Thời gian bắt đầu</label>
                                <input type="datetime-local" class="form-control" v-model="saleForm.startDate">
                                <div class="mt-1 px-1" v-if="saleForm.startDate">
                                    <small class="text-primary fw-medium">Xem lại: {{ formatTimeVN(saleForm.startDate) }}</small>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold small text-uppercase text-muted">Thời gian kết thúc</label>
                                <input type="datetime-local" class="form-control" v-model="saleForm.endDate">
                                <div class="mt-1 px-1" v-if="saleForm.endDate">
                                    <small class="text-primary fw-medium">Xem lại: {{ formatTimeVN(saleForm.endDate) }}</small>
                                </div>
                            </div>
                        </div>
                        <div class="alert alert-info py-2 mb-0 mt-2" style="font-size: 0.85rem;">
                            <span class="material-symbols-outlined fs-6 align-middle">info</span> 
                            Lưu ý: <strong>SA</strong> là Sáng, <strong>CH</strong> là Chiều.
                        </div>
                    </div>
                    <div class="modal-footer bg-light border-0">
                        <button v-if="saleForm.isSale" type="button" class="btn btn-outline-danger border-0 me-auto fw-bold" @click="cancelSale">Hủy Sale</button>
                        <button type="button" class="btn btn-secondary px-4" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-primary px-4 fw-bold" @click="saveSaleConfig">Lưu thiết lập</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow">
                    <div class="modal-body text-center p-4">
                        <span class="material-symbols-outlined text-danger mb-3" style="font-size: 4rem;">error</span>
                        <h4 class="fw-bold">Bạn chắc chắn muốn xóa?</h4>
                        <div class="d-flex gap-2 justify-content-center mt-4">
                            <button type="button" class="btn btn-light px-4 fw-bold" data-bs-dismiss="modal" id="closeDeleteBtn">Hủy</button>
                            <button type="button" class="btn btn-danger px-4 fw-bold" @click="executeDelete">Xóa</button>
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
    name: "BookManager",
    setup() {
        const toast = useToast();
        return { toast };
    },
    data() {
        return {
            searchQuery: "",
            selectedCategory: "",
            categoriesList: [
                { name: "Văn học" }, { name: "Kinh tế" }, { name: "Tâm lý học" }, { name: "Khoa học" }, { name: "Thiếu nhi" }
            ],
            books: [],
            saleForm: {
                bookId: null, bookName: '', discountPrice: '', startDate: '', endDate: '', isSale: false
            },

            deleteTarget: { id: null, title: '' }
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
                const matchesSearch = book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
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

        openDeleteModal(book) {
            this.deleteTarget.id = book.id;
            this.deleteTarget.title = book.title;
        },

        executeDelete() {
            this.books = this.books.filter(b => b.id !== this.deleteTarget.id);
            localStorage.setItem('books', JSON.stringify(this.books));

            this.toast.success(`Đã xóa xong sách: ${this.deleteTarget.title}`);
            
            document.getElementById('closeDeleteBtn').click();
        },
        formatTimeVN(dateStr) {
            if (!dateStr) return "";
            const date = new Date(dateStr);
            return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false }) + ' ngày ' + date.toLocaleDateString('vi-VN');
        },
        openSaleModal(book) {
            this.saleForm.bookId = book.id;
            this.saleForm.bookName = book.title;
            this.saleForm.isSale = book.isSale || false;
            this.saleForm.discountPrice = book.discountPrice || '';
            this.saleForm.startDate = book.startDate || '';
            this.saleForm.endDate = book.endDate || '';
        },
        saveSaleConfig() {
            if (!this.saleForm.discountPrice || !this.saleForm.startDate || !this.saleForm.endDate) {
                this.toast.error("Vui lòng điền đầy đủ thông tin giảm giá!");
                return;
            }
            if (new Date(this.saleForm.startDate) >= new Date(this.saleForm.endDate)) {
                this.toast.error("Thời gian kết thúc phải sau thời gian bắt đầu!");
                return;
            }
            const index = this.books.findIndex(b => b.id === this.saleForm.bookId);
            if (index !== -1) {
                this.books[index].isSale = true;
                this.books[index].discountPrice = this.saleForm.discountPrice;
                this.books[index].startDate = this.saleForm.startDate;
                this.books[index].endDate = this.saleForm.endDate;
                localStorage.setItem('books', JSON.stringify(this.books));
                this.toast.success(`Đã thiết lập giảm giá thành công cho sách: ${this.saleForm.bookName}`);
                document.getElementById('closeModalBtn').click();
            }
        },
        cancelSale() {
            const index = this.books.findIndex(b => b.id === this.saleForm.bookId);
            if (index !== -1) {
                this.books[index].isSale = false;
                this.books[index].discountPrice = null;
                this.books[index].startDate = null;
                this.books[index].endDate = null;
                localStorage.setItem('books', JSON.stringify(this.books));
                this.toast.success("Đã hủy Sale thành công!");
                document.getElementById('closeModalBtn').click();
            }
        }
    }
};
</script>

<style scoped>
.input-group-text, .form-control, .form-select { border-radius: 0.5rem; }
.btn-light:hover { background-color: #e2e6ea; }
</style>