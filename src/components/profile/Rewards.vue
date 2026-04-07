<template>
    <div class="rewards-container">
        <div class="rewards-header mb-4">
            <h5 class="fw-bold">Hạng thành viên & Ưu đãi</h5>
            <p class="text-muted small">Tích lũy điểm XP từ mỗi đơn hàng để đổi lấy voucher giá trị.</p>
        </div>

        <div class="row g-4 mb-5">
            <div class="col-md-4">
                <div
                    class="p-4 rounded-4 bg-light border h-100 d-flex flex-column align-items-center justify-content-center">
                    <p class="text-muted small mb-2">Hạng hiện tại</p>
                    <MemberBadge :tier="userTier" />
                </div>
            </div>
            <div class="col-md-8">
                <div class="p-4 rounded-4 bg-light border h-100">
                    <TierProgressBar :currentPoints="currentPoints" :nextTierPoints="2000" nextTierName="Hạng Vàng" />
                </div>
            </div>
        </div>

        <h6 class="fw-bold mb-3">Voucher có thể đổi</h6>
        <div class="reward-grid">
            <RewardCard v-for="item in vouchers" :key="item.id" :voucher="item" :userPoints="currentPoints"
                @redeem="handleRedeemVoucher" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import MemberBadge from './MemberBadge.vue'
import TierProgressBar from './TierProgressBar.vue'
import RewardCard from './RewardsCard.vue'

const toast = useToast()

const currentPoints = ref(500)


const userTier = computed(() => {
    if (currentPoints.value >= 1500) return 'diamond';
    if (currentPoints.value >= 500) return 'gold';
    if (currentPoints.value >= 100) return 'silver';
    return 'bronze';
});

const vouchers = ref([
    { id: 1, title: 'Giảm 20k', description: 'Áp dụng cho đơn từ 100k', cost: 200 },
    { id: 2, title: 'Freeship tối đa 30k', description: 'Tất cả các nhà vận chuyển', cost: 500 },
    { id: 3, title: 'Giảm 10% tổng hóa đơn', description: 'Giảm tối đa 50k', cost: 1000 },
    { id: 4, title: 'Siêu Voucher 100k', description: 'Dành riêng cho khách hàng Silver trở lên', cost: 2500 }
])

const handleRedeemVoucher = (voucherId) => {
    const selectedVoucher = vouchers.value.find(v => v.id === voucherId)


    if (currentPoints.value >= selectedVoucher.cost) {
        currentPoints.value -= selectedVoucher.cost

        toast.success(`Đổi thành công: ${selectedVoucher.title}! Mã đã được lưu vào ví.`);
    } else {
        toast.error("Bạn không đủ điểm tích lũy.")
    }
}
</script>

<style scoped>
.reward-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}
</style>