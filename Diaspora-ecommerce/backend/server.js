const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/db');

// Import des routes
const productRoutes = require('./routes/products');
const paysRoutes = require('./routes/pays');
const fournisseursRoutes = require('./routes/fournisseurs');
const citoyensRoutes = require('./routes/citoyens');

const app = express();

// ✅ Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Rendre le dossier "uploads" accessible publiquement
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes principales
app.use('/api/products', productRoutes);
app.use('/api/pays', paysRoutes);
app.use('/api/fournisseurs', fournisseursRoutes);
app.use('/api/citoyens', citoyensRoutes);

// ✅ Route de test (optionnelle)
app.get('/', (req, res) => {
  res.send('🚀 Diaspora e-Commerce API is running...');
});

// ✅ Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// ✅ Lancement du serveur
const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB();
    console.log('✅ PostgreSQL connecté avec succès');

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Erreur de démarrage du serveur :', err);
  }
})();