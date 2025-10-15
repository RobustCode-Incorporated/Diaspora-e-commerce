const { Sequelize } = require('sequelize');
require('dotenv').config();

// Connexion PostgreSQL via DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // désactive les logs SQL, mettre true pour debug
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connecté avec succès');
  } catch (error) {
    console.error('❌ Impossible de se connecter à PostgreSQL :', error);
  }
};

module.exports = { sequelize, connectDB };