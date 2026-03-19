<template>
    <footer class="site-footer">

        <div class="footer-inner">

            <div class="footer-brand">
                <span class="brand-name">SaharaBook</span>
                <p class="brand-desc">
                    Sahara Bookstore là điểm đến trực tuyến cho hành trình khám phá văn học của bạn.
                    Chúng tôi chỉ tuyển chọn những tác phẩm xuất sắc nhất để đảm bảo từng phút giây đọc sách của bạn đều
                    trọn vẹn.
                </p>
                <div class="social-links">
                    <a v-for="social in socials" :key="social.name" :href="social.href" :aria-label="social.name"
                        class="footer-social-btn">
                        <i :class="social.icon"></i>
                    </a>
                </div>
            </div>

            <div class="footer-col">
                <h4 class="footer-col-title">Khám phá</h4>
                <ul class="footer-links">
                    <li v-for="link in exploreLinks" :key="link">
                        <a href="#" class="footer-link">{{ link }}</a>
                    </li>
                </ul>
            </div>

            <div class="footer-col">
                <h4 class="footer-col-title">Hỗ trợ</h4>
                <ul class="footer-links">
                    <li v-for="link in supportLinks" :key="link">
                        <a href="#" class="footer-link">{{ link }}</a>
                    </li>
                </ul>
            </div>

            <div class="footer-col">
                <h4 class="footer-col-title">Thanh toán</h4>
                <div class="payment-grid">
                    <div v-for="pay in paymentpays" :key="pay.name" class="payment-card" :title="pay.name"
                        v-html="pay.svg"></div>
                </div>
            </div>

        </div>
        <div class="footer-bottom">
            <span>© 2026 SaharaBook. Bảo lưu mọi quyền.</span>
        </div>

    </footer>
</template>

<script setup>
const socials = [
    { name: 'Facebook', href: '#', icon: 'bi bi-facebook' },
    { name: 'YouTube', href: '#', icon: 'bi bi-youtube' },
    { name: 'LinkedIn', href: '#', icon: 'bi bi-linkedin' },
]
const paymentpays = [
    {
        name: 'VNPAY',
        svg: `<svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="22" font-family="Arial Black" font-weight="900" font-size="16" fill="#0068B3">VNPAY</text>
      <text x="2" y="35" font-family="Arial" font-weight="400" font-size="8" fill="#E8192C">Scan to Pay</text>
      <text x="58" y="16" font-family="Arial Black" font-weight="900" font-size="10" fill="#E8192C">QR</text>
    </svg>`
    },
    {
        name: 'MoMo',
        svg: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" rx="10" fill="#AE2070"/>
      <rect x="8" y="6" width="20" height="20" rx="10" fill="white"/>
      <rect x="32" y="6" width="20" height="20" rx="10" fill="white"/>
      <rect x="13" y="11" width="10" height="10" rx="5" fill="#AE2070"/>
      <rect x="37" y="11" width="10" height="10" rx="5" fill="#AE2070"/>
      <text x="50%" y="36" text-anchor="middle" font-family="Arial" font-size="7" fill="white">mobile money</text>
    </svg>`
    },
    {
        name: 'ShopeePay',
        svg: `<svg viewBox="0 0 90 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="4" width="32" height="32" rx="8" fill="#EE4D2D"/>
      <text x="16" y="26" text-anchor="middle" font-family="Arial Black" font-weight="900" font-size="20" fill="white">S</text>
      <text x="38" y="18" font-family="Arial Black" font-weight="900" font-size="14" fill="#EE4D2D">Shopee</text>
      <text x="38" y="33" font-family="Arial Black" font-weight="900" font-size="14" fill="#333">Pay</text>
    </svg>`
    },
    {
        name: 'ZaloPay',
        svg: `<svg viewBox="0 0 90 40" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="28" font-family="Arial Black" font-weight="900" font-size="24" fill="#0068FF">Zalo</text>
      <text x="54" y="28" font-family="Arial Black" font-weight="900" font-size="24" fill="#00AAFF">pay</text>
    </svg>`
    },
    {
        name: 'GHN',
        svg: `<svg viewBox="0 0 90 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="4" width="32" height="28" rx="6" fill="#F05A27"/>
      <text x="16" y="23" text-anchor="middle" font-family="Arial Black" font-weight="900" font-size="11" fill="white">GHN</text>
      <text x="36" y="16" font-family="Arial Black" font-weight="900" font-size="9" fill="#F05A27">GiaoHang</text>
      <text x="36" y="27" font-family="Arial Black" font-weight="900" font-size="9" fill="#F05A27">Nhanh</text>
    </svg>`
    },
    {
        name: 'Viettel Post',
        svg: `<svg viewBox="0 0 90 40" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="20" font-family="Arial Black" font-weight="900" font-size="18" fill="#EE0033">viettel</text>
      <text x="4" y="34" font-family="Arial" font-weight="400" font-size="12" fill="#333">post</text>
    </svg>`
    },
]

const exploreLinks = ['Về chúng tôi', 'Liên hệ']
const supportLinks = ['Theo dõi đơn hàng', 'Chính sách bảo mật']
</script>
<style scoped></style>