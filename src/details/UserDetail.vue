<template>
    <div>
        <router-link to="/admin/users" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
            <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
        </router-link>

        <h3 class="fw-bold mb-4">Chi tiết khách hàng: <span class="text-primary">#{{ user.id }}</span></h3>

        <div class="row">
            <div class="col-md-8">
                <div class="card border-0 rounded-4 shadow-sm p-4 mb-4">
                    <h5 class="fw-bold mb-3">Thông tin cá nhân</h5>
                    <div class="row g-3">
                        <div class="col-md-12">
                            <label class="form-label fw-bold small text-muted ">Họ và tên khách hàng</label>
                            <input v-model="user.name" type="text" class="form-control bg-light border-0 py-2">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted">Email</label>
                            <input v-model="user.email" type="email" class="form-control bg-light border-0 py-2">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted">Số điện thoại</label>
                            <input v-model="user.phone" type="text" class="form-control bg-light border-0 py-2">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted">Ngày sinh</label>
                            <input v-model="user.birthday" type="date" class="form-control bg-light border-0 py-2">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted">Giới tính</label>
                            <select v-model="user.gender" class="form-select bg-light border-0 py-2">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label fw-bold small text-muted">Trạng thái tài khoản</label>
                            <select v-model="user.status" class="form-select bg-light border-0 py-2">
                                <option value="Hoạt động">Hoạt động</option>
                                <option value="Bị khóa">Bị khóa (Tạm dừng)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="card border-0 rounded-4 shadow-sm p-4">
                    <h5 class="fw-bold mb-3 text-uppercase">Địa chỉ giao hàng</h5>
                    <div class="row g-3">
                        <div class="col-md-12">
                            <textarea v-model="user.address" class="form-control bg-light border-0" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card border-0 rounded-4 shadow-sm p-4 text-center mb-4">
                    <label class="form-label fw-bold d-block text-start small text-muted text-uppercase">Ảnh đại
                        diện</label>
                    <div @click="triggerUpload"
                        class="d-flex flex-column align-items-center justify-content-center py-4 border border-2 border-dashed rounded-4 bg-light mt-2"
                        style="cursor: pointer; min-height: 180px;">
                        <div class="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mb-3"
                            style="width: 120px; height: 120px; overflow: hidden; border: 2px solid #ddd;">
                            <img :src="user.avatar" class="w-100 h-100 object-fit-cover">
                        </div>
                        <span class="fw-bold text-primary small">Bấm để đổi ảnh</span>
                        <input type="file" ref="fileInput" class="d-none" @change="handleFileUpload" accept="image/*">
                    </div>
                    <small class="text-muted d-block mt-3 italic">Ngày tham gia: <strong>{{ user.joinDate
                    }}</strong></small>
                </div>

                <div class="d-grid gap-2">
                    <button @click="updateUser" class="btn btn-primary text-white fw-bold py-2 rounded-3 shadow-sm">Cập
                        nhật thông tin</button>
                    <button class="btn btn-outline-danger py-2 rounded-3 fw-bold border-0" data-bs-toggle="modal"
                        data-bs-target="#confirmDeleteUser">Xóa khách hàng</button>
                    <hr>
                    <router-link to="/admin/users"
                        class="btn btn-light py-2 rounded-3 fw-bold text-decoration-none text-center">Hủy
                        bỏ</router-link>
                </div>
            </div>
        </div>

        <div class="modal fade" id="confirmDeleteUser" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow">
                    <div class="modal-body text-center p-4">
                        <span class="material-symbols-outlined text-danger mb-3"
                            style="font-size: 4rem;">person_remove</span>
                        <h4 class="fw-bold">Bạn chắc chắn muốn xóa?</h4>
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
    name: "UserDetail",
    setup() {
        const toast = useToast();
        return { toast };
    },
    data() {
        return {
            user: {
                id: "",
                name: "",
                email: "",
                phone: "",
                birthday: "",
                gender: "",
                status: "ACTIVE", // Mặc định dùng Enum để khớp Database
                address: "",
                avatar: "",
                joinDate: ""
            }
        };
    },
    mounted() {
        const userId = this.$route.params.id;
        // Gọi đúng tên hàm fetchData bên dưới
        this.fetchData(userId);
    },
    methods: {
        async fetchData(id) {
            try {
                const res = await api.get(`/api/v1/accounts/${id}`);
                const data = res.data.result || res.data;

                this.user = {
                    id: data.accountId,
                    name: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    status: data.status,
                    birthday: data.birthday || "",
                    gender: data.gender || "Nam",
                    address: data.address || "",
                    avatar: data.avatar || `https://ui-avatars.com/api/?name=${data.fullName}`,
                    joinDate: data.createdAt ? new Date(data.createdAt).toLocaleDateString('vi-VN') : "Chưa có"
                };
            } catch (error) {
                console.error("Lỗi API:", error);
                this.toast.error("Không thể lấy thông tin khách hàng từ hệ thống!");
            }
        },
        triggerUpload() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.user.avatar = URL.createObjectURL(file);
            }
        },
        async updateUser() {
            if (!this.user.name || !this.user.phone) {
                this.toast.error("Vui lòng không để trống tên và số điện thoại!");
                return;
            }
            try {
                const payload = {
                    fullName: this.user.name,
                    phone: this.user.phone,
                    status: this.user.status,
                    birthday: this.user.birthday,
                    gender: this.user.gender
                };
                await api.put(`/api/v1/accounts/${this.user.id}`, payload);
                this.toast.success(`Cập nhật thành công khách hàng "${this.user.name}"`);
                this.$router.push('/admin/users');
            } catch (error) {
                this.toast.error("Cập nhật thất bại, vui lòng thử lại!");
            }
        },
        async confirmDelete() {
            try {
                await api.delete(`/api/v1/accounts/${this.user.id}`);
                // Đóng modal bằng cách giả lập click nút Hủy
                const closeBtn = document.getElementById('closeDelUserBtn');
                if (closeBtn) closeBtn.click();

                this.toast.success("Đã xóa khách hàng thành công!");
                this.$router.push('/admin/users');
            } catch (error) {
                this.toast.error("Xóa thất bại!");
            }
        }
    }
}
</script>

<style scoped>
.border-dashed {
    border-style: dashed !important;
}
</style>