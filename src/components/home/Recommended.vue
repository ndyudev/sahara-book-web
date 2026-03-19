<template>
    <section class="recommendations">

        <h2 class="rec-title">Dành cho bạn</h2>

        <div class="rec-grid">
            <div class="rec-card">

                <div class="rec-img-wrap">
                    <img class="rec-img" referrerpolicy="no-referrer" />
                </div>

                <div class="rec-info">
                    <p class="rec-book-title"></p>
                    <p class="rec-author"></p>
                    <p class="rec-price"></p>
                </div>

            </div>
        </div>
        <div class="rec-footer">
            <button class="rec-cta-btn">Xem thêm</button>
        </div>

    </section>
</template>

<script setup>

</script>

<style scoped>
/* ── Section ── */
.recommendations {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    max-width: 1280px;
}

/* ── Title ── */
.rec-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    color: #191C1D;
    margin: 0;
}

/* ── Grid ── */
.rec-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 23.6px;
}

/* ── Card ── */
.rec-card {
    display: flex;
    flex-direction: column;
    gap: 0;
    cursor: pointer;
}

.rec-card:hover .rec-img {
    transform: scale(1.05);
}

/* ── Image ── */
.rec-img-wrap {
    background: #F3F4F5;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 210 / 191;
    width: 100%;
}

.rec-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .4s ease;
}

/* ── Info ── */
.rec-info {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding-top: 16px;
}

.rec-book-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color: #191C1D;
    margin: 0 0 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.rec-author {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 10px;
    line-height: 15px;
    color: #564334;
    margin: 0 0 8px;
}

.rec-price {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #FF8C00;
    margin: 0;
}

/* ── Footer ── */
.rec-footer {
    display: flex;
    justify-content: center;
    padding: 16px 0 48px;
}

.rec-cta-btn {
    position: relative;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);
    background: #FF8C00;
    border: none;
    border-radius: 12px;
    padding: 16px 48px;
    width: 314.67px;
    cursor: pointer;
    box-shadow:
        0px 10px 15px -3px rgba(144, 77, 0, 0.2),
        0px 4px 6px -4px rgba(144, 77, 0, 0.2);
    transition: background .2s, box-shadow .2s;
}

.rec-cta-btn:hover {
    background: #7a4100;
    box-shadow:
        0px 14px 20px -3px rgba(144, 77, 0, 0.3),
        0px 6px 8px -4px rgba(144, 77, 0, 0.3);
}
</style>