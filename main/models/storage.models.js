const { DataTypes } = require('sequelize');
const { sequelize } = require("../../database/conf");

const Storage = sequelize.define('storages', {
  url: {
    type: DataTypes.STRING,
  },
  filename: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  timestamps: true, // createdAt, updatedAt
});

module.exports = Storage;
