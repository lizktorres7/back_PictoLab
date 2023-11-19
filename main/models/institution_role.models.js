const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO Institution QUE REPRESENTA UNA INSTITUCION EN LA BASE DE DATOS

const InstitutionRole = sequelize.define("institution_role", {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = InstitutionRole;