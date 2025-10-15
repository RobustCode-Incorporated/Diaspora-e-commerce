const express = require('express');
const router = express.Router();
const { Product, User } = require('../models');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 🔹 Stockage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// 🔹 Créer un produit (fournisseur)
router.post('/', auth('fournisseur'), upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const seller_id = req.user.id;

    if (!name || !description || !price) {
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }

    const image_url = req.file ? `uploads/${req.file.filename}` : null;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image_url,
      seller_id
    });

    res.status(201).json(product);
  } catch (err) {
    console.error('Erreur ajout produit :', err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// 🔹 Récupérer tous les produits
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: User, as: 'seller', attributes: ['id', 'nom', 'prenom', 'username', 'email'] }],
      order: [['created_at', 'DESC']]
    });
    res.json(products);
  } catch (err) {
    console.error('Erreur récupération produits :', err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// 🔹 Modifier un produit
router.put('/:id', auth('fournisseur'), upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    if (product.seller_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { name, description, price, category } = req.body;
    if (req.file) product.image_url = `uploads/${req.file.filename}`;
    await product.update({ name, description, price, category, image_url: product.image_url });

    res.json(product);
  } catch (err) {
    console.error('Erreur modification produit :', err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// 🔹 Supprimer un produit
router.delete('/:id', auth('fournisseur'), async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    if (product.seller_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    if (product.image_url) {
      const imagePath = path.join(__dirname, '..', product.image_url);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await product.destroy();
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (err) {
    console.error('Erreur suppression produit :', err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;