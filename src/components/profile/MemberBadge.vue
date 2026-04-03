<template>
    <div class="member-badge" :class="tierDetails.badgeClass">
        <i :class="tierDetails.icon"></i>
        <span class="badge-text">{{ tierDetails.label }}</span>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    tier: {
        type: String,
        required: true,
    
    }
})


const tierDetails = computed(() => {
    const tierMap = {
        'bronze': { label: 'Thành Viên', icon: 'bi-award', badgeClass: 'badge-bronze' },
        'silver': { label: 'Hạng Bạc', icon: 'bi-award-fill', badgeClass: 'badge-silver' },
        'gold': { label: 'Hạng Vàng', icon: 'bi-star-fill', badgeClass: 'badge-gold' },
        'diamond': { label: 'Kim Cương', icon: 'bi-gem', badgeClass: 'badge-diamond' }
    }
    
    return tierMap[props.tier.toLowerCase()] || tierMap['bronze']
})
</script>

<style scoped>
.member-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 50px;
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 13px;
}

.badge-bronze {
    background: #FFF3E0;
    color: #D97706;
    border: 1px solid #FDE68A;
}

.badge-silver {
    background: #F1F5F9;
    color: #64748B;
    border: 1px solid #E2E8F0;
}

.badge-gold {
    background: #FEF9C3;
    color: #CA8A04;
    border: 1px solid #FEF08A;
}

.badge-diamond {
    background: #ECFEFF;
    color: #0891B2;
    border: 1px solid #CFFAFE;
}
</style>