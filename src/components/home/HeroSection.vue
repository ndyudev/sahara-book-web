<template>
    <section class="hero-gradient rounded-4 overflow-hidden position-relative">
        <div class="radial-overlay"></div>

        <div class="container h-100 position-relative z-1 d-flex align-items-center px-4 px-md-5">
            <div class="row w-100 align-items-center">
                <div class="col-lg-6 animate-fade-left">
                    <span
                        class="badge bg-white bg-opacity-25 text-white px-4 py-2 rounded-pill fw-bold text-uppercase mb-4">
                        New Arrivals
                    </span>

                    <h1 class="display-4 display-md-3 fw-extrabold text-white font-headline lh-tight mb-3">
                        Khám phá một thế giới mới qua từng trang sách
                    </h1>
                    <p class="lead text-white opacity-90 mb-3">
                        Tuyển chọn những cuốn sách hay và truyền cảm hứng nhất từ khắp nơi trên thế giới,
                        mang đến trải nghiệm đọc tuyệt vời ngay tại nhà bạn.
                    </p>
                    <RouterLink :to="`/category/${slug}`"
                        class="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg hover-scale">
                        Khám phá ngay
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

</script>

<style scoped>
.hero-gradient {
    background: linear-gradient(45deg, var(--primary-container), var(--primary));
    width: 100%;
    min-height: 500px;
    max-width: 1280px;
    display: flex;
    align-items: center;


}

/* Overlay radial mờ (tương đương bản gốc) */
.radial-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.4), transparent 70%);
    opacity: 0.2;
    pointer-events: none;
}

/* Style cho ảnh sách */
.book-img {
    width: 320px;
    height: 400px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    border: 8px solid rgba(255, 255, 255, 0.15);
    transition: transform 0.4s ease;
}

.book-img:hover {
    transform: scale(1.04);
}


.animate-fade-left {
    animation: fadeInLeft 0.7s ease-out forwards;
}

.animate-book1 {
    animation: bookTilt1 0.9s ease-out 0.3s forwards;
    top: 80px;
    right: 20px;
}

.animate-book2 {
    animation: bookTilt2 0.9s ease-out 0.5s forwards;
    top: 40px;
    right: 120px;
}

/* Hover scale cho button */
.hover-scale:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(144, 77, 0, 0.3);
}
</style>