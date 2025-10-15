<template>
  <div class="register-container">
    <!-- Bloc gauche -->
    <div class="left-panel">
      <img src="../assets/RobustCodelogowhite.png" alt="Logo Diaspora e-Commerce" class="logo" />
      <h1 class="title">Diaspora e-Commerce</h1>
    </div>

    <!-- Bloc droit -->
    <div class="right-panel">
      <h1 class="form-title">Créer un compte Fournisseur</h1>
      <form class="register-form" @submit.prevent="handleRegister">
        
        <div class="form-group">
          <label>Nom</label>
          <input v-model="form.nom" required />
        </div>

        <div class="form-group">
          <label>Prénom</label>
          <input v-model="form.prenom" required />
        </div>

        <div class="form-group">
          <label>Postnom (optionnel)</label>
          <input v-model="form.postnom" />
        </div>

        <div class="form-group">
          <label>Nom d'utilisateur</label>
          <input v-model="form.username" required />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="form.email" required />
        </div>

        <div class="form-group">
          <label>Numéro de téléphone</label>
          <input type="tel" v-model="form.telephone" placeholder="+243 123 456 789" required />
        </div>

        <div class="form-group">
          <label>Mot de passe</label>
          <input type="password" v-model="form.password" required />
        </div>

        <div class="form-group">
          <label>Pays</label>
          <select v-model="form.paysId" required>
            <option value="" disabled>-- Sélectionnez un Pays --</option>
            <option v-for="p in pays" :key="p.id" :value="p.id">
              {{ p.nom }}
            </option>
          </select>
        </div>

        <button type="submit">CRÉER LE COMPTE</button>
      </form>

      <p class="login-text">
        Déjà un compte ?
        <router-link to="/">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const form = ref({
  nom: '',
  prenom: '',
  postnom: '',
  username: '',
  email: '',
  telephone: '',
  password: '',
  paysId: '',
  role: 'admin_general'
})

const pays = ref([])

const handleRegister = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/administrateurs-generaux`, form.value)
    alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.')
    window.location.href = '/'
  } catch (error) {
    console.error('Erreur lors de l’enregistrement :', error)
    alert("Erreur lors de la création du compte.")
  }
}

onMounted(async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/pays`)
    pays.value = res.data
  } catch (error) {
    console.error('Erreur lors du chargement des pays :', error)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ABeeZee&family=Inter&family=Ysabeau+Office&display=swap');

.register-container {
  display: flex;
  height: 100vh;
  font-family: 'ABeeZee', sans-serif;
}

/* Bloc gauche */
.left-panel {
  width: 704px;
  height: 100vh;
  background-color: #0E2C5A;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.logo {
  width: 320px;
  margin-bottom: 30px;
}

.title {
  font-family: 'Ysabeau Office', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 1px;
}

/* Bloc droit */
.right-panel {
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 80px;
}

.form-title {
  margin-top: 40px;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #0E2C5A;
}

.register-form label {
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}

.register-form input, 
.register-form select {
  width: 100%;
  max-width: 300px;
  height: 40px;
  padding: 6px 10px;
  margin-bottom: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: 'ABeeZee', sans-serif;
  font-size: 14px;
  background-color: #fff;
  color: #0E2C5A;
  appearance: none;
  transition: border 0.2s ease-in-out;
}

.register-form select {
  background-image: url("data:image/svg+xml;utf8,<svg fill='%230E2C5A' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: center;
}

.register-form input:focus, 
.register-form select:focus {
  border-color: #104B71;
  outline: none;
}

.register-form button {
  background-color: #104B71;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  height: 45px;
  font-weight: bold;
  letter-spacing: 1px;
  transition: background-color 0.2s ease-in-out;
}

.register-form button:hover {
  background-color: #0d3c5a;
}

.login-text {
  margin-top: 20px;
  text-align: center;
  font-family: 'Apple SD Gothic Neo', sans-serif;
  color: #707070;
}

.login-text a {
  color: #104B71;
  text-decoration: none;
  margin-left: 5px;
}
</style>