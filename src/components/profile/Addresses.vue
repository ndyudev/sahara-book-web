<template>
    <div class="ad-page">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 class="ad-title mb-1">Địa chỉ của tôi</h2>
                <p class="text-muted small mb-0">Quản lý các địa chỉ nhận hàng để thanh toán nhanh hơn.</p>
            </div>
            <button @click="openModal()" class="ad-add-btn">
                <i class="bi bi-plus-lg me-2"></i>Thêm địa chỉ mới
            </button>
        </div>

        <div class="row g-3">
            <div v-for="ad in addresses" :key="ad.id" class="col-12 col-md-6">
                <div class="ad-card shadow-sm border" :class="{ 'ad-card--default': ad.isDefault }">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div class="d-flex align-items-center gap-2">
                            <span class="fw-bold text-dark">{{ ad.fullname }}</span>
                            <span v-if="ad.isDefault" class="ad-badge-default">Mặc định</span>
                        </div>
                        <div class="ad-actions">
                            <button @click="openModal(ad)" class="btn-icon" title="Chỉnh sửa">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button @click="deleteAddress(ad.id)" class="btn-icon text-danger" title="Xóa">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>

                    <div class="ad-info-item mb-2">
                        <i class="bi bi-telephone text-muted"></i>
                        <span>{{ formatPhone(ad.phone) }}</span>
                    </div>
                    <div class="ad-info-item">
                        <i class="bi bi-geo-alt text-muted"></i>
                        <span>{{ ad.detail }}<span v-if="ad.city">, {{ ad.city }}</span></span>
                    </div>

                    <div class="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                        <button v-if="!ad.isDefault" @click="setDefault(ad.id)" class="ad-set-default">
                            Thiết lập mặc định
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="addresses.length === 0" class="col-12 text-center py-5 text-muted">
                Bạn chưa có địa chỉ nào. Hãy thêm địa chỉ mới!
            </div>
        </div>

        <div v-if="showModal" class="ad-modal-overlay" @click.self="closeModal">
            <div class="ad-modal-content shadow-lg">
                <div class="ad-modal-header">
                    <h5 class="fw-bold mb-0">{{ isEditing ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới' }}</h5>
                    <button @click="closeModal" class="btn-close"></button>
                </div>

                <form @submit.prevent="saveAddress" class="ad-modal-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold">Họ và tên</label>
                            <input v-model="form.fullname" type="text" class="form-control rounded-3"
                                placeholder="Nhập họ tên" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold">Số điện thoại</label>
                            <input v-model="form.phone" type="text" class="form-control rounded-3"
                                placeholder="Nhập số điện thoại" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label small fw-bold">Tỉnh/Thành phố, Quận/Huyện, Phường/Xã</label>
                            <input v-model="form.city" type="text" class="form-control rounded-3"
                                placeholder="Ví dụ: TP. Hồ Chí Minh, Quận 1..." required>
                        </div>
                        <div class="col-12">
                            <label class="form-label small fw-bold">Địa chỉ cụ thể</label>
                            <textarea v-model="form.detail" class="form-control rounded-3" rows="2"
                                placeholder="Số nhà, tên đường..."></textarea>
                        </div>
                        <div class="col-12">
                            <div class="form-check">
                                <input v-model="form.isDefault" class="form-check-input" type="checkbox"
                                    id="defaultCheck">
                                <label class="form-check-label small" for="defaultCheck">Đặt làm địa chỉ mặc
                                    định</label>
                            </div>
                        </div>
                    </div>

                    <div class="ad-modal-footer mt-4">
                        <button type="button" @click="closeModal" class="ad-btn-cancel">Trở lại</button>
                        <button type="submit" class="ad-btn-save">Hoàn thành</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import usersData from '../../data/user.json'
import { useToast } from "vue-toastification"

const toast = useToast()
const showModal = ref(false)
const isEditing = ref(false)
const addresses = ref([])

const storedUser = JSON.parse(localStorage.getItem('user-info'))
const currentUserId = storedUser?.id
const currentUserJson = usersData.find(u => u.id === currentUserId) || {}

const initialForm = {
    id: null,
    userId: currentUserId,
    fullname: currentUserJson.fullname || '',
    phone: currentUserJson.phone || '',
    city: '',
    detail: '',
    isDefault: false
}

const form = ref({ ...initialForm })

onMounted(() => {
    loadAddresses()
})

const loadAddresses = () => {
    const allSavedAddresses = JSON.parse(localStorage.getItem('user_addresses')) || []
    const userAddresses = allSavedAddresses.filter(ad => ad.userId === currentUserId)

    if (userAddresses.length > 0) {
        addresses.value = userAddresses
    } else if (currentUserJson.address) {
        const defaultAd = {
            id: Date.now(),
            userId: currentUserId,
            fullname: currentUserJson.fullname,
            phone: currentUserJson.phone,
            city: '',
            detail: currentUserJson.address,
            isDefault: true
        }
        addresses.value = [defaultAd]
        saveToLocalStorage()
    }
}

const formatPhone = (phone) => {
    if (!phone) return '';
    const p = phone.toString();
    if (p.length < 6) return p;
    return p.substring(0, 3) + '****' + p.substring(p.length - 3);
}

const saveToLocalStorage = () => {
    const allSavedAddresses = JSON.parse(localStorage.getItem('user_addresses')) || []
    const otherUsersAddresses = allSavedAddresses.filter(ad => ad.userId !== currentUserId)
    const finalData = [...otherUsersAddresses, ...addresses.value]
    localStorage.setItem('user_addresses', JSON.stringify(finalData))
    window.dispatchEvent(new Event('storage'))
}

const openModal = (ad = null) => {
    if (ad) {
        form.value = { ...ad }
        isEditing.value = true
    } else {
        form.value = {
            ...initialForm,
            id: null,
            isDefault: addresses.value.length === 0
        }
        isEditing.value = false
    }
    showModal.value = true
}

const closeModal = () => { showModal.value = false }

const saveAddress = () => {
    if (!form.value.fullname || !form.value.phone || !form.value.city) {
        toast.warning("Vui lòng điền đầy đủ thông tin bắt buộc");
        return;
    }

    if (form.value.isDefault) {
        addresses.value.forEach(a => a.isDefault = false)
    }

    if (isEditing.value) {
        const index = addresses.value.findIndex(a => a.id === form.value.id)
        if (index !== -1) {
            addresses.value[index] = { ...form.value }
            toast.success("Đã cập nhật địa chỉ");
        }
    } else {
        addresses.value.push({ ...form.value, id: Date.now(), userId: currentUserId })
        toast.success("Đã thêm địa chỉ mới");
    }

    if (addresses.value.length === 1) {
        addresses.value[0].isDefault = true
    }

    saveToLocalStorage()
    closeModal()
}

const deleteAddress = (id) => {
    const adToDelete = addresses.value.find(a => a.id === id);
    if (!adToDelete) return;

    toast.warning({
        component: {
            render() {
                return h('div', { class: 'p-1' }, [
                    h('p', { class: 'mb-2 small text-dark' }, [
                        'Xóa địa chỉ: ',
                        h('strong', adToDelete.fullname),
                        '?'
                    ]),
                    h('div', { class: 'd-flex gap-2' }, [
                        h('button', {
                            class: 'btn btn-danger btn-sm px-3 fw-bold border-0',
                            onClick: () => {
                                this.$emit("close-toast"); 
                                executeDelete(id);         
                            }
                        }, 'Xóa'),
                        h('button', {
                            class: 'btn btn-light btn-sm px-3 border',
                            onClick: () => this.$emit("close-toast")
                        }, 'Hủy')
                    ])
                ]);
            }
        }
    }, {
        timeout: 5000,
        closeOnClick: false,
        draggable: false,
        icon: "bi bi-exclamation-triangle-fill"
    });
};

const executeDelete = (id) => {
    addresses.value = addresses.value.filter(a => a.id !== id)
    if (addresses.value.length > 0 && !addresses.value.some(a => a.isDefault)) {
        addresses.value[0].isDefault = true
    }
    saveToLocalStorage()
    toast.error("Đã xóa địa chỉ thành công");
}

const setDefault = (id) => {
    addresses.value.forEach(a => a.isDefault = a.id === id)
    saveToLocalStorage()
    toast.info("Đã đặt làm địa chỉ mặc định", {
        icon: "bi bi-check-circle-fill",
        timeout: 2000
    });
}
</script>
<style scoped>
.ad-title {
    font-weight: 800;
    color: #191C1D;
    font-size: 28px;
}

.ad-add-btn {
    background: #191C1D;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 700;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
}

.ad-add-btn:hover {
    background: #FF8C00;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 140, 0, 0.2);
}

/* Thẻ địa chỉ */
.ad-card {
    background: #fff;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #f0f0f0;
    transition: all 0.3s ease;
    height: 100%;
    position: relative;
}

.ad-card:hover {
    border-color: #ddd;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05) !important;
}

.ad-card--default {
    border-color: #FF8C00 !important;
    background: #fffcf9;
}

.ad-badge-default {
    font-size: 11px;
    background: #FF8C00;
    color: #fff;
    padding: 3px 10px;
    border-radius: 6px;
    font-weight: 700;
    text-transform: uppercase;
}

.ad-info-item {
    display: flex;
    gap: 12px;
    font-size: 14.5px;
    color: #444;
    align-items: flex-start;
}

.ad-info-item i {
    font-size: 16px;
    margin-top: 2px;
}

.ad-type-label {
    font-size: 12px;
    color: #888;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.ad-set-default {
    border: none;
    background: none;
    color: #0066cc;
    font-size: 13.5px;
    font-weight: 700;
    padding: 0;
    cursor: pointer;
    transition: 0.2s;
}

.ad-set-default:hover {
    color: #004499;
    text-decoration: underline;
}

.btn-icon {
    border: none;
    background: #f8f9fa;
    padding: 6px 10px;
    border-radius: 8px;
    color: #666;
    cursor: pointer;
    transition: 0.2s;
    margin-left: 5px;
}

.btn-icon:hover {
    background: #eee;
    color: #191C1D;
}

.btn-icon.text-danger:hover {
    background: #fff5f5;
    color: #dc3545;
}

/* Modal */
.ad-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    backdrop-filter: blur(6px);
}

.ad-modal-content {
    background: #fff;
    width: 90%;
    max-width: 550px;
    border-radius: 20px;
    overflow: hidden;
    animation: modalSlideUp 0.3s ease-out;
}

@keyframes modalSlideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.ad-modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.ad-modal-body {
    padding: 24px;
}

/* Form inputs */
.form-control {
    border: 1.5px solid #eee;
    padding: 10px 15px;
    transition: 0.2s;
}

.form-control:focus {
    border-color: #FF8C00;
    box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.1);
}

.ad-modal-footer {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
}

.ad-btn-save {
    background: #FF8C00;
    color: #fff;
    border: none;
    padding: 12px 28px;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
}

.ad-btn-save:hover {
    background: #e67e00;
    box-shadow: 0 4px 12px rgba(255, 140, 0, 0.2);
}

.ad-btn-cancel {
    background: #f1f1f1;
    color: #555;
    border: none;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
}

.ad-btn-cancel:hover {
    background: #e5e5e5;
    color: #191C1D;
}

</style>