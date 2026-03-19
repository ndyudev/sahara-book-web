<template>
    <section class="flash-sale-section section-background">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="d-flex align-items-center gap-3">
                <h2 class="section-title mb-0">Flash Sale</h2>
                <div class="countdown">
                    <div class="time-block"><span>02</span></div>
                    <span class="colon">:</span>
                    <div class="time-block"><span>45</span></div>
                    <span class="colon">:</span>
                    <div class="time-block"><span>12</span></div>
                </div>
            </div>
            <a href="#" class="see-all-link d-flex align-items-center gap-1 text-decoration-none">
                Xem tất cả
                <i class="bi bi-arrow-right see-all-icon"></i>
            </a>
        </div>

        <div class="row g-3">
            <div class="col-6 col-md-3 col-lg-2-4">
                <div class="book-card">

                    <div class="book-img-wrap">
                        <img  class="book-img" referrerpolicy="no-referrer" />
                        <div class="book-overlay"></div>
                        <div class="discount-badge"></div>
                    </div>

                    <div class="book-info">
                        <p class="book-title"></p>
                        <p class="book-author"></p>
                        <div class="book-prices">
                            <span class="price-sale"></span>
                            <span class="price-original"></span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </section>
</template>

<script setup>

</script>

<style scoped>
.section-background {
    background-color: #FFDCC3;
    width: 100%;
    max-width: 1280px;
    min-height: 413px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 40px;
    border-radius: 30px;

}

.section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--text, #0f172a);
    letter-spacing: -.02em;
}

.countdown {
    display: flex;
    align-items: center;
    gap: .25rem;
}

.time-block {
    background: #ef4444;
    color: #fff;
    border-radius: 6px;
    padding: .15rem .45rem;
    min-width: 32px;
    text-align: center;
}

.time-block span {
    font-family: 'DM Sans', sans-serif;
    font-size: .8rem;
    font-weight: 700;
    letter-spacing: .05em;
}

.colon {
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem;
    font-weight: 800;
    color: #ef4444;
    line-height: 1;
}

.see-all-link {
    font-family: 'DM Sans', sans-serif;
    font-size: .875rem;
    font-weight: 700;
    color: var(--primary, #2563eb);
    transition: gap .2s;
}

.see-all-link:hover {
    gap: .4rem !important;
}

.see-all-icon {
    transition: transform .2s;
}

.see-all-link:hover .see-all-icon {
    transform: translateX(3px);
}

/* ── 5 columns on large screen ── */
@media (min-width: 992px) {
    .col-lg-2-4 {
        flex: 0 0 20%;
        max-width: 20%;
    }
}

/* ── Card ── */
.book-card {
    width: 100%;
    max-width: 193px;
    min-height: 245px;
    margin: 0 auto;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.60);
    box-shadow: 0 4px 16px rgba(15, 23, 42, .10);
    transition: transform .3s ease, box-shadow .3s ease;
    display: flex;
    flex-direction: column;
}

.book-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 36px rgba(15, 23, 42, .16);
}

/* ── Image ── */
.book-img-wrap {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    width: 100%;
}

.book-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .5s ease;
    display: block;
}

.book-card:hover .book-img {
    transform: scale(1.07);
}

.book-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom,
            transparent 50%,
            rgba(15, 23, 42, 0.45) 100%);
}

.discount-badge {
    position: absolute;
    top: .6rem;
    left: .6rem;
    background: #ef4444;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: .7rem;
    font-weight: 800;
    padding: .2rem .45rem;
    border-radius: 6px;
    letter-spacing: .02em;
}

.book-info {
    padding: .65rem .75rem .75rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.book-title {
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 .15rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.book-author {
    font-family: 'DM Sans', sans-serif;
    font-size: .75rem;
    color: #64748b;
    margin: 0 0 .5rem;
}

.book-prices {
    display: flex;
    align-items: baseline;
    gap: .4rem;
}

.price-sale {
    font-family: 'DM Sans', sans-serif;
    font-size: .875rem;
    font-weight: 800;
    color: #ef4444;
}

.price-original {
    font-family: 'DM Sans', sans-serif;
    font-size: .75rem;
    color: #94a3b8;
    text-decoration: line-through;
}
</style>