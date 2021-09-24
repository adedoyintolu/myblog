
const { DataTypes, Model } = require('sequelize');
const { dbConnection } = require('./database');

class Posts extends Model { }

Posts.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  },
  summary: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.STRING
  },
  tags: {
    type: DataTypes.STRING
  },
  created_by: {
    type: DataTypes.STRING
  }
}, {
  sequelize: dbConnection,
  modelName: 'Post'
});

Posts.sync({ alter: true })

module.exports = { Posts };
