const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO Activity QUE REPRESENTA UNA AGENDA EN LA BASE DE DATOS
const Activity = sequelize.define("activities", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});


module.exports = Activity;
