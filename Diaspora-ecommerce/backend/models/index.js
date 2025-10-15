const sequelize = require('../config/db');
const User = require('./user')(sequelize);
const Product = require('./product')(sequelize);
const Order = require('./order')(sequelize);

User.hasMany(Product, { foreignKey: 'sellerId' });
Product.belongsTo(User, { as: 'seller', foreignKey: 'sellerId' });

User.hasMany(Order, { foreignKey: 'buyerId' });
Order.belongsTo(User, { as: 'buyer', foreignKey: 'buyerId' });

Product.hasMany(Order, { foreignKey: 'productId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { sequelize, User, Product, Order };
