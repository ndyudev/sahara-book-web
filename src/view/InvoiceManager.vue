<template>
  <div>
    <h3 class="fw-bold mb-4">Quản lý hóa đơn</h3>

    <div class="card border-0 rounded-4 shadow-sm">
      <div class="card-body p-4 border-bottom">
        <div class="input-group" style="max-width: 350px;">
          <span class="input-group-text bg-light border-0">
            <span class="material-symbols-outlined text-muted fs-5">search</span>
          </span>
          <input v-model="searchQuery" type="text" class="form-control bg-light border-0 ps-0" placeholder="Search...">
        </div>
      </div>

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light text-muted small text-uppercase">
              <tr>
                <th class="ps-4" style="width: 150px;">Mã hóa đơn</th>
                <th>Mã đơn hàng</th>
                <th>Khách hàng</th>
                <th>Ngày xuất</th>
                <th>Tổng tiền</th>
                <th>Thanh toán</th>
                <th>Trạng thái</th>
                <th class="text-end pe-4">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="inv in filteredInvoices" :key="inv.id">
                <td class="ps-4 fw-bold text-dark">{{ inv.id }}</td>
                <td class="text-muted">{{ inv.orderId }}</td>
                <td class="fw-bold">{{ inv.customer }}</td>
                <td>{{ inv.date }}</td>
                <td class="text-primary fw-bold">{{ inv.total }}</td>
                <td>
                  <span class="badge bg-light text-dark border fw-normal">{{ inv.method }}</span>
                </td>
                <td>
                  <span class="badge rounded-pill px-3 py-2"
                    :class="inv.status === 'Đã thanh toán' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'">
                    {{ inv.status }}
                  </span>
                </td>
                <td class="text-end pe-4">
                  <div class="d-flex justify-content-end gap-2">
                    <router-link :to="'/admin/invoices/' + inv.id"
                      class="btn btn-sm btn-light text-dark rounded-pill px-3 fw-bold d-flex align-items-center gap-1 shadow-sm border-0">
                      Chi tiết
                    </router-link>

                    <button @click="deleteInvoice(inv.id)"
                      class="btn btn-sm btn-light text-danger rounded-circle p-2 border-0">
                      <span class="material-symbols-outlined fs-6 d-block">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredInvoices.length === 0">
                <td colspan="8" class="text-center py-5 text-muted">Không tìm thấy hóa đơn nào phù hợp.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import { h } from 'vue';

export default {
  name: "InvoiceManager",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      searchQuery: "",
      invoices: []
    };
  },
  mounted() {
    this.loadInvoices();
  },
  computed: {
    filteredInvoices() {
      const query = this.searchQuery.toLowerCase();
      return this.invoices.filter(inv => {
        return inv.id.toLowerCase().includes(query) ||
          inv.customer.toLowerCase().includes(query) ||
          inv.orderId.toLowerCase().includes(query);
      });
    }
  },
  methods: {
    loadInvoices() {
      const savedInvoices = localStorage.getItem('invoices');
      if (savedInvoices) {
        this.invoices = JSON.parse(savedInvoices);
      } else {
        const defaultData = [
          { id: "INV001", orderId: "DH001", customer: "Châu Nhật Duy", date: "26/03/2026", total: "250.000đ", method: "Chuyển khoản", status: "Đã thanh toán" },
          { id: "INV002", orderId: "DH002", customer: "Nguyễn Thế Ngữ", date: "25/03/2026", total: "120.000đ", method: "COD", status: "Chờ thanh toán" },
          { id: "INV003", orderId: "DH003", customer: "Lê Hữu Trọng", date: "24/03/2026", total: "450.000đ", method: "Chuyển khoản", status: "Đã thanh toán" },
          { id: "INV004", orderId: "DH004", customer: "Võ Văn Trọng", date: "23/03/2026", total: "310.000đ", method: "Chuyển khoản", status: "Đã thanh toán" },
          { id: "INV005", orderId: "DH020", customer: "Nguyễn Bích Trâm", date: "22/03/2026", total: "1.250.000đ", method: "Chuyển khoản", status: "Đã thanh toán" },
        ];
        this.invoices = defaultData;
        localStorage.setItem('invoices', JSON.stringify(defaultData));
      }
    },
    confirmDelete(id) {
      const self = this; // Giữ tham chiếu đến component
      const toastId = this.toast.info({
        component: {
          render() {
            return h('div', { class: 'p-1' }, [
              h('p', { class: 'mb-3 text-white' }, [
                'Bạn có chắc muốn xóa hóa đơn ',
                h('b', id),
                '?'
              ]),
              h('div', { class: 'd-flex gap-2' }, [
                h('button', {
                  class: 'btn btn-sm btn-danger px-3',
                  onClick: () => {
                    self.executeDelete(id);
                    self.toast.dismiss(toastId); // Đóng toast sau khi xóa
                  }
                }, 'Xóa'),
                h('button', {
                  class: 'btn btn-sm btn-light border-0 px-3',
                  onClick: () => self.toast.dismiss(toastId) // Đóng toast khi hủy
                }, 'Hủy')
              ])
            ]);
          }
        }
      }, {
        timeout: 5000, // Tự đóng sau 5s nếu không chọn
        closeOnClick: false
      });
    },
    executeDelete(id) {
      this.invoices = this.invoices.filter(inv => inv.id !== id);
      localStorage.setItem('invoices', JSON.stringify(this.invoices));
      this.toast.success(`Đã xóa hóa đơn ${id} thành công!`);
    }
  }
}
</script>

<style scoped>
.table thead th {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.badge {
  font-weight: 500;
}
</style>