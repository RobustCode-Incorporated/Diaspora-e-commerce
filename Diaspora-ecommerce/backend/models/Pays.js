const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Pays', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    code_iso: { type: DataTypes.CHAR(2), allowNull: false }
  }, { tableName: 'pays', timestamps: false });
};