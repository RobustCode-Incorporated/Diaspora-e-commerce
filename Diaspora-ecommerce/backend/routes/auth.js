const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
require('dotenv').config();

// ======= REGISTER =======
router.post('/register', async (req, res) => {
  try {
    const { nom, prenom, postnom, username, email, telephone, password, role, pays_id } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await User.create({
      nom,
      prenom,
      postnom,
      username,
      email,
      telephone,
      password: hashedPassword,
      role,
      pays_id
    });

    // Génération du token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// ======= LOGIN =======
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifie si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Identifiants invalides' });

    // Vérifie le mot de passe
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Identifiants invalides' });

    // Génère le token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;