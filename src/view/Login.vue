<template>
    <div class="min-vh-100 d-flex flex-column font-manrope">
        <main
            class="flex-grow-1 d-flex align-items-center justify-content-center p-3 p-lg-5 position-relative hero-section">
            <div class="position-absolute inset-0 bg-overlay"></div>

            <div class="auth-card position-relative z-1">

                <div class="auth-tabs">
                    <RouterLink to="/login" class="auth-tab active-tab">
                        <span class="tab-text">Đăng nhập</span>
                    </RouterLink>
                    <RouterLink to="/register" class="auth-tab inactive-tab">
                        <span class="tab-text">Đăng ký</span>
                    </RouterLink>
                </div>

                <div class="auth-content">

                    <div class="auth-heading">
                        <h1 class="auth-title">Chào mừng trở lại</h1>
                        <p class="auth-subtitle">Nhập thông tin của bạn để truy cập thư viện</p>
                    </div>

                    <form @submit.prevent="handleLogin" class="auth-form">

                        <div class="field-group">
                            <label class="field-label">Địa chỉ Email</label>
                            <div class="field-input-wrap">
                                <i class="bi bi-envelope field-icon"></i>
                                <input type="email" class="field-input" placeholder="ten@vi-du.com" v-model="form.email"
                                    required />
                            </div>
                        </div>

                        <div class="field-group">
                            <div class="field-label-row">
                                <label class="field-label">Mật khẩu</label>
                                <a href="#" class="forgot-link">Quên mật khẩu?</a>
                            </div>
                            <div class="field-input-wrap">
                                <i class="bi bi-lock field-icon"></i>
                                <input :type="showPassword ? 'text' : 'password'"
                                    class="field-input field-input--has-toggle" placeholder="••••••••"
                                    v-model="form.password" required />
                                <button class="toggle-pw" type="button" @click="showPassword = !showPassword"
                                    :title="showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'">
                                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                </button>
                            </div>
                        </div>

                        <div class="remember-row">
                            <input class="remember-checkbox" type="checkbox" id="rememberMe" v-model="form.remember" />
                            <label class="remember-label" for="rememberMe">Ghi nhớ tôi</label>
                        </div>

                        <button type="submit" class="submit-btn">Đăng nhập vào tài khoản</button>

                    </form>

                    <div class="auth-divider">
                        <div class="divider-line"></div>
                        <span class="divider-text">Hoặc tiếp tục với</span>
                        <div class="divider-line"></div>
                    </div>

                    <div class="social-row">
                        <button class="social-btn">
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20"
                                alt="Google" />
                            <span>Google</span>
                        </button>
                        <button class="social-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span>Facebook</span>
                        </button>
                    </div>

                </div>

                <div class="auth-footer">
                    <p class="auth-footer-text">
                        Bạn mới biết đến Sahara?
                        <RouterLink to="/register" class="auth-footer-link">Tạo tài khoản mới</RouterLink>
                    </p>
                </div>

            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import users from '../data/user.json'
import { useToast } from "vue-toastification"

const toast = useToast()
const router = useRouter()
const route = useRoute()

const showPassword = ref(false)
const form = reactive({
    email: '',
    password: '',
    remember: false
})

const handleLogin = () => {

    const jsonUsers = users;

    const localUsers = JSON.parse(localStorage.getItem('sahara-users') || '[]')

    const allUsers = [...jsonUsers, ...localUsers]

    const user = allUsers.find(u => u.email === form.email && u.password === form.password);

    if (user) {
        localStorage.setItem('user-token', 'mock-jwt-token-12345');

        localStorage.setItem('user-info', JSON.stringify(user));

        window.dispatchEvent(new Event('strorage'));
        window.dispatchEvent(new Event('user-info-changed'));

        const redirectPath = route.query.redirect || '/';
        toast.success(`Chào mừng ${user.fullname || 'bạn'} quay trở lại!`);

        router.push(redirectPath);
    } else {
        toast.error('Email hoặc mật khẩu không chính xác. Vui lòng thử lại!');
    }
};
</script>