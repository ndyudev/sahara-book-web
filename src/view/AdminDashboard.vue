

<template>

  <div class="p-4">
    <div class="row g-4 mb-4">
      <div class="col-md-6">
        <div class="card bg-primary text-white p-4 border-0 rounded-4 shadow-sm">
          <small class="opacity-75">DOANH THU THÁNG NÀY</small>
          <h2 class="fw-bold">128.450.000đ</h2>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-4 border-0 rounded-4 shadow-sm h-100">
          <span class="material-symbols-outlined text-warning fs-1 mb-2">shopping_cart</span>
          <small class="text-muted">Đơn hàng mới</small>
          <h4 class="fw-bold">1,240</h4>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-4 border-0 rounded-4 shadow-sm h-100">
          <span class="material-symbols-outlined text-success fs-1 mb-2">group</span>
          <small class="text-muted">Người dùng mới</small>
          <h4 class="fw-bold">856</h4>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-7">
        <div class="card border-0 rounded-4 shadow-sm p-4">
          <h6 class="text-muted fw-bold mb-4">DOANH THU</h6>
          <div style="height: 300px;"><Line :data="revenueData" :options="chartOptions" /></div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="card border-0 rounded-4 shadow-sm p-4">
          <h6 class="text-muted fw-bold mb-4">Sách đã bán </h6>
          <div style="height: 300px;"><Bar :data="salesCompareData" :options="chartOptions" /></div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card border-0 rounded-4 shadow-sm p-4">
          <h6 class="text-muted fw-bold mb-4">NGƯỜI DÙNG MỚI</h6>
          <div style="height: 250px;"><Bar :data="userData" :options="chartOptions" /></div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 rounded-4 shadow-sm p-4">
          <h6 class="text-muted fw-bold mb-4">Danh mục sách</h6>
          <div style="height: 250px;"><Doughnut :data="bookStatsData" :options="chartOptions" /></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, 
  LinearScale, PointElement, LineElement, ArcElement
} from 'chart.js'
import { Bar, Line, Doughnut } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement)

export default {
  name: "DashboardHome",
  components: { Bar, Line, Doughnut }, 
  data() {
    return {

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      },
      
      revenueData: {
        labels: ['T10', 'T11', 'T12', 'T1', 'T2', 'T3'],
        datasets: [{ label: 'Doanh thu', backgroundColor: '#0d6efd', borderColor: '#0d6efd', data: [85, 92, 110, 95, 128, 145], tension: 0.3 }]
      },
      salesCompareData: {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [
          { label: 'Tuần trước', backgroundColor: '#e9ecef', data: [20, 35, 40, 30, 45, 60, 55] },
          { label: 'Tuần này', backgroundColor: '#ffb27a', data: [25, 40, 35, 45, 50, 75, 80] }
        ]
      },
      userData: {
        labels: ['T1', 'T2', 'T3'],
        datasets: [{ label: 'Người dùng', backgroundColor: '#198754', data: [450, 620, 856] }]
      },
      bookStatsData: {
        labels: ['Văn học', 'Kinh tế', 'Tâm lý', 'Khoa học', 'Khác'],
        datasets: [{ backgroundColor: ['#0d6efd', '#ffb27a', '#198754', '#ffc107', '#adb5bd'], data: [50, 30, 45, 20, 15] }]
      }
    }
  }
};
</script>