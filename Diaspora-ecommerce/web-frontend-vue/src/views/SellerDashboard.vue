<template>
  <div class="seller-dashboard-page">
    <!-- Navbar -->
    <nav class="navbar">
      <h1 class="logo">Diaspora e-Commerce</h1>
      <div class="nav-buttons">
        <button class="home-btn" @click="goToDashboard">Accueil</button>
        <button class="logout-btn" @click="logout">Déconnexion</button>
      </div>
    </nav>

    <div class="seller-dashboard">
      <h1 class="page-title">Dashboard Fournisseur</h1>

      <button class="add-btn" @click="goToProductForm">Ajouter un nouveau produit</button>

      <div v-if="products.length === 0" class="no-products">
        <p>Aucun produit trouvé.</p>
      </div>

      <table v-else class="products-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix (€)</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ formatPrice(product.price) }}</td>
            <td>
              <img
                v-if="product.image_url"
                :src="formatImageUrl(product.image_url)"
                alt="Image produit"
                class="product-image"
              />
            </td>
            <td>
              <button class="delete-btn" @click="deleteProduct(product.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const token = localStorage.getItem('token');
const products = ref([]);

// Redirections
const goToProductForm = () => router.push('/product-form');
const goToDashboard = () => router.push('/seller-dashboard');

// 🔹 Déconnexion
const logout = () => {
  localStorage.removeItem('token');
  router.push('/');
};

// 🔹 Récupérer produits
const fetchProducts = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Convertir price en nombre pour éviter .toFixed() error
    products.value = res.data.map(p => ({
      ...p,
      price: Number(p.price)
    }));
  } catch (err) {
    console.error('Erreur lors du chargement des produits :', err.response?.data || err);
  }
};

// 🔹 Supprimer produit
const deleteProduct = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    products.value = products.value.filter(p => p.id !== id);
  } catch (err) {
    console.error('Erreur suppression produit :', err.response?.data || err);
  }
};

// 🔹 Formatter le prix
const formatPrice = (price) => {
  return isNaN(price) ? '-' : price.toFixed(2);
};

// 🔹 Formatter l'URL de l'image
const formatImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${import.meta.env.VITE_API_URL}/${url}`;
};

onMounted(fetchProducts);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ABeeZee&family=Inter&family=Ysabeau+Office&display=swap');

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0E2C5A;
  padding: 15px 30px;
  color: white;
}
.navbar .logo {
  font-family: 'Ysabeau Office', sans-serif;
  font-size: 1.5rem;
}
.nav-buttons {
  display: flex;
  gap: 10px;
}
.home-btn,
.logout-btn {
  background-color: #104B71;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  color: white;
}
.home-btn:hover,
.logout-btn:hover { background-color: #0d3c5a; }

.seller-dashboard {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  font-family: 'ABeeZee', sans-serif;
}

.page-title {
  font-family: 'Ysabeau Office', sans-serif;
  font-size: 28px;
  font-weight: bold;
  color: #0E2C5A;
  margin-bottom: 20px;
  text-align: center;
}

.add-btn {
  background-color: #104B71;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}
.add-btn:hover { background-color: #0d3c5a; }

.products-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
.products-table th,
.products-table td {
  border: 1px solid #ddd;
  padding: 10px;
}
.products-table th { background-color: #f2f2f2; text-align: left; }

.delete-btn {
  background-color: #ff4d4f;
  color: white;
  padding: 5px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.delete-btn:hover { background-color: #d9363e; }

.no-products { margin-top: 20px; font-style: italic; color: #666; }
.product-image { max-width: 60px; max-height: 60px; border-radius: 4px; border: 1px solid #eee; }
</style>