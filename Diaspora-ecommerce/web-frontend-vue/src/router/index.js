import { createRouter, createWebHistory } from 'vue-router';

// Pages publiques
import Login from '../views/Login.vue';
const Register = () => import('../views/Register.vue');
const Product = () => import('../views/ProductForm.vue');
const Dashboard = () => import('../views/SellerDashboard.vue');



const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/SellerDashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/ProductForm',
    name: 'Product',
    component: Product,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard : redirige vers login si pas de token
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;