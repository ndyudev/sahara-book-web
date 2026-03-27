<template>
  <div class="min-vh-100 d-flex flex-column font-manrope">
    <main
      class="flex-grow-1 d-flex align-items-center justify-content-center p-3 p-lg-5 position-relative hero-section">
      <div class="position-absolute inset-0 bg-overlay"></div>

      <div class="auth-card position-relative z-1">
        <div class="auth-tabs">
          <RouterLink to="/login" class="auth-tab inactive-tab">
            <span class="tab-text">Đăng nhập</span>
          </RouterLink>
          <RouterLink to="/register" class="auth-tab active-tab">
            <span class="tab-text">Đăng ký</span>
          </RouterLink>
        </div>

        <div class="auth-content">
          <div class="auth-heading">
            <h1 class="auth-title">Tạo tài khoản</h1>
            <p class="auth-subtitle">Tham gia cộng đồng yêu sách của chúng tôi</p>
          </div>

          <form @submit.prevent="handleSignup" class="auth-form" novalidate>
            <div class="field-group">
              <label class="field-label">Họ và Tên</label>
              <div class="field-input-wrap">
                <i class="bi bi-person field-icon" :class="{ 'text-error': errors.name }"></i>
                <input type="text" class="field-input" :class="{ 'input-error': errors.name }"
                  placeholder="Nguyễn Văn A" v-model="form.name" />
              </div>
              <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
            </div>

            <div class="field-group">
              <label class="field-label">Địa chỉ Email</label>
              <div class="field-input-wrap">
                <i class="bi bi-envelope field-icon" :class="{ 'text-error': errors.email }"></i>
                <input type="email" class="field-input" :class="{ 'input-error': errors.email }"
                  placeholder="vi-du@email.com" v-model="form.email" />
              </div>
              <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
            </div>

            <div class="field-group">
              <label class="field-label">Mật khẩu</label>
              <div class="field-input-wrap">
                <i class="bi bi-lock field-icon" :class="{ 'text-error': errors.password }"></i>
                <input :type="showPassword ? 'text' : 'password'" class="field-input field-input--has-toggle"
                  :class="{ 'input-error': errors.password }" placeholder="••••••••" v-model="form.password" />
                <button class="toggle-pw" type="button" @click="showPassword = !showPassword">
                  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
              <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
            </div>

            <div class="field-group">
              <label class="field-label">Xác nhận mật khẩu</label>
              <div class="field-input-wrap">
                <i class="bi bi-lock field-icon" :class="{ 'text-error': errors.confirmpassword }"></i>
                <input :type="showConfirmPassword ? 'text' : 'password'" class="field-input field-input--has-toggle"
                  :class="{ 'input-error': errors.confirmpassword }" placeholder="••••••••"
                  v-model="form.confirmpassword" />
                <button class="toggle-pw" type="button" @click="showConfirmPassword = !showConfirmPassword">
                  <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
              <span v-if="errors.confirmpassword" class="error-text">{{ errors.confirmpassword }}</span>
            </div>

            <button type="submit" class="submit-btn">Tạo tài khoản của tôi</button>
          </form>

          <div class="auth-divider">
            <div class="divider-line"></div>
            <span class="divider-text">Hoặc tiếp tục với</span>
            <div class="divider-line"></div>
          </div>

          <div class="social-row">
            <button class="social-btn">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" alt="Google" />
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
            Bạn đã có tài khoản?
            <RouterLink to="/login" class="auth-footer-link">Đăng nhập ngay</RouterLink>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const toast = useToast();
const router = useRouter();

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmpassword: ''
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmpassword: ''
})

const validateForm = () => {
  let isValid = true

  Object.keys(errors).forEach(key => errors[key] = '')

  if (!form.name.trim()) {
    errors.name = 'Vui lòng nhập họ và tên'
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = 'Vui lòng nhập địa chỉ email'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Email không đúng định dạng'
    isValid = false
  }

  if (form.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    isValid = false
  }
  if (form.confirmpassword !== form.password) {
    errors.confirmpassword = 'Mật khẩu xác nhận không khớp'
    isValid = false
  }

  return isValid
}

const handleSignup = () => {
  if (validateForm()) {

    const existingUsers = JSON.parse(localStorage.getItem('sahara-users') || '[]');
    if (existingUsers.find(u => u.email === form.email)) {
      toast.error("Email này đã được đăng ký rồi!");
      return;
    }

    existingUsers.push({
      email: form.email,
      password: form.password,
      fullname: form.name,
      avatar: ''
    });

    localStorage.setItem('sahara-users', JSON.stringify(existingUsers));

    toast.success("Chào mừng bạn đến với SaharaBook!");

    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } else {
    toast.error("Vui lòng điền đúng thông tin!")
  }
}
</script>
