<template>
    <section class="recommendations">
        <h2 class="rec-title">Dành cho bạn</h2>

        <div class="rec-grid">
            <div v-for="book in recommendedBooks" :key="book.id" class="rec-card" @click="viewDetail(book.id)">
                <div class="rec-img-wrap">
                    <img :src="book.imageUrl || 'https://images.unsplash.com/photo-1543004218-ee14110497f8?q=80&w=1000&auto=format&fit=crop'"
                        :alt="book.title" class="rec-img" referrerpolicy="no-referrer" />
                </div>
                <div class="rec-info">
                    <p class="rec-book-title">{{ book.title }}</p>
                    <p class="rec-author">{{ book.author }}</p>
                    <div class="d-flex align-items-center gap-2">
                        <p class="rec-price mb-0">{{ formatPrice(book.price) }}</p>
                        <span v-if="book.discountPercent > 0" class="badge bg-danger-subtle text-danger small">
                            -{{ book.discountPercent }}%
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="rec-footer">
            <router-link to="/product" class="rec-cta-btn">Xem thêm</router-link>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import api from '../../api/api';

const router = useRouter();
const toast = useToast();
const recommendedBooks = ref([]);
const loading = ref(false);

const fetchData = async () => {
    loading.value = true;
    try {
        const response = await api.get('/api/v1/books', {
            params: { isFeatured: true, size: 5 }
        });
        recommendedBooks.value = response.data.result.content || response.data.result || [];
    } catch (error) {
        toast.error("Lỗi lấy dữ liệu:", error);
    } finally {
        loading.value = false;
    }
};
const formatPrice = (b) => {
    return (b || 0).toLocaleString('vi-VN') + 'đ';
};

const viewDetail = (id) => {
    router.push(`/product/${id}`);
};

onMounted(() => {
    fetchData();
})
</script>

<style scoped>
.recommendations {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 60px 24px;
}

.rec-title {
    font-weight: 800;
    font-size: 32px;
    color: #1e293b;
    margin-bottom: 0;
}

.rec-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 30px;
}

.rec-card {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
}

.rec-img-wrap {
    background: #f8fafc;
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 3/4;
    border: 1px solid #e2e8f0;
}

.rec-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.rec-card:hover .rec-img {
    transform: scale(1.08);
}

.rec-info {
    padding: 16px 4px;
}

.rec-book-title {
    font-weight: 700;
    font-size: 16px;
    color: #1e293b;
    margin: 0 0 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 44px;
}

.rec-author {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 8px;
}

.rec-price {
    font-weight: 800;
    font-size: 18px;
    color: #f59e0b;
}

.rec-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 32px;
}

.rec-cta-btn {
    text-decoration: none;
    font-weight: 700;
    color: #1e293b;
    background: #f1f5f9;
    padding: 12px 48px;
    border-radius: 12px;
    transition: all 0.2s;
}

.rec-cta-btn:hover {
    background: #e2e8f0;
    transform: scale(1.05);
}
</style>