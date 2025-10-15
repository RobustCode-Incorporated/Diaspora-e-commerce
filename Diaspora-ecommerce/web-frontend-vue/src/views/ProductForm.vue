<template>
  <div class="product-form-page">
    <!-- ✅ Navbar -->
    <nav class="navbar">
      <h1 class="logo">Diaspora e-Commerce</h1>
      <button class="home-btn" @click="goToDashboard">Accueil</button>
    </nav>

    <!-- ✅ Formulaire d’ajout de produit -->
    <div class="product-form-container">
      <h2>Ajouter un produit</h2>
      <form @submit.prevent="addProduct" class="product-form">
        <div class="form-group">
          <label for="name">Nom</label>
          <input type="text" id="name" v-model="newProduct.name" required />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="newProduct.description" required></textarea>
        </div>

        <div class="form-group">
          <label for="price">Prix (€)</label>
          <input
            type="number"
            id="price"
            v-model.number="newProduct.price"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div class="form-group">
          <label for="category">Catégorie</label>
          <select id="category" v-model="newProduct.category" required>
            <option value="" disabled>Choisir une catégorie</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="image">Image</label>
          <input
            type="file"
            id="image"
            ref="imageInput"
            @change="handleImage"
            accept="image/*"
          />
          <div v-if="newProduct.imageUrl" class="image-preview">
            <img :src="newProduct.imageUrl" alt="Aperçu de l'image" />
          </div>
        </div>

        <button type="submit" class="submit-btn">Ajouter</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Router pour la navigation
const router = useRouter();

// Token de connexion du fournisseur
const token = localStorage.getItem('token');

// Données du produit
const newProduct = ref({
  name: '',
  description: '',
  price: null,
  category: '',
  image: null,
  imageUrl: ''
});

// Catégories disponibles
const categories = [
  'Mode',
  'Beauté',
  'Alimentation',
  'Maison',
  'Artisanat',
  'Technologie',
  'Autre'
];

// 🔹 Revenir à la page d’accueil du vendeur
const goToDashboard = () => {
  router.push('/seller-dashboard');
};

// 🔹 Gestion de l’image locale (preview)
const handleImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    newProduct.value.image = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      newProduct.value.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    newProduct.value.image = null;
    newProduct.value.imageUrl = '';
  }
};

// 🔹 Ajouter un produit au backend
const addProduct = async () => {
  try {
    if (!newProduct.value.name || !newProduct.value.description || !newProduct.value.price) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.value.name);
    formData.append('description', newProduct.value.description);
    formData.append('price', newProduct.value.price);
    if (newProduct.value.category) formData.append('category', newProduct.value.category);
    if (newProduct.value.image) formData.append('image', newProduct.value.image);

    console.log('✅ Données envoyées au backend :');
    for (let pair of formData.entries()) console.log(pair[0], pair[1]);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/products`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    console.log('✅ Produit ajouté avec succès :', res.data);
    alert('Produit ajouté avec succès !');
    router.push('/seller-dashboard');
  } catch (err) {
    console.error('❌ Erreur ajout produit :', err.response?.data || err);
    alert(err.response?.data?.message || 'Erreur lors de l’ajout du produit.');
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ABeeZee&family=Inter&family=Ysabeau+Office&display=swap');

.product-form-page {
  font-family: 'ABeeZee', sans-serif;
  background-color: #f9fafc;
  min-height: 100vh;
}

/* 🔹 Navbar */
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
  font-weight: bold;
}

.home-btn {
  background-color: #104B71;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  color: white;
}

.home-btn:hover {
  background-color: #0d3c5a;
}

/* 🔹 Formulaire */
.product-form-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem 2.5rem;
}

.product-form-container h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  color: #0E2C5A;
  font-weight: bold;
}

.product-form .form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

.product-form label {
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: #333;
}

.product-form input[type="text"],
.product-form input[type="number"],
.product-form textarea,
.product-form select {
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  padding: 0.5rem 0.7rem;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}

.product-form input[type="text"]:focus,
.product-form input[type="number"]:focus,
.product-form textarea:focus,
.product-form select:focus {
  border-color: #3b82f6;
}

.product-form textarea {
  min-height: 60px;
  resize: vertical;
}

.product-form input[type="file"] {
  margin-top: 0.2rem;
}

.image-preview {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
}

.image-preview img {
  max-width: 150px;
  max-height: 150px;
  border-radius: 4px;
  border: 1px solid #eee;
}

.submit-btn {
  background: #104B71;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  margin-top: 1rem;
}

.submit-btn:hover {
  background: #0d3c5a;
}
</style>