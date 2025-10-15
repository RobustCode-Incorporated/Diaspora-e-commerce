import { createRouter, createWebHistory } from 'vue-router';

// 🔹 Pages
import Login from '../views/Login.vue';
const Register = () => import('../views/Register.vue');
const SellerDashboard = () => import('../views/SellerDashboard.vue');
const ProductForm = () => import('../views/ProductForm.vue');

const routes = [
  {
    path: '/',
    redirect: '/login' // 🔹 Redirection par défaut vers login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guestOnly: true }
  },
  {
    path: '/seller-dashboard',
    name: 'SellerDashboard',
    component: SellerDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/product-form',
    name: 'ProductForm',
    component: ProductForm,
    meta: { requiresAuth: true }
  },
  // 🔹 Gestion des pages non trouvées
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🔐 Navigation guard : vérifie l'authentification
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  // 🔹 Si la route requiert une authentification et qu’il n’y a pas de token → redirige vers login
  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' });
  }
  // 🔹 Si l’utilisateur est déjà connecté et essaie d’aller sur login/register → redirige vers dashboard
  else if (to.meta.guestOnly && token) {
    next({ name: 'SellerDashboard' });
  }
  else {
    next();
  }
});

export default router;