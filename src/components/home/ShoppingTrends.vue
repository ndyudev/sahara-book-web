<<template>
    <section class="shopping-trends">
        <div class="trends-header">
            <h2 class="trends-title">Xu hướng mua sắm</h2>

            <div class="tab-switcher">
                <button v-for="tab in tabs" :key="tab.value" class="tab-btn"
                    :class="{ active: currentTab === tab.value }" @click="currentTab = tab.value">
                    {{ tab.label }}
                </button>
            </div>
        </div>

        <div class="trends-grid">
            <div v-for="book in trendBooks" :key="book.bookId" class="trend-card" @click="goToDetail(book.bookId)">
                <div class="trend-img-wrap">
                    <img :src="book.imageUrl || 'https://via.placeholder.com/210x191'" class="trend-img"
                        :alt="book.title" referrerpolicy="no-referrer" />
                    <button class="cart-btn" @click.stop="addToCart(book)">
                        <i class="bi bi-bag-plus"></i>
                    </button>
                </div>
                <div class="trend-info">
                    <p class="trend-title" :title="book.title">{{ book.title }}</p>
                    <div class="trend-rating">
                        <i class="bi bi-star-fill star-icon"></i>
                        <span class="rating-value">{{ book.rating || 5 }} ({{ book.reviewCount || 0 }})</span>
                    </div>
                    <p class="trend-price">{{ formatPrice(book.price) }}</p>
                </div>
            </div>
        </div>

        <div class="trends-footer">
            <router-link to="/product" class="see-more-btn">Xem thêm</router-link>
        </div>
    </section>
</template>

    <script setup>
    import { ref, watch, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';
    import api from '../../api/api'

    const router = useRouter();
    const toast = useToast();

    const currentTab = ref('BESTSELLER');
    const trendBooks = ref([]);
    const loading = ref(false)

    const tabs = [
        { label: 'Bán chạy', value: 'BESTSELLER' },
        { label: 'Mới về', value: 'NEW' },
        { label: 'Thịnh hành', value: 'HOT' }
    ];

    const fetchData = async () => {
        loading.value = true;
        try {

            const response = await api.get('/api/v1/books', {
                params: {
                    badge: currentTab.value,
                    size: 5
                }
            });

            trendBooks.value = response.data.result.content || response.data.result || [];
        } catch (error) {
            console.error("Lỗi lấy dữ liệu xu hướng:", error);
            toast.error("Không thể tải dữ liệu xu hướng");
        } finally {
            loading.value = false;
        }
    };

    watch(currentTab, () => {
        fetchData();
    });

    const formatPrice = (b) => b.toLocaleString('vi-VN') + 'đ';

    const goToDetail = (id) => router.push(`/product/${id}`);

    const addToCart = (b) => {
        const cartData = localStorage.getItem('cart');
        let cart = cartData ? JSON.parse(cartData) : [];

        const index = cart.findIndex(item => item.bookId === book.bookId);

        if (index !== -1) {
            cart[index].quantity += 1;
        } else {
            cart.push({
                bookId: book.bookId,
                title: book.title,
                price: book.price,
                image: book.imageUrl,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('storage'));
        toast.success(`Đã thêm "${book.title}" vào giỏ hàng!`);
    };

    onMounted(() => {
        fetchData();
    });
</script>
    <style scoped>
    .shopping-trends {
        display: flex;
        flex-direction: column;
        gap: 32px;
        width: 100%;
        max-width: 1280px;
    }

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

    .trend-price {
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #FF8C00;
        margin: 0;
    }

    .trends-footer {
        display: flex;
        justify-content: center;
        padding-top: 16px;
    }

    .see-more-btn {
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

    .see-more-btn:hover {
        background: #EDEEEF;
    }
</style>