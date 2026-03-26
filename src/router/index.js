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

  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
