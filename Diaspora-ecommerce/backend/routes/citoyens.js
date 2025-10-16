const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Ton modèle Sequelize

// ============================
// ✅ ENREGISTREMENT CITOYEN
// ============================
router.post('/register', async (req, res) => {
  try {
    const { nom, prenom, username, email, password, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hachage du mot de passe
    const hashed = await bcrypt.hash(password, 10);

    // Création de l'utilisateur avec valeurs par défaut
    const newUser = await User.create({
      nom: nom || 'Non défini',
      prenom: prenom || '',
      username: username || email.split('@')[0],
      email,
      password: hashed,
      role: role || 'citoyen',
    });

    res.status(201).json({
      message: 'Citoyen enregistré avec succès',
      user: {
        id: newUser.id,
        nom: newUser.nom,
        prenom: newUser.prenom,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error('❌ Erreur register citoyen:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la création du citoyen' });
  }
});


// ============================
// ✅ CONNEXION CITOYEN
// ============================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: 'Utilisateur introuvable' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Mot de passe incorrect' });

    // Génération du token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'diaspora_secret_key',
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Connexion réussie',
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error('❌ Erreur login citoyen:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion' });
  }
});

module.exports = router;