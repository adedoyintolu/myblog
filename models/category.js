const { DataTypes, Model } = require('sequelize');
const { dbConnection } = require('./database');

class Categories extends Model { }

Categories.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: dbConnection,
  modelName: 'Category'
});

module.exports = { Categories };