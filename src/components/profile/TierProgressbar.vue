<template>
    <div class="sahara-tier-wrap">
        <div class="sahara-tier-track rounded-3">
            <div v-for="tier in tiers" :key="tier.id" class="tier-segment" :style="{ width: tier.width + '%' }">
                <span class="tier-label">{{ tier.name }}</span>
                <div class="tier-fill-inside" :class="{ active: tier.id === currentTierId }"
                    :style="{ width: getFillWidthForSegment(tier) }">
                </div>
                <div class="tier-divider"></div>
            </div>
        </div>

        <div class="sahara-tier-markers mt-1 position-relative" style="height: 20px;">
            <span class="marker position-absolute start-0">0 XP</span>
            <span class="marker position-absolute" style="left: 25%; transform: translateX(-50%);">50 XP</span>
            <span class="marker position-absolute" style="left: 50%; transform: translateX(-50%);">100 XP</span>
            <span class="marker position-absolute" style="left: 75%; transform: translateX(-50%);">500 XP</span>
            <span class="marker position-absolute end-0">1500 XP</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    currentPoints: { type: Number, required: true }
})


const tiers = [
    { id: 1, name: 'Thành viên', maxPoints: 50, width: 25 },
    { id: 2, name: 'Hạng Bạc', maxPoints: 100, width: 25 },
    { id: 3, name: 'Hạng Vàng', maxPoints: 500, width: 25 },
    { id: 4, name: 'Kim Cương', maxPoints: 1500, width: 25 }
]

const currentTierId = computed(() => {
    if (props.currentPoints >= 1500) return 4;
    for (let i = 0; i < tiers.length; i++) {
        if (props.currentPoints < tiers[i].maxPoints) return tiers[i].id;
    }
    return 1;
})

const getFillWidthForSegment = (tier) => {
    if (tier.id < currentTierId.value) return '100%';
    if (tier.id > currentTierId.value) return '0%';

    const previousMax = tier.id === 1 ? 0 : tiers[tier.id - 2].maxPoints;
    const range = tier.maxPoints - previousMax;
    const currentProgress = props.currentPoints - previousMax;
    return Math.min(Math.max((currentProgress / range) * 100, 0), 100) + '%';
}
</script>

<style scoped>
.sahara-tier-wrap {
    font-family: 'Manrope', sans-serif;
    padding: 10px 0;
}

.sahara-tier-track {
    width: 100%;
    height: 48px;
    border: 1px solid rgba(144, 77, 0, 0.15);
    background-color: #fbf7f4;
    display: flex;
    overflow: hidden;
    position: relative;
}

.tier-segment {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}


.tier-label {
    font-weight: 700;
    font-size: 14.5px;
    color: #564334;
    z-index: 10;
    pointer-events: none;
}

.tier-fill-inside {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, #FF8C00 0%, #FFA500 100%);
    transition: width 0.8s cubic-bezier(0.65, 0, 0.35, 1);
    z-index: 5;
}

.tier-segment:not(:last-child):not(:has(.active)) .tier-fill-inside {
    background: #FF8C00;
    opacity: 1;
}

.tier-divider {
    position: absolute;
    top: 0;
    right: -0.5px;
    height: 100%;
    width: 1px;
    background: rgba(144, 77, 0, 0.15);
    z-index: 15;
}

.sahara-tier-markers {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.marker {
    font-size: 12px;
    color: #94a3b8;
    font-weight: 600;
    white-space: nowrap;
}

.marker:first-child {
    text-align: left;
}

.marker:last-child {
    text-align: right;
}
</style>