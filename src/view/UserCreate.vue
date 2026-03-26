<template>
    <div>
        <router-link to="/admin/users" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3">
            <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
        </router-link>

        <h3 class="fw-bold mb-4">Thêm khách hàng mới</h3>

        <div class="row">
            <div class="col-md-8">
                <div class="card border-0 rounded-4 shadow-sm p-4 mb-4">
                    <h5 class="fw-bold mb-3">Thông tin cá nhân</h5>
                    <div class="row g-3">
                        <div class="col-md-12">
                            <label class="form-label fw-bold small text-muted">Họ và tên khách hàng</label>
                            <input v-model="newUser.name" type="text" class="form-control bg-light border-0 py-2">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted">Email</label>
                            <input v-model="newUser.email" type="email" class="form-control bg-light border-0 py-2">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted">Số điện thoại</label>
                            <input v-model="newUser.phone" type="text" class="form-control bg-light border-0 py-2">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted">Ngày sinh</label>
                            <input v-model="newUser.birthday" type="date" class="form-control bg-light border-0 py-2">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted">Giới tính</label>
                            <select v-model="newUser.gender" class="form-select bg-light border-0 py-2">
                                <option disabled value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted">Trạng thái</label>
                            <select v-model="newUser.status" class="form-select bg-light border-0 py-2">
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
                            <textarea v-model="newUser.address" class="form-control bg-light border-0"
                                rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card border-0 rounded-4 shadow-sm p-4 text-center mb-4">
                    <label class="form-label fw-bold d-block text-start small text-muted">Ảnh đại diện</label>
                    <div @click="triggerUpload"
                        class="d-flex flex-column align-items-center justify-content-center py-4 border border-2 border-dashed rounded-4 bg-light mt-2"
                        style="cursor: pointer; min-height: 180px;">
                        <div class="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mb-3"
                            style="width: 100px; height: 100px; overflow: hidden; border: 2px solid #ddd;">
                            <img v-if="newUser.avatarPreview" :src="newUser.avatarPreview"
                                class="w-100 h-100 object-fit-cover">
                            <span v-else class="material-symbols-outlined fs-1 text-secondary">add_a_photo</span>
                        </div>
                        <span class="fw-bold text-primary small">Bấm để tải ảnh đại diện</span>
                        <input type="file" ref="fileInput" class="d-none" @change="handleFileUpload" accept="image/*">
                    </div>
                </div>

                <div class="d-grid gap-2">
                    <button @click="saveUser"
                        class="btn btn-primary text-white fw-bold py-2 rounded-3 shadow-sm">Lưu</button>
                    <router-link to="/admin/users" class="btn btn-light py-2 rounded-3 fw-bold">Hủy bỏ</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserCreate",
    data() {
        return {
            newUser: {
                name: "",
                email: "",
                phone: "",
                birthday: "",
                gender: "",
                status: "Hoạt động",
                address: "",
                avatarPreview: null
            }
        };
    },
    methods: {
        triggerUpload() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.newUser.avatarPreview = URL.createObjectURL(file);
            }
        },
        saveUser() {
            if (!this.newUser.name || !this.newUser.phone) {
                alert("Vui lòng nhập tên và số điện thoại!");
                return;
            }

            let list = JSON.parse(localStorage.getItem('users'));


            const newUserObj = {
                id: "U" + Math.floor(Math.random() * 1000),
                name: this.newUser.name,
                email: this.newUser.email || "Chưa có",
                phone: this.newUser.phone,

                birthday: this.newUser.birthday,
                gender: this.newUser.gender,
                address: this.newUser.address,


                joinDate: new Date().toLocaleDateString('vi-VN'),
                status: this.newUser.status,
                avatar: this.newUser.avatarPreview || "https://via.placeholder.com/150"
            };

            list.unshift(newUserObj);
            localStorage.setItem('users', JSON.stringify(list));

            alert("Đã lưu khách hàng: " + this.newUser.name);
            this.$router.push('/admin/users');
        }
    }
}
</script>