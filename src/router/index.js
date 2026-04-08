import { createWebHistory, createRouter } from "vue-router";


import UserLayout from '../layouts/UserLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'


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
import Rewards from "../components/profile/Rewards.vue";
import VoucherWallet from "../components/profile/VoucherWallet.vue"




import AdminDashboard from '../view/AdminDashboard.vue'
import BookManager from '../view/BookManager.vue'
import BookCreate from '../view/BookCreate.vue'
import CategoryManager from '../view/CategoryManager.vue'
import CategoryCreate from '../view/CategoryCreate.vue'
import OrderManager from '../view/OrderManager.vue'
import InvoiceManager from '../view/InvoiceManager.vue'
import UserManager from '../view/UserManager.vue'
import UserCreate from '../view/UserCreate.vue'


import UserDetail from '../details/UserDetail.vue'
import CategoryDetail from '../details/CategoryDetail.vue'
import BookDetail from '../details/BookDetail.vue'
import InvoiceDetail from '../details/InvoiceDetail.vue'
import OrderDetailAdmin from '../details/OrderDetailAdmin.vue'

const routes = [

  {
    path: "/",
    component: UserLayout,
    children: [
      { path: "", name: "Home", component: Home },
      { path: "cart", name: "Cart", component: Cart },
      { path: "login", name: "Login", component: Login },
      { path: "product", name: "Product", component: Product },
      { path: "register", name: "Register", component: Register },
      { path: "product/:id", name: "ProductDetail", component: ProductDetail },
      { path: "checkout", name: "Checkout", component: Checkout, meta: { requiresAuth: true } },
      {
        path: "profile",
        name: "profile",
        component: Profile,
        meta: { requiresAuth: true },
        children: [
          { path: '', name: 'personnal-info', component: PersonInfo },
          { path: 'addresses', name: 'profile-addresses', component: Addresses },
          { path: 'orders', name: 'profile-orders', component: Orders },
          { path: 'orders/:id', name: 'order-detail', component: OrderDetail },
          { path: 'wishlist', name: 'profile-wishlist', component: Wishlist },
          { path: 'rewards', name: 'profile-rewards', component: Rewards },
          { path: 'wallet', name: 'profile-wallet', component: VoucherWallet }
        ]
      }
    ]
  },


  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', name: 'Dashboard', component: AdminDashboard },
      { path: 'books', name: 'BookManager', component: BookManager },
      { path: 'books/create', name: 'BookCreate', component: BookCreate },
      { path: 'books/:id', name: 'BookDetail', component: BookDetail },
      { path: 'categories', name: 'CategoryManager', component: CategoryManager },
      { path: 'categories/create', name: 'CategoryCreate', component: CategoryCreate },
      { path: 'categories/:id', name: 'CategoryDetail', component: CategoryDetail },
      { path: 'orders', name: 'OrderManager', component: OrderManager },
      { path: 'orders/:id', name: 'OrderDetailAdmin', component: OrderDetailAdmin },
      { path: 'invoices', name: 'InvoiceManager', component: InvoiceManager },
      { path: 'invoices/:id', name: 'InvoiceDetail', component: InvoiceDetail },
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