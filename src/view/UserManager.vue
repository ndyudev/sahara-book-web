<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold mb-0">Quản lý khách hàng</h3>
            <router-link to="/admin/users/create"
                class="btn btn-primary text-white fw-bold d-flex align-items-center gap-2 px-4 py-2 rounded-3 shadow-sm text-decoration-none">
                <span class="material-symbols-outlined fs-5">person_add</span> Thêm mới
            </router-link>
        </div>

        <div class="card border-0 rounded-4 shadow-sm">
            <div class="card-body p-4 border-bottom">
                <div class="input-group" style="max-width: 350px;">
                    <span class="input-group-text bg-light border-0">
                        <span class="material-symbols-outlined text-muted fs-5">search</span>
                    </span>
                    <input v-model="searchQuery" type="text" class="form-control bg-light border-0 ps-0"
                        placeholder="Tìm kiếm khách hàng....">
                </div>
            </div>

            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light text-muted small text-uppercase">
                            <tr>
                                <th class="ps-4 py-3">ID</th>
                                <th>Khách hàng</th>
                                <th>Liên hệ</th>
                                <th>Ngày tham gia</th>
                                <th>Trạng thái</th>
                                <th class="text-end pe-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in filteredUsers" :key="user.accountId">
                                <td class="ps-4 fw-bold text-muted">#{{ user.accountId.substring(0, 8) }}...</td>
                                <td>
                                    <div class="d-flex align-items-center gap-3">
                                        <img :src="'https://ui-avatars.com/api/?name=' + user.fullName" alt="User"
                                            class="rounded-circle"
                                            style="width: 40px; height: 40px; object-fit: cover; background: #eee;">
                                        <div class="fw-bold text-dark">{{ user.fullName }}</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="small">{{ user.email }}</div>
                                    <div class="text-muted small">{{ user.phone || 'Chưa có SĐT' }}</div>
                                </td>
                                <td class="text-muted small">{{ formatDate(user.createdAt) }}</td>
                                <td>
                                    <span class="badge rounded-pill px-3 py-2 fw-semibold"
                                        :class="user.status === 'ACTIVE' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'">
                                        {{ user.status === 'ACTIVE' ? 'Hoạt động' : 'Bị khóa' }}
                                    </span>
                                </td>
                                <td class="text-end pe-4">
                                    <router-link :to="'/admin/users/' + user.accountId"
                                        class="btn btn-sm btn-light text-primary rounded-circle p-2"
                                        title="Xem chi tiết">
                                        <span class="material-symbols-outlined fs-6 d-block">visibility</span>
                                    </router-link>

                                    <button @click="openDeleteModal(user)"
                                        class="btn btn-sm btn-light text-danger rounded-circle p-2 ms-2"
                                        data-bs-toggle="modal" data-bs-target="#deleteUserModal" title="Xóa khách hàng">
                                        <span class="material-symbols-outlined fs-6 d-block">delete</span>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="filteredUsers.length === 0">
                                <td colspan="6" class="text-center py-5 text-muted">Không tìm thấy khách hàng nào.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow">
                    <div class="modal-body text-center p-4">
                        <span class="material-symbols-outlined text-danger mb-3"
                            style="font-size: 4rem;">person_remove</span>
                        <p class="text-muted">Bạn có chắc chắn muốn xóa khách hàng <b>{{ deleteTarget.name }}</b>?</p>
                        <div class="d-flex gap-2 justify-content-center mt-4">
                            <button type="button" class="btn btn-light px-4 fw-bold" data-bs-dismiss="modal"
                                id="closeDelUserBtn">Hủy</button>
                            <button type="button" class="btn btn-danger px-4 fw-bold"
                                @click="confirmDelete">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import api from '../api/api';

export default {
    name: "UserManager",
    setup() {
        const toast = useToast();
        return { toast };
    },
    data() {
        return {
            searchQuery: "",
            users: [],
            deleteTarget: { id: null, name: '' }
        };
    },

    mounted() {
        this.loadUsers();
    },

    computed: {
        filteredUsers() {
            if (!this.users) return [];
            const query = this.searchQuery.toLowerCase();
            return this.users.filter(user => {
                return (
                    (user.fullName && user.fullName.toLowerCase().includes(query)) ||
                    (user.email && user.email.toLowerCase().includes(query)) ||
                    (user.phone && user.phone.includes(query))
                );
            });
        }
    },

    methods: {
        async loadUsers() {
            try {

                const res = await api.get("/api/v1/accounts");

                if (Array.isArray(res.data)) {
                    this.users = res.data;
                } else if (res.data && res.data.result) {
                    this.users = res.data.result;
                }
            } catch (error) {
                console.error("Lỗi tải người dùng:", error);
                this.toast.error("Không thể tải danh sách khách hàng!");
            }
        },

        openDeleteModal(user) {
            this.deleteTarget = { id: user.accountId, name: user.fullName };
        },

        async confirmDelete() {
            try {
                await api.delete(`/api/v1/accounts/${this.deleteTarget.id}`);
                this.toast.success(`Đã xóa khách hàng "${this.deleteTarget.name}" thành công!`);
                document.getElementById('closeDelUserBtn').click();
                await this.loadUsers();
            } catch (error) {
                this.toast.error("Xóa khách hàng thất bại!");
            }
        },

        formatDate(dateStr) {
            if (!dateStr) return "";
            return new Date(dateStr).toLocaleDateString('vi-VN');
        }
    }
};
</script>