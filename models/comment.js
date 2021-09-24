const { DataTypes, Model } = require('sequelize');
const { dbConnection } = require('./database');

class Comments extends Model { }

Comments.init({
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  posted_by: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: dbConnection,
  modelName: 'Comment'
});

Comments.sync({ alter: true })

module.exports = { Comments };