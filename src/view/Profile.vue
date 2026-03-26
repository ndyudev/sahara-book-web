<template>
    <div class="container-xl py-5">
        <div class="row g-4">
            <div class="col-12 col-lg-3">
                <nav class="profile-nav p-3 rounded-4 shadow-sm bg-white border">
                    <div class="user-profile-header d-flex align-items-center gap-3 mb-4 px-2">
                        <div class="user-avatar shadow-sm">
                            <img :src="user.avatar" alt="avatar"
                                class="rounded-circle w-100 h-100 object-fit-cover border border-2 border-white">
                        </div>
                        <div class="user-meta overflow-hidden">
                            <p class="mb-0 text-muted small">Xin chào,</p>
                            <h6 class="mb-0 fw-bolder text-dark text-truncate">
                                {{ user.fullname || user.fullName || 'Khách hàng' }}
                            </h6>
                        </div>
                    </div>

                    <hr class="my-3 opacity-10" />

                    <div class="nav-menu">
                        <RouterLink v-for="item in navItems" :key="item.key" :to="item.path"
                            class="profile-nav-item d-flex align-items-center gap-3 px-3 py-2 rounded-3 mb-2 text-decoration-none"
                            active-class="active">
                            <i :class="item.icon" class="fs-5"></i>
                            <span>{{ item.label }}</span>
                        </RouterLink>
                    </div>

                    <hr class="my-3 opacity-10" />

                    <a href="#" @click.prevent="handleLogout"
                        class="profile-nav-item profile-nav-logout d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none">
                        <i class="bi bi-box-arrow-right fs-5"></i>
                        <span>Đăng xuất</span>
                    </a>
                </nav>
            </div>

            <div class="col-12 col-lg-9">
                <div class="bg-white p-4 rounded-4 shadow-sm border" style="min-height: 500px;">
                    <RouterView />
                </div>
            </div>
        </div>
    </div>
    <Transition name="fade">
        <div v-if="confirmData.show" class="sb-overlay">
            <div class="sb-confirm-card">
                <div class="sb-confirm-icon"><i class="bi bi-box-arrow-right"></i></div>
                <h4 class="fw-bold">Đăng xuất?</h4>
                <p class="text-muted">Bạn có chắc chắn muốn rời khỏi hệ thống SaharaBook không?</p>
                <div class="sb-confirm-btns">
                    <button @click="confirmData.show = false" class="btn-cancel">Quay lại</button>
                    <button @click="executeLogout" class="btn-confirm">Đăng xuất</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useToast } from 'vue-toastification';

const router = useRouter()

const user = ref({
    fullname: '',
    avatar: ''
})

const confirmData = reactive({
    show: false
})

const toast = useToast();

const navItems = [
    { key: 'personal', label: 'Thông tin cá nhân', icon: 'bi bi-person', path: '/profile' },
    { key: 'orders', label: 'Quản lý đơn hàng', icon: 'bi bi-bag', path: '/profile/orders' },
    { key: 'addresses', label: 'Địa chỉ nhận hàng', icon: 'bi bi-geo-alt', path: '/profile/addresses' },
    { key: 'wishlist', label: 'Danh sách yêu thích', icon: 'bi bi-heart', path: '/profile/wishlist' },
]

const loadUserData = () => {
    const savedInfo = localStorage.getItem('user-info')
    if (savedInfo) {
        try {
            const parsed = JSON.parse(savedInfo)

            user.value = { ...user.value, ...parsed }
        } catch (e) {
            console.error("Lỗi parse user-info:", e)
        }
    }
}


const handleLogout = () => {
    confirmData.show = true
}

const executeLogout = () => {

    localStorage.removeItem('user-token')
    localStorage.removeItem('user-info')

    user.value = { fullname: '', avatar: '' }
    confirmData.show = false

    toast.success("Bạn đã đăng xuất thành công!", "success")
    setTimeout(() => {
        router.push('/')
        window.dispatchEvent(new Event('storage'))
    }, 1000)
}

onMounted(() => {
    loadUserData()
    window.addEventListener('storage', loadUserData)
    window.addEventListener('user-info-changed', loadUserData)
})

onUnmounted(() => {
    window.removeEventListener('storage', loadUserData)
    window.addEventListener('user-info-changed', loadUserData)
})
</script>

<style scoped>
.profile-nav {
    z-index: 10;
}

.user-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.profile-nav-item {
    font-family: 'Manrope', sans-serif;
    font-weight: 600;
    font-size: 14.5px;
    color: #64748b;
    transition: all 0.25s ease;
}

.profile-nav-item i {
    color: #94a3b8;
}

.profile-nav-item:hover {
    background: #fff7ed;
    color: #FF8C00;
    padding-left: 1.5rem !important;
}

.profile-nav-logout {
    color: #ef4444;
}

.profile-nav-logout:hover {
    background: #fef2f2;
    color: #dc2626;
    padding-left: 1.5rem !important;
}
</style>