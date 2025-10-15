const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const auth = require('../middleware/auth');

router.post('/', auth('seller'), async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { name, description, price, category, imageUrl } = req.body;
    const product = await Product.create({ name, description, price, category, imageUrl, sellerId });
    res.json(product);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.get('/', async (req, res) => {
  const products = await Product.findAll({ include: ['seller'] });
  res.json(products);
});

router.put('/:id', auth('seller'), async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  if (product.sellerId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  await product.update(req.body);
  res.json(product);
});

router.delete('/:id', auth('seller'), async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  if (product.sellerId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  await product.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;
