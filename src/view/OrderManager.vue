<template>
  <div>
    <h3 class="fw-bold mb-4">Danh sách đơn hàng</h3>

    <div class="card border-0 rounded-4 shadow-sm mb-4">
      <div class="card-body p-3 d-flex gap-2 overflow-auto custom-scrollbar">
        <button v-for="tab in tabs" :key="tab" @click="currentTab = tab"
          class="btn px-4 rounded-pill fw-bold border-0 transition-all"
          :class="currentTab === tab ? 'btn-primary text-white shadow-sm' : 'btn-light text-muted'">
          {{ tab }}
        </button>
      </div>
    </div>

    <div class="card border-0 rounded-4 shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light text-muted small text-uppercase">
              <tr>
                <th class="ps-4 py-3">Mã đơn</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th class="text-end pe-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in filteredOrders" :key="order.id">
                <td class="ps-4 fw-bold text-dark">{{ order.id }}</td>
                <td>
                  <div class="fw-bold">{{ order.customer }}</div>
                  <small class="text-muted">{{ order.phone }}</small>
                </td>
                <td class="text-muted">{{ order.date }}</td>
                <td class="fw-bold text-primary">{{ order.total }}</td>
                <td>
                  <span class="badge rounded-pill px-3 py-2 fw-semibold" :class="order.statusClass">
                    {{ order.status }}
                  </span>
                </td>
                <td class="text-end pe-4">
                  <router-link :to="'/admin/orders/' + order.id" class="btn btn-sm btn-light rounded-pill px-3">Chi
                    tiết</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderManager",
  data() {
    return {
      currentTab: "Tất cả",
      tabs: ["Tất cả", "Chờ xác nhận", "Đang giao", "Đã hoàn thành", "Đã hủy"],
      orders: [
        { id: "DH000", customer: "Đường Nhược Huyên", phone: "0963231006", date: "07/05/2025", total: "450.000đ", status: "Chờ xác nhận", statusClass: "bg-warning bg-opacity-10 text-warning" },
        { id: "DH020", customer: "Nguyễn Bích Trâm", phone: "0326007672", date: "13/03/2026", total: "1.250.000đ", status: "Đang giao", statusClass: "bg-info bg-opacity-10 text-info" },
        { id: "DH030", customer: "Nhất Lộ Trường Ca", phone: "0369061023", date: "18/09/2025", total: "230.000đ", status: "Đã giao", statusClass: "bg-success bg-opacity-10 text-success" },
        { id: "DH001", customer: "Châu Nhật Duy", phone: "035849781", date: "26/03/2026", total: "250.000đ", status: "Chờ xác nhận", statusClass: "bg-warning bg-opacity-10 text-warning" },
        { id: "DH002", customer: "Nguyễn Thế Ngữ", phone: "0875694231", date: "25/03/2026", total: "120.000đ", status: "Đang giao", statusClass: "bg-info bg-opacity-10 text-info" },
        { id: "DH003", customer: "Lê Hữu Trọng", phone: "0912645444", date: "24/03/2026", total: "450.000đ", status: "Đã hoàn thành", statusClass: "bg-success bg-opacity-10 text-success" },
        { id: "DH004", customer: "Võ Văn Trọng", phone: "0977256222", date: "23/03/2026", total: "310.000đ", status: "Đã hủy", statusClass: "bg-danger bg-opacity-10 text-danger" },
      ]
    };
  },

  computed: {
    filteredOrders() {
      if (this.currentTab === "Tất cả") return this.orders;
      return this.orders.filter(order => order.status === this.currentTab);
    }
  },

  mounted() {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    } else {
      localStorage.setItem('orders', JSON.stringify(this.orders));
    }
  }

};
</script>