import { createWebHistory, createRouter } from "vue-router";

import Home from "../view/Home.vue";
import Cart from "../view/Cart.vue";
import Login from "../view/Login.vue";
import Product from "../view/Product.vue";
import Register from "../view/Register.vue";
import ProductDetail from "../view/ProductDetail.vue";
import Checkout from "../view/Checkout.vue";
import Profile from "../view/Profile.vue";
import PersonInfo from "../components/profile/PersonInfo.vue";
import Addresses from "../components/profile/Addresses.vue";
import Orders from "../components/profile/Orders.vue";
import OrderDetail from "../components/profile/OrderDetail.vue";
import Wishlist from "../components/profile/Wishlist.vue";

// import admin
import AdminLayout from '../layouts/AdminLayout.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import BookManager from '../views/BookManager.vue'
import BookCreate from '../views/BookCreate.vue'
import CategoryManager from '../views/CategoryManager.vue'
import CategoryCreate from '../views/CategoryCreate.vue'
import AuthorManager from '../views/AuthorManager.vue'
import AuthorCreate from '../views/AuthorCreate.vue'
import OrderManager from '../views/OrderManager.vue'
import InvoiceManager from '../views/InvoiceManager.vue'
import UserManager from '../views/UserManager.vue'
import UserCreate from '../views/UserCreate.vue'

// trang chi tiết admin
import UserDetail from '../details/UserDetail.vue'
import AuthorDetail from '../details/AuthorDetail.vue'
import CategoryDetail from '../details/CategoryDetail.vue'
import BookDetail from '../details/BookDetail.vue'
import InvoiceDetail from '../details/InvoiceDetail.vue'
import OrderDetailAdmin from '../details/OrderDetailAdmin.vue'


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true },
    children: [
      {
        path: '', name: 'personnal-info',
        component: PersonInfo,
      },
      {
        path: 'addresses', name: 'profile-addresses',
        component: Addresses,
      },
      {
        path: 'orders', name: 'profile-orders',
        component: Orders
      },
      {
        path: 'orders/:id', name: 'order-detail',
        component: OrderDetail,
      },
      {
        path: 'wishlist', name: 'profile-wishlist',
        component: Wishlist,
      }
    ]

  },



  // router admin
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', name: 'Dashboard', component: AdminDashboard },
      
      // Quản lý Sách
      { path: 'books', name: 'BookManager', component: BookManager },
      { path: 'books/create', name: 'BookCreate', component: BookCreate },
      { path: 'books/:id', name: 'BookDetail', component: BookDetail },

      // Quản lý Danh mục
      { path: 'categories', name: 'CategoryManager', component: CategoryManager },
      { path: 'categories/create', name: 'CategoryCreate', component: CategoryCreate },
      { path: 'categories/:id', name: 'CategoryDetail', component: CategoryDetail },

      // Quản lý Tác giả
      { path: 'authors', name: 'AuthorManager', component: AuthorManager },
      { path: 'authors/create', name: 'AuthorCreate', component: AuthorCreate },
      { path: 'authors/:id', name: 'AuthorDetail', component: AuthorDetail },

      // Quản lý Đơn hàng & Hóa đơn
      { path: 'orders', name: 'OrderManager', component: OrderManager },
      { path: 'orders/:id', name: 'OrderDetailAdmin', component: OrderDetailAdmin }, // Đã đổi tên route
      { path: 'invoices', name: 'InvoiceManager', component: InvoiceManager },
      { path: 'invoices/:id', name: 'InvoiceDetail', component: InvoiceDetail },

      // Quản lý Khách hàng
      { path: 'users', name: 'UserManager', component: UserManager },
      { path: 'users/create', name: 'UserCreate', component: UserCreate },
      { path: 'users/:id', name: 'UserDetail', component: UserDetail }
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
