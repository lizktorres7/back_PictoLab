const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO Children QUE REPRESENTA UN NIÑO EN LA BASE DE DATOS
const Children = sequelize.define("children", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  CI: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Children;
