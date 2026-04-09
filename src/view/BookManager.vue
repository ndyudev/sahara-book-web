<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold mb-0">Quản lý sách</h3>
            <router-link to="/admin/books/create"
                class="btn btn-primary text-white fw-bold d-flex align-items-center gap-2 px-4 py-2 rounded-3 text-decoration-none shadow-sm">
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
                        placeholder="Tìm tên sách, tác giả...">
                </div>

                <select v-model="selectedCategory" class="form-select w-auto bg-light border-0 text-muted">
                    <option value="">Tất cả danh mục</option>
                    <option v-for="cat in categoriesList" :key="cat.categoryId" :value="cat.categoryName">
                        {{ cat.categoryName }}
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
                            <tr v-for="book in filteredBooks" :key="book.bookId">
                                <td class="ps-4 fw-bold text-muted">#{{ book.bookId }}</td>
                                <td>
                                    <img :src="book.imageUrl || 'https://via.placeholder.com/150'" alt="Book Cover" class="rounded shadow-sm"
                                        style="width: 48px; height: 64px; object-fit: cover; background: #eee;">
                                </td>
                                <td>
                                    <div class="fw-bold text-dark">
                                        {{ book.title }}
                                        <span v-if="book.isSale" class="badge bg-danger ms-1" style="font-size: 0.65rem;">SALE</span>
                                    </div>
                                    <small class="text-muted">{{ book.category ? book.category.categoryName : 'Chưa phân loại' }}</small>
                                </td>
                                <td>{{ book.author || 'N/A' }}</td>
                                <td>
                                    <div v-if="book.isSale">
                                        <span class="fw-bold text-danger">{{ formatPrice(book.discountPrice) }}</span><br>
                                        <small class="text-muted text-decoration-line-through">{{ formatPrice(book.price) }}</small>
                                    </div>
                                    <div v-else class="fw-bold">{{ formatPrice(book.price) }}</div>
                                </td>
                                <td>
                                    <span class="badge"
                                        :class="book.stockQuantity > 0 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'">
                                        {{ book.stockQuantity > 0 ? 'Còn ' + book.stockQuantity : 'Hết hàng' }}
                                    </span>
                                </td>
                                <td class="text-end pe-4">
                                    <button @click="openSaleModal(book)" class="btn btn-sm btn-light text-warning rounded-circle p-2 me-2" 
                                            data-bs-toggle="modal" data-bs-target="#saleModal" title="Cài đặt Giảm giá">
                                        <span class="material-symbols-outlined fs-6 d-block">campaign</span>
                                    </button>

                                    <router-link :to="'/admin/books/' + book.bookId"
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
                            <tr v-if="filteredBooks.length === 0">
                                <td colspan="7" class="text-center py-5 text-muted">Không tìm thấy sách nào.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow">
                    <div class="modal-body text-center p-4">
                        <span class="material-symbols-outlined text-danger mb-3" style="font-size: 4rem;">error</span>
                        <h4 class="fw-bold">Bạn chắc chắn muốn xóa?</h4>
                        <p class="text-muted">Cuốn sách <b>{{ deleteTarget.title }}</b> sẽ bị xóa khỏi hệ thống.</p>
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

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import api from '../api/api'; 

const toast = useToast();
const searchQuery = ref("");
const selectedCategory = ref("");
const categoriesList = ref([]);
const books = ref([]);

const saleForm = ref({
    bookId: null, bookName: '', discountPrice: '', startDate: '', endDate: '', isSale: false
});

const deleteTarget = ref({ id: null, title: '' });


const loadBooks = async () => {
    try {
        const res = await api.get("/api/v1/books");

        books.value = res.data.result;
    } catch (error) {
        console.error("Lỗi fetch sách:", error);
        toast.error("Lỗi kết nối server khi tải danh sách sách!");
    }
};

const loadCategories = async () => {
    try {
        const res = await api.get("/api/v1/categories");
        categoriesList.value = res.data.result;
    } catch (error) {
        console.error("Lỗi fetch danh mục:", error);
    }
};


const executeDelete = async () => {
    try {
        await api.delete(`/api/v1/books/${deleteTarget.value.id}`);
        toast.success(`Đã xóa xong sách: ${deleteTarget.value.title}`);
        document.getElementById('closeDeleteBtn').click();
        await loadBooks(); 
    } catch (error) {
        console.error("Lỗi xóa:", error);
        toast.error("Xóa thất bại!");
    }
};

const openDeleteModal = (book) => {
    deleteTarget.value = { id: book.bookId, title: book.title };
};

const formatPrice = (price) => {
    if (!price) return "0đ";
    return price.toLocaleString('vi-VN') + 'đ';
};

const filteredBooks = computed(() => {
    const query = searchQuery.value.toLowerCase();
    const category = selectedCategory.value;
    return books.value.filter(book => {
        const matchesSearch = (book.title && book.title.toLowerCase().includes(query)) || 
                             (book.author && book.author.toLowerCase().includes(query));
        
        const bookCatName = book.category ? book.category.categoryName : "";
        const matchesCategory = category === "" || bookCatName === category;
        
        return matchesSearch && matchesCategory;
    });
});

onMounted(() => {
    loadBooks();
    loadCategories();
});
</script>