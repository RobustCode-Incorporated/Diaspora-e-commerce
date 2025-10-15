<template>
  <div class="seller-dashboard">
    <h1>Dashboard Vendeur</h1>

    <button @click="showAddProductModal = true">Ajouter un nouveau produit</button>

    <div v-if="products.length === 0" class="no-products">
      <p>Aucun produit trouvé.</p>
    </div>

    <table v-else class="products-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Prix (€)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price.toFixed(2) }}</td>
          <td>
            <button @click="deleteProduct(product.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showAddProductModal" class="modal-overlay" @click.self="closeAddProductModal">
      <div class="modal-content">
        <h2>Ajouter un produit</h2>
        <form @submit.prevent="addProduct">
          <div class="form-group">
            <label for="name">Nom:</label>
            <input id="name" v-model="newProduct.name" type="text" required />
          </div>

          <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" v-model="newProduct.description" required></textarea>
          </div>

          <div class="form-group">
            <label for="price">Prix (€):</label>
            <input id="price" v-model.number="newProduct.price" type="number" min="0" step="0.01" required />
          </div>

          <div class="form-actions">
            <button type="submit">Ajouter</button>
            <button type="button" @click="closeAddProductModal">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SellerDashboard',
  data() {
    return {
      products: [
        // Exemple de produits initiaux
        { id: 1, name: 'Produit A', description: 'Description du produit A', price: 10.0 },
        { id: 2, name: 'Produit B', description: 'Description du produit B', price: 20.5 }
      ],
      showAddProductModal: false,
      newProduct: {
        name: '',
        description: '',
        price: null
      },
      nextProductId: 3
    };
  },
  methods: {
    addProduct() {
      if (!this.newProduct.name || !this.newProduct.description || this.newProduct.price === null) {
        return;
      }
      const product = {
        id: this.nextProductId++,
        name: this.newProduct.name,
        description: this.newProduct.description,
        price: this.newProduct.price
      };
      this.products.push(product);
      this.resetNewProduct();
      this.showAddProductModal = false;
    },
    deleteProduct(id) {
      this.products = this.products.filter(product => product.id !== id);
    },
    closeAddProductModal() {
      this.resetNewProduct();
      this.showAddProductModal = false;
    },
    resetNewProduct() {
      this.newProduct = {
        name: '',
        description: '',
        price: null
      };
    }
  }
};
</script>

<style scoped>
.seller-dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.products-table th,
.products-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.products-table th {
  background-color: #f2f2f2;
  text-align: left;
}

button {
  cursor: pointer;
  padding: 6px 12px;
  margin: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

.no-products {
  margin-top: 20px;
  font-style: italic;
  color: #666;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.form-actions button:first-child {
  margin-right: 10px;
}
</style>
