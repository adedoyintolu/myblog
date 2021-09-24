const { DataTypes, Model } = require('sequelize');
const { dbConnection } = require('./database');

class Tags extends Model { }

Tags.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  sequelize: dbConnection,
  modelName: 'Tag'
});

Tags.sync({ alter: true })

module.exports = { Tags };