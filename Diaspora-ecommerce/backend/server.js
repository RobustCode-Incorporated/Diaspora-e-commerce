const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB, sequelize } = require('./config/db');
const { User, Product, Pays } = require('./models');

const productRoutes = require('./routes/products');
const paysRoutes = require('./routes/pays');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/pays', paysRoutes);


// Connexion DB + démarrage serveur
const PORT = process.env.PORT || 4000;

(async () => {
  await connectDB();

  // Synchronisation optionnelle si besoin
  // await sequelize.sync({ alter: true });

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})();