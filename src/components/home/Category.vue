<template>
  <section class="categories-section">

    <div class="categories-header">
      <h2 class="section-title">Danh mục</h2>
      <RouterLink to="/product" class="see-all-link text-decoration-none">
        Xem tất cả
        <i class="bi bi-arrow-right see-all-icon"></i>
      </RouterLink>
    </div>
    <div class="cat-grid">
      <div v-for="cat in categories" :key="cat.id" class="cat-card">
        <img :src="cat.image" :alt="cat.name" class="cat-img" referrerpolicy="no-referrer" />
        <div class="cat-overlay"></div>
        <div class="cat-label">{{ cat.name }}</div>
      </div>
    </div>

  </section>
</template>

<script setup>
const categories = [
  {
    id: 1,
    name: 'Văn học',
  },
  {
    id: 2,
    name: 'Kinh tế',

  },
  {
    id: 3,
    name: 'Tâm lý',

  },
  {
    id: 4,
    name: 'Ngoại ngũ',

  },
]
</script>

<style scoped>
/* ── Section ── */
.categories-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 1280px;
}

/* ── Header ── */
.categories-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

/* ── Title ── */
.section-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  color: #191C1D;
  margin: 0;
}

/* ── See All ── */
.see-all-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #FF8C00;
  transition: gap .2s;
}

.see-all-link:hover {
  gap: 8px;
}

.see-all-icon {
  font-size: 10px;
  transition: transform .2s;
}

.see-all-link:hover .see-all-icon {
  transform: translateX(3px);
}

/* ── Grid ── */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* ── Card ── */
.cat-card {
  position: relative;
  height: 201px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
}

.cat-card:hover .cat-img {
  transform: scale(1.07);
}

.cat-card:hover .cat-overlay {
  opacity: 1;
}

/* ── Image ── */
.cat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .5s ease;
}

/* ── Overlay ── */
.cat-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0) 100%);
  opacity: 0.85;
  transition: opacity .3s;
}

/* ── Label ── */
.cat-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.6);
}
</style>