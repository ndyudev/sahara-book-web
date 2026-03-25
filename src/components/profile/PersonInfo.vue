<template>
    <div class="pi-card">
        <div class="pi-header">
            <h4 class="pi-title">Thông tin cá nhân</h4>
            <p class="pi-subtitle">Quản lý thông tin hồ sơ để bảo mật tài khoản và nhận ưu đãi tốt nhất.</p>
        </div>

        <div class="pi-avatar-row">
            <div class="pi-avatar-wrap">
                <img :src="user.avatar" class="pi-avatar" alt="Avatar" />

                <label for="avatar-input" class="pi-avatar-btn" title="Đổi ảnh đại diện">
                    <i class="bi bi-camera-fill"></i>
                </label>
                <input type="file" id="avatar-input" hidden @change="handleAvatarChange" accept="image/*" />
            </div>

            <div class="pi-avatar-info">
                <p class="pi-avatar-label">Ảnh đại diện</p>
            </div>
        </div>

        <div class="pi-form-grid">
            <div class="pi-field">
                <label class="pi-label">Họ và tên</label>
                <input class="pi-input" v-model="user.fullname" placeholder="Nhập tên đầy đủ của bạn" />
            </div>

            <div class="pi-field">
                <label class="pi-label">
                    Email
                    <span class="pi-label-muted"><i class="bi bi-lock-fill ms-1"></i></span>
                </label>
                <input class="pi-input pi-input--disabled" :value="user.email" disabled />
            </div>

            <div class="pi-field">
                <label class="pi-label">Số điện thoại</label>
                <input class="pi-input" v-model="user.phone" placeholder="Ví dụ: 0901234567" />
            </div>

            <div class="pi-field">
                <label class="pi-label">Ngày sinh</label>
                <input class="pi-input" type="date" v-model="user.dob" />
            </div>

            <div class="pi-field pi-field--full">
                <label class="pi-label">Địa chỉ</label>
                <input class="pi-input" v-model="user.address" placeholder="Số nhà, tên đường, phường/xã..." />
            </div>
        </div>

        <div class="pi-footer">
            <button class="pi-save-btn" @click="save" :disabled="isSaving">
                <span v-if="!isSaving"><i class="bi bi-shield-check me-2"></i>Lưu thay đổi</span>
                <span v-else><span class="spinner-border spinner-border-sm me-2"></span>Đang lưu...</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isSaving = ref(false)
const user = ref({
    fullname: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    avatar: ''
})

onMounted(() => {
    const savedData = localStorage.getItem('user-info')
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData)
            user.value = { ...user.value, ...parsedData }
        } catch (e) {
            console.error("Lỗi tải dữ liệu:", e)
        }
    }
})

const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            alert("Ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.")
            return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
            user.value.avatar = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const save = () => {
    isSaving.value = true
    setTimeout(() => {
        localStorage.setItem('user-info', JSON.stringify(user.value))
        isSaving.value = false
        alert('Cập nhật thông tin thành công!')
        window.dispatchEvent(new Event('storage'))
    }, 600)
}
</script>

<style scoped>
.pi-card {
    background: #fff;
    border: 1px solid #edf2f7;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    border-radius: 24px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.pi-header {
    padding-bottom: 24px;
    border-bottom: 1px solid #f1f5f9;
}

.pi-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 26px;
    color: #0f172a;
    margin: 0;
}

.pi-subtitle {
    font-size: 15px;
    color: #64748b;
    margin-top: 8px;
}

.pi-avatar-row {
    display: flex;
    align-items: center;
    gap: 24px;
}

.pi-avatar-wrap {
    position: relative;
    width: 100px;
    height: 100px;
}

.pi-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.pi-avatar-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 32px;
    height: 32px;
    background: #FF8C00;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid #fff;
    transition: 0.2s;
}

.pi-avatar-btn:hover {
    transform: scale(1.1);
    background: #e67e00;
}

.pi-avatar-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.pi-avatar-label {
    font-weight: 700;
    color: #334155;
    margin: 0;
}

.pi-avatar-hint {
    font-size: 12px;
    color: #94a3b8;
    margin: 0;
}

.pi-form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
}

.pi-field--full {
    grid-column: span 2;
}

.pi-label {
    display: block;
    font-weight: 700;
    font-size: 14px;
    color: #475569;
    margin-bottom: 8px;
}

.pi-label-muted {
    color: #94a3b8;
}

.pi-input {
    width: 100%;
    height: 52px;
    padding: 0 16px;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    font-family: inherit;
    transition: 0.2s;
}

.pi-input:focus {
    background: #fff;
    border-color: #FF8C00;
    outline: none;
    box-shadow: 0 0 0 4px rgba(255, 140, 0, 0.1);
}

.pi-input--disabled {
    background: #f1f5f9;
    cursor: not-allowed;
    color: #64748b;
}

.pi-footer {
    display: flex;
    justify-content: flex-start;
}

.pi-save-btn {
    padding: 14px 40px;
    background: #FF8C00;
    color: #fff;
    border: none;
    border-radius: 14px;
    font-weight: 700;
    font-size: 16px;
    transition: 0.3s;
    display: flex;
    align-items: center;
}
</style>