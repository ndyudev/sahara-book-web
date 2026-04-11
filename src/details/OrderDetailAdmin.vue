<template>
  <div class="p-2">
    <router-link to="/admin/orders" class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3 small">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách đơn hàng
    </router-link>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="fw-bold mb-0">Chi tiết đơn hàng: <span class="text-primary">{{ order.id }}</span></h3>
        <p class="text-muted small mb-0">Ngày đặt: {{ order.date }}</p>
      </div>
      <div class="d-flex gap-2">
        <button @click="printOrder"
          class="btn btn-outline-dark fw-bold d-flex align-items-center gap-2 px-3 rounded-3 shadow-sm border-0 bg-light">
          <span class="material-symbols-outlined fs-5">print</span> In đơn hàng
        </button>
        <span class="badge rounded-pill px-4 py-2 d-flex align-items-center fs-6" :class="order.statusClass">
          {{ order.status }}
        </span>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-8">
        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4">
          <h5 class="fw-bold mb-4 border-start border-primary border-4 ps-2">Thông tin khách hàng</h5>
          <div class="row g-3">
            <div class="col-sm-6">
              <p class="form-label small fw-bold text-muted">Tên khách hàng</p>
              <p class="form-control bg-light border-0 py-2">{{ order.customer }}</p>
            </div>
            <div class="col-sm-6">
              <p class="form-label small fw-bold text-muted">Số điện thoại</p>
              <p class="form-control bg-light border-0 py-2">{{ order.phone }}</p>
            </div>
            <div class="col-sm-12">
              <p class="form-label small fw-bold text-muted">Địa chỉ giao hàng</p>
              <p class="form-control bg-light border-0 py-2">Số 123, Đường Sahara, Phường Bến Nghé, Quận 1, TP. Hồ Chí
                Minh</p>
            </div>
          </div>
        </div>

        <div class="card border-0 rounded-4 shadow-sm overflow-hidden">
          <div class="card-header bg-white border-0 p-4 pb-0">
            <h5 class="fw-bold mb-0">Sản phẩm đã đặt</h5>
          </div>
          <div class="card-body p-0">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light text-muted small">
                <tr>
                  <th class="ps-4 py-3">Tên sách</th>
                  <th class="text-center">Số lượng</th>
                  <th class="text-end">Đơn giá</th>
                  <th class="text-end pe-4">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orderItems" :key="item.name">
                  <td class="ps-4">
                    <div class="d-flex align-items-center gap-3 py-1">
                      <div class="bg-light rounded p-1" style="width: 45px; height: 60px;">
                        <img :src="item.image" class="w-100 h-100 object-fit-cover rounded">
                      </div>
                      <span class="fw-bold">{{ item.name }}</span>
                    </div>
                  </td>
                  <td class="text-center text-muted">x{{ item.qty }}</td>
                  <td class="text-end text-muted">{{ item.price }}</td>
                  <td class="text-end pe-4 fw-bold text-dark">{{ item.subtotal }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4">
          <h5 class="fw-bold mb-4">Tổng kết đơn hàng</h5>
          <div class="d-flex justify-content-between mb-3">
            <span class="text-muted">Tiền hàng</span>
            <span class="fw-bold">{{ order.total }}</span>
          </div>
          <div class="d-flex justify-content-between mb-3">
            <span class="text-muted">Phí vận chuyển</span>
            <span class="text-success fw-bold">Miễn phí</span>
          </div>
          <div class="d-flex justify-content-between mb-3">
            <span class="text-muted">Giảm giá</span>
            <span class="text-danger fw-bold">0đ</span>
          </div>
          <hr class="my-4">
          <div class="d-flex justify-content-between">
            <span class="fw-bold fs-5">Tổng cộng</span>
            <span class="fw-bold fs-4 text-primary">{{ order.total }}</span>
          </div>
        </div>

        <div class="card border-0 rounded-4 shadow-sm p-4">
          <h5 class="fw-bold mb-3">Thanh toán</h5>
          <div class="d-flex align-items-center gap-2 p-3 bg-light rounded-3 mb-3">
            <span class="material-symbols-outlined text-secondary">credit_card</span>
            <span class="fw-bold">Chuyển khoản ngân hàng</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
export default {
  name: "OrderDetailAdmin",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      order: {},
      orderItems: [
        { name: "Đắc Nhân Tâm", qty: 1, price: "86.000đ", subtotal: "86.000đ", image: "https://via.placeholder.com/150" },
        { name: "Sapiens - Lược Sử Loài Người", qty: 1, price: "255.000đ", subtotal: "255.000đ", image: "https://via.placeholder.com/150" }
      ]
    };
  },
  mounted() {
    this.loadOrderDetail();
  },
  methods: {
    loadOrderDetail() {
      const orderId = this.$route.params.id;
      const list = JSON.parse(localStorage.getItem('orders')) || [];
      const found = list.find(o => o.id === orderId);
      if (found) {
        this.order = found;
      } else {
        this.$router.push('/admin/orders');
      }
    },
    printOrder() {
      window.print();
    }
  }
};
</script>