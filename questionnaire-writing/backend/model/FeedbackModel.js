const DataTypes = require('sequelize');
const { sequelize } = require('../connection');

const Feedback = sequelize.define('Feedback', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  response: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
}, {
  timestamps: true,
  createdAt: 'createdDate',
  updatedAt: 'updatedDate',
});
module.exports = Feedback;