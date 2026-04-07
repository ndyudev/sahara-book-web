<template>
    <div class="reward-card-horizontal" :class="{ 'is-locked': !canRedeem }">
        <div class="card-icon-section">
            <div class="icon-box">
                <i class="bi" :class="canRedeem ? 'bi-gift-fill' : 'bi-lock-fill'"></i>
            </div>
        </div>

        <div class="card-info-section">
            <div class="row-top">
                <h5 class="v-title text-truncate">{{ voucher.title }}</h5>
                <div class="v-cost-badge">
                    <i class="bi bi-coin me-1"></i>
                    <span>{{ voucher.cost }} điểm</span>
                </div>
            </div>

            <div class="row-bottom">
                <div class="v-desc-wrap">
                    <p class="v-desc text-truncate-2">{{ voucher.description }}</p>

                    <div v-if="!canRedeem" class="mini-progress">
                        <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
                    </div>
                    <div v-else class="ready-text">
                        <i class="bi bi-check2-circle"></i> Sẵn sàng đổi
                    </div>
                </div>

                <div class="v-action-wrap">
                    <button class="btn-redeem-sm" :disabled="!canRedeem" @click="handleRedeemVoucher">
                        {{ canRedeem ? 'Đổi ngay' : 'Chưa đủ' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    voucher: {
        type: Object,
        required: true

    },
    userPoints: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['redeem'])

const canRedeem = computed(() => {
    return props.userPoints >= props.voucher.cost;
});


const progressPercent = computed(() => {
    if (props.voucher.cost === 0) return 100;
    const percent = (props.userPoints / props.voucher.cost) * 100;
    return Math.min(percent, 100);
});

const handleRedeemVoucher = () => {
    if (canRedeem.value) {
        emit('redeem', props.voucher.id);
    }
}
</script>

<style scoped>
.reward-card-horizontal {
    display: flex;
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #edf2f7;
    padding: 12px;
    gap: 12px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.reward-card-horizontal:hover {
    border-color: #FF8C00;
    box-shadow: 0 4px 12px rgba(255, 140, 0, 0.1);
}

.card-icon-section {
    flex-shrink: 0;
    display: flex;
    align-items: center;
}

.icon-box {
    width: 52px;
    height: 52px;
    background: #fff7ed;
    color: #FF8C00;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.05);
}

.card-info-section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
}

.row-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.v-title {
    font-size: 15px;
    font-weight: 700;
    color: #1a202c;
    margin: 0;
    padding-right: 8px;
}

.v-cost-badge {
    background: #fef3c7;
    color: #d97706;
    padding: 2px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 800;
    white-space: nowrap;
    display: flex;
    align-items: center;
}

.row-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 12px;
    margin-top: 6px;
}

.v-desc-wrap {
    flex-grow: 1;
    min-width: 0;
}

.v-desc {
    font-size: 12.5px;
    color: #718096;
    margin: 0 0 4px 0;
    line-height: 1.4;
}

.mini-progress {
    height: 6px;
    background: #e2e8f0;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    max-width: 120px;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #FF8C00, #FFA500);
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.ready-text {
    font-size: 11px;
    color: #38a169;
    font-weight: 700;
}

.btn-redeem-sm {
    background: #FF8C00;
    color: white;
    border: none;
    padding: 6px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
}

.btn-redeem-sm:hover:not(:disabled) {
    background: #e67e00;
    transform: translateY(-1px);
}

.btn-redeem-sm:disabled {
    background: #cbd5e0;
    color: #718096;
    cursor: not-allowed;
}

.is-locked {
    background: #f8fafc;
}

.is-locked .icon-box {
    background: #f1f5f9;
    color: #94a3b8;
}

.is-locked .v-cost-badge {
    background: #edf2f7;
    color: #a0aec0;
}

.is-locked .v-title {
    color: #718096;
}
</style>