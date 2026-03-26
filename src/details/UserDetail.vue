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
                            <label class="form-label fw-bold small text-muted">Họ và tên khách hàng</label>
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
                    <h5 class="fw-bold mb-3">Địa chỉ giao hàng</h5>
                    <div class="row g-3">
                        <div class="col-md-12">
                            <label class="form-label fw-bold small text-muted">Địa chỉ chi tiết</label>
                            <textarea v-model="user.address" class="form-control bg-light border-0" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card border-0 rounded-4 shadow-sm p-4 text-center mb-4">
                    <label class="form-label fw-bold d-block text-start small text-muted">Ảnh đại diện</label>
                    <div @click="triggerUpload" class="d-flex flex-column align-items-center justify-content-center py-4 border border-2 border-dashed rounded-4 bg-light mt-2" style="cursor: pointer; min-height: 180px;">
                        <div class="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mb-3" style="width: 120px; height: 120px; overflow: hidden; border: 2px solid #ddd;">
                            <img :src="user.avatar" class="w-100 h-100 object-fit-cover">
                        </div>
                        <span class="fw-bold text-primary small">Bấm để đổi ảnh</span>
                        <input type="file" ref="fileInput" class="d-none" @change="handleFileUpload" accept="image/*">
                    </div>
                    <small class="text-muted d-block mt-3">Ngày tham gia: <strong>{{ user.joinDate }}</strong></small>
                </div>

                <div class="d-grid gap-2">
                    <button @click="updateUser" class="btn btn-primary text-white fw-bold py-2 rounded-3 shadow-sm">Cập nhật thông tin</button>
                    <button @click="deleteUser" class="btn btn-outline-danger py-2 rounded-3 fw-bold border-0">Xóa khách hàng</button>
                    <hr>
                    <router-link to="/admin/users" class="btn btn-light py-2 rounded-3 fw-bold">Hủy bỏ</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserDetail",
    data() {
        return {
            user: {
                id: "",
                name: "",
                email: "",
                phone: "",
                birthday: "",
                gender: "",
                status: "Hoạt động",
                address: "",
                avatar: "",
                joinDate: ""
            }
        };
    },
    mounted() {

        const userId = this.$route.params.id;
        this.fetchUser(userId);
    },
    methods: {
        fetchUser(id) {
            const list = JSON.parse(localStorage.getItem('users')) || [];
            const found = list.find(u => u.id === id);
            if (found) {
                this.user = { ...found }; 
            } else {
                alert("Không tìm thấy khách hàng này!");
                this.$router.push('/admin/users');
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
        updateUser() {
            let list = JSON.parse(localStorage.getItem('users')) || [];
            const index = list.findIndex(u => u.id === this.user.id);

            if (index !== -1) {
                list[index] = this.user; 
                localStorage.setItem('users', JSON.stringify(list));
                alert("Đã cập nhật thông tin khách hàng: " + this.user.name);
                this.$router.push('/admin/users');
            }
        },
        deleteUser() {
            if (confirm(`Bạn có chắc muốn xóa khách hànG không?`)) {
                let list = JSON.parse(localStorage.getItem('users')) || [];
                list = list.filter(u => u.id !== this.user.id);
                localStorage.setItem('users', JSON.stringify(list));
                alert("Đã xóa khách hàng thành công!");
                this.$router.push('/admin/users');
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