const express = require('express');
const router = express.Router();
const { Order, Product } = require('../models');
const auth = require('../middleware/auth');

router.post('/', auth('buyer'), async (req, res) => {
  try {
    const buyerId = req.user.id;
    const { productId, quantity } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const total = parseFloat(product.price) * (quantity || 1);
    const order = await Order.create({ buyerId, productId, quantity: quantity || 1, total });
    res.json(order);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.get('/my', auth('buyer'), async (req, res) => {
  const orders = await Order.findAll({ where: { buyerId: req.user.id }, include: [Product] });
  res.json(orders);
});

router.get('/seller', auth('seller'), async (req, res) => {
  const orders = await Order.findAll({ include: [{ model: Product, where: { sellerId: req.user.id } }]});
  res.json(orders);
});

module.exports = router;
