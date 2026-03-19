<template>
    <section class="shopping-trends">

        <!-- Header -->
        <div class="trends-header">
            <h2 class="trends-title">Xu hướng mua sắm</h2>
        </div>
        <div class="trends-grid">
            <div class="trend-card">

                <div class="trend-img-wrap">
                    <img class="trend-img" referrerpolicy="no-referrer" />
                    <button class="cart-btn" aria-label="Thêm vào giỏ">
                        <i class="bi bi-bag-plus"></i>
                    </button>
                </div>
                <div class="trend-info">
                    <p class="trend-title"></p>
                    <div class="trend-rating">
                        <i class="bi bi-star-fill star-icon"></i>
                        <span class="rating-value"></span>
                    </div>
                    <p class="trend-price"></p>
                </div>

            </div>
        </div>

        <div class="trends-footer">
            <button class="see-more-btn">Xem thêm</button>
        </div>

    </section>
</template>

<script setup>

</script>

<style scoped>
/* ── Section ── */
.shopping-trends {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    max-width: 1280px;
}

/* ── Header ── */
.trends-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid #E1E3E4;
}

.trends-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    color: #191C1D;
    margin: 0;
}

/* ── Tab Switcher ── */
.tab-switcher {
    display: flex;
    align-items: center;
    gap: 0;
    background: #EDEEEF;
    border-radius: 12px;
    padding: 4px;
}

.tab-btn {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #191C1D;
    background: transparent;
    border: none;
    border-radius: 12px;
    padding: 8px 24px;
    cursor: pointer;
    transition: background .2s, color .2s;
    white-space: nowrap;
}

.tab-btn.active {
    background: #FF8C00;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 700;
}

.trends-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 23.6px;
}

.trend-card {
    display: flex;
    flex-direction: column;
    gap: 0;
    cursor: pointer;
}

.trend-card:hover .cart-btn {
    opacity: 1;
}

.trend-card:hover .trend-img {
    transform: scale(1.05);
}

/* ── Image wrap ── */
.trend-img-wrap {
    position: relative;
    background: #F3F4F5;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 210 / 191;
}

.trend-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .4s ease;
}

/* ── Cart button ── */
.cart-btn {
    position: absolute;
    right: 16px;
    bottom: 16px;
    width: 40px;
    height: 40px;
    background: #FF8C00;
    border: none;
    border-radius: 12px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity .25s ease;
    box-shadow:
        0px 10px 15px -3px rgba(0, 0, 0, 0.1),
        0px 4px 6px -4px rgba(0, 0, 0, 0.1);
}

.trend-info {
    padding: 12px 0 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.trend-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color: #191C1D;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* ── Rating ── */
.trend-rating {
    display: flex;
    align-items: center;
    gap: 8px;
}

.star-icon {
    color: #FF8C00;
    font-size: 10px;
}

.rating-value {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 10px;
    line-height: 15px;
    color: #191C1D;
}

/* ── Price ── */
.trend-price {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #FF8C00;
    margin: 0;
}

/* ── Footer ── */
.trends-footer {
    display: flex;
    justify-content: center;
    padding-top: 16px;
}

.see-more-btn {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #191C1D;
    background: #E1E3E4;
    border: none;
    border-radius: 12px;
    padding: 12px 40px;
    cursor: pointer;
    transition: background .2s;
}

.see-more-btn:hover {
    background: #d0d2d3;
}
</style>