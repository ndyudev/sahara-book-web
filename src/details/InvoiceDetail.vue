<template>
  <div class="p-2">
    <router-link to="/admin/invoices"
      class="text-decoration-none text-muted d-flex align-items-center gap-1 mb-3 small">
      <span class="material-symbols-outlined fs-6">arrow_back</span> Quay lại danh sách
    </router-link>

    <div class="d-flex justify-content-between align-items-end mb-4">
      <div>
        <h2 class="fw-bold mb-0 text-dark">Hóa đơn: <span class="text-primary">{{ invoice.id }}</span></h2>
      </div>
      <div class="d-flex gap-2">
        <button @click="deleteInvoice" class="btn btn-outline-danger border-0 fw-bold px-3 rounded-3 shadow-sm">
          <span class="material-symbols-outlined fs-5 align-middle me-1">delete</span> Xóa
        </button>
        <button @click="saveInvoice" class="btn btn-primary text-white fw-bold px-4 rounded-3 shadow-sm">
          <span class="material-symbols-outlined fs-5 align-middle me-1">save</span> Lưu thay đổi
        </button>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-8">
        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4">
          <h5 class="fw-bold mb-4 border-start border-primary border-4 ps-2">Thông tin khách hàng</h5>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label small fw-bold text-muted">Tên khách hàng</label>
              <input v-model="invoice.customer" type="text" class="form-control bg-light border-0 py-2">
            </div>
            <div class="col-md-6">
              <label class="form-label small fw-bold text-muted">Mã đơn hàng liên kết</label>
              <input v-model="invoice.orderId" type="text" class="form-control bg-light border-0 py-2">
            </div>
            <div class="col-md-6">
              <label class="form-label small fw-bold text-muted">Số điện thoại khách hàng</label>
              <input v-model="invoice.phone" type="text" class="form-control bg-light border-0 py-2">
            </div>
            <div class="col-md-12">
              <label class="form-label small fw-bold text-muted">Địa chỉ nhận hàng (Ghi chú trên hóa đơn)</label>
              <textarea v-model="invoice.address" class="form-control bg-light border-0 py-2" rows="2"></textarea>
            </div>
          </div>
        </div>

        <div class="card border-0 rounded-4 shadow-sm overflow-hidden">
          <div class="card-header bg-white border-0 p-4 pb-0">
            <h5 class="fw-bold mb-0">Danh mục sản phẩm</h5>
          </div>
          <div class="card-body p-0">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light small text-muted">
                <tr>
                  <th class="ps-4">Sản phẩm</th>
                  <th class="text-center">Số lượng</th>
                  <th class="text-end pe-4">Thành tiền (Chuỗi)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in invoice.items" :key="index">
                  <td class="ps-4 py-3 fw-bold">{{ item.name }}</td>
                  <td class="text-center">x{{ item.quantity }}</td>
                  <td class="text-end pe-4">
                    <input v-model="item.subtotal" type="text"
                      class="form-control form-control-sm border-0 bg-light text-end fw-bold">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card border-0 rounded-4 shadow-sm p-4 mb-4">
          <h5 class="fw-bold mb-4">Thanh toán</h5>

          <div class="mb-3">
            <label class="small fw-bold text-muted">Phương thức</label>
            <select v-model="invoice.method" class="form-select bg-light border-0 py-2">
              <option value="Chuyển khoản">Chuyển khoản</option>
              <option value="COD">Thanh toán khi nhận hàng (COD)</option>
              <option value="Thẻ tín dụng">Thẻ tín dụng</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="small fw-bold text-muted">Tổng cộng (đ)</label>
            <input v-model="invoice.total" type="text"
              class="form-control bg-light border-0 py-2 fw-bold text-primary fs-5">
          </div>

        </div>

        <div class="card border-0 rounded-4 shadow-sm p-4">
          <h5 class="fw-bold mb-3">Trạng thái & Ngày xuất</h5>
          <div class="mb-3">
            <select v-model="invoice.status" class="form-select py-2 fw-bold"
              :class="invoice.status === 'Đã thanh toán' ? 'text-success bg-success bg-opacity-10' : 'text-warning bg-warning bg-opacity-10'">
              <option value="Đã thanh toán">Đã thanh toán</option>
              <option value="Chờ thanh toán">Chờ thanh toán</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>
          <input v-model="invoice.date" type="text" class="form-control bg-light border-0 py-2 small">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceDetail",
  data() {
    return {
      invoice: {
        id: "", orderId: "", customer: "", address: "123 Đường Sahara, Quận 1, TP. HCM",
        date: "", total: "", method: "", status: "", items: []
      }
    };
  },
  mounted() {
    this.fetchInvoice();
  },
  methods: {
    fetchInvoice() {
      const invId = this.$route.params.id;
      const list = JSON.parse(localStorage.getItem('invoices')) || [];
      const found = list.find(i => i.id === invId);

      if (found) {
        this.invoice = { ...found };

        if (!this.invoice.items) {
          this.invoice.items = [
            { name: "Đắc Nhân Tâm", quantity: 1, subtotal: "86.000đ" },
            { name: "Nhà Lãnh Đạo Không Chức Danh", quantity: 1, subtotal: "110.000đ" }
          ];
        }
      }
    },
    saveInvoice() {
      let list = JSON.parse(localStorage.getItem('invoices')) || [];
      const index = list.findIndex(i => i.id === this.invoice.id);

      if (index !== -1) {
        list[index] = this.invoice;
        localStorage.setItem('invoices', JSON.stringify(list));
        alert("Đã cập nhật hóa đơn thành công!");
        this.$router.push('/admin/invoices');
      }
    },
    deleteInvoice() {
      if (confirm(`Bạn có muốn xóa hóa đơn không?`)) {
        let list = JSON.parse(localStorage.getItem('invoices')) || [];
        const newList = list.filter(i => i.id !== this.invoice.id);
        localStorage.setItem('invoices', JSON.stringify(newList));
        alert("Đã xóa hóa đơn!");
        this.$router.push('/admin/invoices');
      }
    }
  }
};
</script>