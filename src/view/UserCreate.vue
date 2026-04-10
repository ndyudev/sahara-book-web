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
                            <label class="form-label fw-bold small text-muted text-uppercase">Họ và tên</label>
                            <input v-model="newUser.name" type="text" class="form-control bg-light border-0 py-2"
                                placeholder="Nhập họ tên...">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted text-uppercase">Email</label>
                            <input v-model="newUser.email" type="email" class="form-control bg-light border-0 py-2"
                                placeholder="example@gmail.com">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted text-uppercase">Số điện thoại</label>
                            <input v-model="newUser.phone" type="text" class="form-control bg-light border-0 py-2"
                                placeholder="090...">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted text-uppercase">Ngày sinh</label>
                            <input v-model="newUser.birthday" type="date" class="form-control bg-light border-0 py-2">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted text-uppercase">Giới tính</label>
                            <select v-model="newUser.gender" class="form-select bg-light border-0 py-2">
                                <option disabled value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted text-uppercase">Trạng thái</label>
                            <select v-model="newUser.status" class="form-select bg-light border-0 py-2 fw-bold" :class="{
                                'text-success': newUser.status === 'ACTIVE',
                                'text-warning': newUser.status === 'INACTIVE',
                                'text-danger': newUser.status === 'BLOCKED'
                            }">
                                <option value="ACTIVE" class="text-success fw-bold">Hoạt động</option>
                                <option value="INACTIVE" class="text-warning fw-bold">Chưa kích hoạt</option>
                                <option value="BLOCKED" class="text-danger fw-bold">Bị khóa</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="card border-0 rounded-4 shadow-sm p-4">
                    <h5 class="fw-bold mb-3 text-uppercase">Địa chỉ giao hàng</h5>
                    <div class="row g-3">
                        <div class="col-md-12">
                            <label class="form-label fw-bold small text-muted text-uppercase">Địa chỉ chi tiết</label>
                            <textarea v-model="newUser.address" class="form-control bg-light border-0" rows="3"
                                placeholder="Số nhà, tên đường..."></textarea>
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
                            style="width: 100px; height: 100px; overflow: hidden; border: 2px solid #ddd;">
                            <img v-if="newUser.avatarPreview" :src="newUser.avatarPreview"
                                class="w-100 h-100 object-fit-cover">
                            <span v-else class="material-symbols-outlined fs-1 text-secondary">add_a_photo</span>
                        </div>
                        <span class="fw-bold text-primary small">Bấm để tải ảnh</span>
                        <input type="file" ref="fileInput" class="d-none" @change="handleFileUpload" accept="image/*">
                    </div>
                </div>

                <div class="d-grid gap-2">
                    <button @click="saveUser" class="btn btn-primary text-white fw-bold py-2 rounded-3 shadow-sm">Lưu
                        khách hàng</button>
                    <router-link to="/admin/users"
                        class="btn btn-light py-2 rounded-3 fw-bold text-decoration-none text-center">Hủy</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import api from '../api/api';

const router = useRouter();
const toast = useToast();
const fileInput = ref(null);
const selectedAvatar = ref(null);

const newUser = reactive({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    status: "ACTIVE",
    address: "",
    avatarPreview: null
});

const triggerUpload = () => {
    fileInput.value.click();
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedAvatar.value = file; 
        newUser.avatarPreview = URL.createObjectURL(file);
    }
};

const saveUser = async () => {
    if (!newUser.name || !newUser.email) {
        toast.error("Họ tên và Email không được để trống!");
        return;
    }

    try {
        const newUserObject = {
            fullName: newUser.name,
            email: newUser.email,
            phone: newUser.phone, 
            dob: newUser.birthday,      
            gender: newUser.gender,
            status: newUser.status,
            username: newUser.email.split('@')[0], 
            role: "USER"
        };
        console.log("Dữ liệu gửi lên:", newUserObject);

        const response = await api.post('/api/v1/accounts', newUserObject);

        if (response.data.code === 1000 || response.status === 200 || response.status === 201) {
            toast.success(`Đã thêm khách hàng "${newUser.name}" thành công!`);
            router.push('/admin/users');
        }
    } catch (error) {
        console.error("Lỗi chi tiết:", error.response?.data);
        const errorMsg = error.response?.data?.message || "Không thêm được người dùng!";
        toast.error(errorMsg);
    }
};
</script>