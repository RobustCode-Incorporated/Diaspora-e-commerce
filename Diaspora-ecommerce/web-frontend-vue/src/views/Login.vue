<template>
    <div class="login-container">
      <!-- Bloc gauche -->
      <div class="left-panel">
        <img src="../assets/RobustCodelogowhite.png" alt="Robust code" class="logo" />
        <h1 class="title">Diaspora e-Commerces</h1>
      </div>
  
      <!-- Bloc droit -->
      <div class="right-panel">
        <h1 class="form-title">Connexion Administrateur Général</h1>
        <form class="login-form" @submit.prevent="handleLogin">
          <label>Nom d'utilisateur</label>
          <input v-model="credentials.username" placeholder="Nom d'utilisateur" required />
  
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
    username: '',
    password: ''
  });
  
  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/administrateurs-generaux/login-admin-general', credentials.value);
      localStorage.setItem('token', res.data.token);
      router.push('/admin-general/dashboard');
    } catch (err) {
      alert("Échec de la connexion. Vérifiez vos identifiants.");
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
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 24px;
    color: #0E2C5A;
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