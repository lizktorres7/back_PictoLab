const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO Institution QUE REPRESENTA UNA INSTITUCION EN LA BASE DE DATOS

const Institution = sequelize.define("institutions", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  province: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Institution;