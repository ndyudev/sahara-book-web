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
            <router-link to="/product" class="rec-cta-btn">Xem thêm</router-link>
        </div>

    </section>
</template>

<script setup>

</script>

<style scoped>
.recommendations {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px 24px;
}

.rec-title {
    font-family: var(--font-headline);
    font-weight: 800;
    font-size: 32px;
    color: var(--on-surface);
    position: relative;
}

.rec-grid {
    display: grid;

    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px;
}

.rec-card {
    display: flex;
    flex-direction: column;
    background: transparent;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.rec-card:hover {
    transform: translateY(-5px);
}

.rec-img-wrap {
    background: var(--surface-container-low);
    border-radius: 24px;
    overflow: hidden;
    aspect-ratio: 3/4;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--surface-container-high);
}

.rec-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.rec-card:hover .rec-img {
    transform: scale(1.1);
}


.rec-info {
    padding: 16px 8px;
    text-align: left;
}

.rec-book-title {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 16px;
    color: var(--on-surface);
    margin: 0 0 4px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
    overflow: hidden;
    min-height: 44px;
}

.rec-author {
    font-family: var(--font-body);
    font-weight: 500;
    font-size: 13px;
    color: var(--on-surface-variant);
    margin: 0 0 10px;
}

.rec-price {
    font-family: var(--font-headline);
    font-weight: 800;
    font-size: 18px;
    color: var(--primary-container);
}


.rec-footer {
    display: flex;
    justify-content: center;
    padding-top: 20px;
}

.rec-cta-btn {
    text-decoration: none;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #0b0b0b;
    background: #F3F4F5;
    border: none;
    border-radius: 12px;
    padding: 12px 40px;
    cursor: pointer;
}

.rec-cta-btn:hover {
    background: #EDEEEF;
}
</style>