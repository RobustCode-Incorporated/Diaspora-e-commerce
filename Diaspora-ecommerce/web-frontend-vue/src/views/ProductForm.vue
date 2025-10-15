

<template>
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
        <input type="number" id="price" v-model.number="newProduct.price" min="0" step="0.01" required />
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
        <input type="file" id="image" @change="handleImage" accept="image/*" />
        <div v-if="newProduct.imageUrl" class="image-preview">
          <img :src="newProduct.imageUrl" alt="Aperçu de l'image" />
        </div>
      </div>
      <button type="submit" class="submit-btn">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProductForm',
  data() {
    return {
      newProduct: {
        name: '',
        description: '',
        price: null,
        category: '',
        image: null,
        imageUrl: ''
      },
      categories: [
        'Mode',
        'Beauté',
        'Alimentation',
        'Maison',
        'Artisanat',
        'Technologie',
        'Autre'
      ]
    };
  },
  methods: {
    handleImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.newProduct.image = file;
        const reader = new FileReader();
        reader.onload = e => {
          this.newProduct.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.newProduct.image = null;
        this.newProduct.imageUrl = '';
      }
    },
    addProduct() {
      // Ici, vous pouvez envoyer le produit à une API ou le stocker localement
      // Exemple de log :
      console.log('Produit ajouté :', this.newProduct);
      // Réinitialisation du formulaire
      this.newProduct = {
        name: '',
        description: '',
        price: null,
        category: '',
        image: null,
        imageUrl: ''
      };
      // Réinitialiser l'input file
      this.$refs.imageInput && (this.$refs.imageInput.value = '');
    }
  }
};
</script>

<style scoped>
.product-form-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  max-width: 420px;
  margin: 2rem auto;
  padding: 2rem 2.5rem;
}
.product-form-container h2 {
  margin-bottom: 1.5rem;
  color: #222;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
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
}
.image-preview img {
  max-width: 120px;
  max-height: 120px;
  border-radius: 4px;
  border: 1px solid #eee;
}
.submit-btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  margin-top: 0.5rem;
}
.submit-btn:hover {
  background: #2563eb;
}
</style>