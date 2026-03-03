import { createWebHistory, createRouter } from "vue-router";

import Home from "../view/Home.vue";
import Cart from "../view/Cart.vue";
import Login from "../view/Login.vue";
import Product from "../view/Product.vue";
import Register from "../view/Register.vue";
import ProductDetail from "../view/ProductDetail.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
