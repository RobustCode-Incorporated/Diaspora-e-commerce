const { sequelize } = require('../config/db');

const User = require('./User')(sequelize);
const Product = require('./Product')(sequelize);
const Pays = require('./Pays')(sequelize);
const Order = require('./Order')(sequelize);

// Relations
// Un utilisateur (vendeur) a plusieurs produits
User.hasMany(Product, { foreignKey: 'seller_id' });
Product.belongsTo(User, { as: 'seller', foreignKey: 'seller_id' });

// Un utilisateur (acheteur) peut passer plusieurs commandes
User.hasMany(Order, { foreignKey: 'buyerId' });
Order.belongsTo(User, { as: 'buyer', foreignKey: 'buyerId' });

// Un produit peut être associé à plusieurs commandes
Product.hasMany(Order, { foreignKey: 'productId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { sequelize, User, Product, Pays, Order };