<template>
    <section class="weekly-rankings">

        <h2 class="rankings-title">Xếp hạng hàng tuần</h2>

        <div class="rankings-body">
            <div class="featured-card">
                <div class="featured-top-badge">TOP 1</div>
                <h3 class="featured-book-title"></h3>
                <p class="featured-author">
                </p>
                <div class="featured-img-wrap">
                    <img class="featured-img" referrerpolicy="no-referrer" />
                </div>
                <span class="featured-rank-bg">01</span>
            </div>

            <div class="rankings-right">

                <div class="rank-grid">
                    <div v-for="book in rankings" :key="book.rank" class="rank-card">
                        <span class="rank-number">{{ String(book.rank).padStart(2, '0') }}</span>
                        <div class="rank-info">
                            <p class="rank-book-title"></p>
                            <p class="rank-author"></p>
                        </div>
                    </div>
                </div>
                <div class="cta-banner">
                    <div class="cta-text">
                        <p class="cta-heading">Tác giả mới của tháng</p>
                        <p class="cta-sub">Khám phá những ngôi sao đang lên trong lĩnh vực văn học</p>
                    </div>
                    <button class="cta-btn" aria-label="Xem thêm">
                        <i class="bi bi-arrow-right"></i>
                    </button>
                </div>

            </div>
        </div>

    </section>
</template>

<script setup>


const rankings = [
    { rank: 2 },
    { rank: 3 },
    { rank: 4 },
    { rank: 5 },
]
</script>

<style scoped>
/* ── Section ── */
.weekly-rankings {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    max-width: 1280px;
}

.rankings-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    color: #191C1D;
    margin: 0;
}

/* ── Body layout ── */
.rankings-body {
    display: grid;
    grid-template-columns: 398.67px 1fr;
    height: 600px;
    gap: 24px;
}

@media (max-width: 900px) {
    .rankings-body {
        grid-template-columns: 1fr;
        height: auto;
    }
}

/* ── LEFT: Featured card ── */
.featured-card {
    position: relative;
    background: #F3F4F5;
    border-radius: 32px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
}

.featured-top-badge {
    display: inline-flex;
    align-items: center;
    background: #FF8C00;
    color: rgba(255, 255, 255, 0.6);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    padding: 3.5px 16px;
    border-radius: 12px;
    width: fit-content;
}

.featured-book-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 36px;
    line-height: 40px;
    color: #191C1D;
    margin: 0;
    z-index: 1;
}

.featured-author {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #564334;
    margin: 0;
    z-index: 1;
}

.featured-img-wrap {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: flex-end;
    z-index: 1;
}

.featured-img {
    width: 100%;
    max-height: 256px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Watermark "01" */
.featured-rank-bg {
    position: absolute;
    top: 32px;
    right: 32px;
    font-family: 'Manrope', sans-serif;
    font-weight: 900;
    font-size: 96px;
    line-height: 96px;
    color: #191C1D;
    opacity: 0.05;
    pointer-events: none;
    z-index: 0;
}

/* ── RIGHT ── */
.rankings-right {
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
}

/* ── Rank grid ── */
.rank-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, 1fr);
    gap: 24px;
    flex: 1;
}

.rank-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
    padding: 24px;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid #EDEEEF;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 32px;
    cursor: pointer;
    transition: box-shadow .25s, transform .25s;
}

.rank-card:hover {
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.rank-number {
    font-family: 'Manrope', sans-serif;
    font-weight: 900;
    font-size: 36px;
    line-height: 40px;
    color: #564334;
    opacity: 0.2;
    flex-shrink: 0;
}

.rank-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
}

.rank-book-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #191C1D;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.rank-author {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #564334;
    margin: 0;
}

/* ── CTA Banner ── */
.cta-banner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    background: rgba(255, 140, 0, 0.1);
    border-radius: 32px;
    margin-top: 24px;
}

.cta-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.cta-heading {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    color: #191C1D;
    margin: 0;
}

.cta-sub {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #564334;
    margin: 0;
}

.cta-btn {
    width: 45px;
    height: 45px;
    background: #FF8C00;
    border: none;
    border-radius: 12px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background .2s;
}

.cta-btn:hover {
    background: #7a4100;
}
</style>