<template>
  <div class="login-container">
    <!-- Bloc gauche -->
    <div class="left-panel">
      <img src="../assets/RobustCodelogowhite.png" alt="Diaspora e-Commerce" class="logo" />
      <h1 class="title">Diaspora e-Commerce</h1>
    </div>

    <!-- Bloc droit -->
    <div class="right-panel">
      <h1 class="form-title">Connexion Fournisseur</h1>
      <form class="login-form" @submit.prevent="handleLogin">
        <label>Email</label>
        <input type="email" v-model="credentials.email" placeholder="Email" required />

        <label>Mot de passe</label>
        <input type="password" v-model="credentials.password" placeholder="Mot de passe" required />

        <button type="submit">SE CONNECTER</button>
      </form>

      <p class="register-text">
        Pas encore de compte ?
        <router-link to="/register">S’enregistrer</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const credentials = ref({
  email: '',
  password: ''
});

// 🔹 Fonction de connexion
const handleLogin = async () => {
  // Vérifier que les champs sont remplis
  if (!credentials.value.email || !credentials.value.password) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  try {
    console.log('Tentative de connexion avec :', credentials.value);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/fournisseurs/login`,
      credentials.value
    );

    // Vérifier que le token est présent
    if (res.data?.token) {
      localStorage.setItem('token', res.data.token);
      console.log('✅ Connexion réussie, token stocké.');

      // Redirection vers dashboard fournisseur
      router.push('/seller-dashboard');
    } else {
      alert('Erreur : token non reçu.');
      console.error('Token manquant dans la réponse :', res.data);
    }
  } catch (err) {
    console.error('❌ Erreur login fournisseur:', err.response?.data || err);
    alert(err.response?.data?.message || 'Échec de la connexion. Vérifiez vos identifiants.');
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ABeeZee&family=Inter&family=Ysabeau+Office&display=swap');

.login-container {
  display: flex;
  height: 100vh;
  font-family: 'ABeeZee', sans-serif;
}

/* Bloc gauche (branding) */
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

/* Bloc droit (formulaire) */
.right-panel {
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 80px;
}

.form-title {
  font-size: 26px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 28px;
  color: #0E2C5A;
  text-align: center;
  line-height: 1.4;
}

.login-form label {
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}

.login-form input {
  width: 437px;
  height: 50px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'ABeeZee', sans-serif;
}

.login-form button {
  background-color: #104B71;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  width: 437px;
  height: 70px;
  font-weight: bold;
  letter-spacing: 1px;
  transition: background-color 0.2s ease-in-out;
}

.login-form button:hover {
  background-color: #0d3c5a;
}

.register-text {
  margin-top: 20px;
  text-align: center;
  font-family: 'Apple SD Gothic Neo', sans-serif;
  color: #707070;
}

.register-text a {
  color: #104B71;
  text-decoration: none;
  margin-left: 5px;
}
</style>