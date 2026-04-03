<template>
    <div class="voucher-wallet-container">
        <div
            class="wallet-header mb-4 p-4 rounded-4 shadow-sm bg-white border d-flex justify-content-between align-items-center">
            <div>
                <h5 class="fw-bold mb-1">Ví Voucher của tôi</h5>
                <p class="text-muted small mb-0">Bạn đang có <span class="text-warning fw-bold">{{ activeVouchers.length
                        }}</span> voucher khả dụng</p>
            </div>
            <button class="btn btn-warning btn-sm rounded-pill px-3 fw-bold text-white"
                @click="$router.push('/profile/rewards')">
                <i class="bi bi-plus-circle me-1"></i> Đổi thêm mã
            </button>
        </div>

        <div class="wallet-tabs mb-4">
            <button v-for="tab in ['Mới nhất', 'Sắp hết hạn', 'Đã dùng/Hết hạn']" :key="tab"
                :class="{ active: activeTab === tab }" @click="activeTab = tab">
                {{ tab }}
            </button>
        </div>

        <div v-if="filteredVouchers.length > 0" class="voucher-list">
            <div v-for="v in filteredVouchers" :key="v.id" class="sahara-ticket"
                :class="{ 'is-used': v.isUsed || v.isExpired }">
                <div class="ticket-left">
                    <div class="voucher-type-icon">
                        <i v-if="v.type === 'shipping'" class="bi bi-truck"></i>
                        <span v-else class="text-uppercase fw-bold" style="font-size: 10px;">Sahara</span>
                    </div>
                    <div class="v-label">{{ v.type === 'shipping' ? 'Vận chuyển' : 'Giảm giá' }}</div>

                    <div class="sawtooth-left"></div>
                </div>

                <div class="ticket-main">
                    <div class="v-info">
                        <h6 class="v-title">{{ v.title }}</h6>
                        <p class="v-condition">Đơn tối thiểu ₫{{ v.minOrder?.toLocaleString() }}</p>

                        <div class="v-progress-container" v-if="!v.isUsed && !v.isExpired">
                            <div class="v-progress-bar" :style="{ width: v.usagePercent + '%' }"></div>
                            <span class="v-usage-text">Còn lại {{ 100 - v.usagePercent }}%</span>
                        </div>

                        <div class="v-time">HSD: {{ v.expiryDate }}</div>
                    </div>
                </div>

                <div class="ticket-right">
                    <div class="separator-line"></div>
                    <button v-if="!v.isUsed && !v.isExpired" class="btn-use" @click.prevent="handleUseVoucher(v)">
                        Dùng ngay
                    </button>
                    <div v-else class="stamp">
                        <span v-if="v.isUsed">ĐÃ DÙNG</span>
                        <span v-else>HẾT HẠN</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="empty-wallet text-center py-5 bg-white rounded-4 border">
            <img src="https://cdn-icons-png.flaticon.com/512/11326/11326124.png" alt="empty" width="100"
                class="mb-3 opacity-25">
            <h6 class="text-muted">Không tìm thấy voucher nào</h6>
            <button class="btn btn-link text-warning" @click="activeTab = 'Mới nhất'">Xem mã khả dụng</button>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const activeTab = ref('Mới nhất')

const myVouchers = ref([
    { id: 1, title: 'Giảm trực tiếp ₫20k', minOrder: 100000, expiryDate: '30.04.2026', type: 'discount', usagePercent: 40, isUsed: false, isExpired: false },
    { id: 2, title: 'Miễn phí vận chuyển 30k', minOrder: 0, expiryDate: '15.05.2026', type: 'shipping', usagePercent: 85, isUsed: false, isExpired: false },
    { id: 3, title: 'Hoàn 50k xu Sahara', minOrder: 500000, expiryDate: '01.01.2026', type: 'discount', isUsed: true, isExpired: false },
    { id: 4, title: 'Siêu voucher 100k', minOrder: 1000000, expiryDate: '10.10.2025', type: 'discount', isUsed: false, isExpired: true }
])

const activeVouchers = computed(() => myVouchers.value.filter(v => !v.isUsed && !v.isExpired))

const filteredVouchers = computed(() => {
    if (activeTab.value === 'Đã dùng/Hết hạn') {
        return myVouchers.value.filter(v => v.isUsed || v.isExpired)
    }
    if (activeTab.value === 'Sắp hết hạn') {
        return myVouchers.value.filter(v => !v.isUsed && !v.isExpired && v.usagePercent > 70)
    }
    return activeVouchers.value
})

const handleUseVoucher = (voucher) => {

    if (voucher.categoryId) {
        router.push({ path: '/product', query: { category: voucher.categoryId } });
    } else {
        router.push('/product');
    }
    toast.info(`Đã chọn ưu đãi: ${voucher.title}`);
}
</script>

<style scoped>
.wallet-tabs {
    display: flex;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #eee;
}

.wallet-tabs button {
    flex: 1;
    padding: 12px;
    border: none;
    background: none;
    font-size: 14px;
    font-weight: 600;
    color: #64748b;
    transition: all 0.2s;
}

.wallet-tabs button.active {
    color: #FF8C00;
    background: #fff7ed;
    border-bottom: 2px solid #FF8C00;
}

.sahara-ticket {
    display: flex;
    background: #fff;
    margin-bottom: 16px;
    min-height: 110px;
    border-radius: 8px;
    filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.05));
    position: relative;
    overflow: hidden;
    border: 1px solid #f0f0f0;
}

.ticket-left {
    width: 100px;
    background: #FF8C00;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}

.sahara-ticket:has(.bi-truck) .ticket-left {
    background: #00bfa5;
}

.sawtooth-left {
    position: absolute;
    left: -5px;
    top: 0;
    height: 100%;
    width: 5px;
    background-image: radial-gradient(circle at 0px 5px, transparent 4px, currentColor 5px);
    background-size: 5px 10px;
}

.ticket-main {
    flex: 1;
    padding: 15px;
    border-left: 1px dashed #eee;
}

.v-title {
    font-weight: 700;
    font-size: 15px;
    color: #1a1a1a;
    margin-bottom: 4px;
}

.v-condition {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 10px;
}

.v-progress-container {
    width: 70%;
    height: 5px;
    background: #f1f5f9;
    border-radius: 10px;
    position: relative;
    margin-bottom: 8px;
}

.v-progress-bar {
    height: 100%;
    background: #FF8C00;
    border-radius: 10px;
}

.v-usage-text {
    font-size: 10px;
    color: #FF8C00;
    position: absolute;
    right: -60px;
    top: -4px;
}

.v-time {
    font-size: 11px;
    color: #94a3b8;
}

.ticket-right {
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 10px;
}

.separator-line {
    position: absolute;
    left: 0;
    top: 15%;
    height: 70%;
    border-left: 1px dashed #eee;
}

.btn-use {
    background: #FF8C00;
    color: #fff;
    border: none;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
}

.is-used {
    filter: grayscale(1);
    opacity: 0.6;
}

.stamp {
    border: 2px solid #94a3b8;
    color: #94a3b8;
    padding: 2px 4px;
    font-weight: 800;
    transform: rotate(-20deg);
    font-size: 10px;
}

.sahara-ticket::before,
.sahara-ticket::after {
    content: "";
    position: absolute;
    left: 95px;
    width: 10px;
    height: 10px;
    background: #f8f9fa;
    border-radius: 50%;
    z-index: 2;
}

.sahara-ticket::before {
    top: -5px;
    box-shadow: inset 0 -1px 2px rgba(0, 0, 0, 0.05);
}

.sahara-ticket::after {
    bottom: -5px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}
</style>
