const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

// 🔹 Créer un compte fournisseur
router.post('/', async (req, res) => {
  try {
    const { nom, prenom, postnom, username, email, telephone, password, paysId } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du fournisseur
    const user = await User.create({
      nom,
      prenom,
      postnom,
      username,
      email,
      telephone,
      password: hashedPassword,
      role: 'fournisseur',
      pays_id: paysId
    });

    res.status(201).json({ message: 'Compte fournisseur créé avec succès', user });

  } catch (error) {
    console.error('Erreur création fournisseur:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du compte fournisseur' });
  }
});

// 🔹 Connexion fournisseur
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, role: 'fournisseur' } });
    if (!user) return res.status(400).json({ message: 'Identifiants invalides' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Identifiants invalides' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email, role: user.role },
      token
    });

  } catch (error) {
    console.error('Erreur login fournisseur:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
  }
});

module.exports = router;