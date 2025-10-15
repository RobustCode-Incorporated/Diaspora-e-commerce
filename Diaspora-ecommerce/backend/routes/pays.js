const express = require('express');
const router = express.Router();
const { Pays } = require('../models');

// === Route pour récupérer tous les pays ===
router.get('/', async (req, res) => {
  try {
    const pays = await Pays.findAll({ order: [['nom', 'ASC']] });
    res.json(pays);
  } catch (error) {
    console.error('Erreur lors de la récupération des pays :', error);
    res.status(500).json({ error: 'Erreur serveur lors du chargement des pays' });
  }
});

module.exports = router;