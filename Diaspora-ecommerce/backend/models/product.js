const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    image_url: { type: DataTypes.TEXT },
    seller_id: { type: DataTypes.INTEGER, allowNull: false },
  }, { tableName: 'products', timestamps: true });
};