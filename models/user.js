const { DataTypes, Model } = require('sequelize');
const { dbConnection } = require('./database');

class Users extends Model { }

Users.init({
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING
  }
}, {
  sequelize: dbConnection,
  modelName: 'User'
});

Users.sync({ alter: true })

module.exports = { Users };