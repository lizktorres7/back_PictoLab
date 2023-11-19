const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO QUE REPRESENTA UNA RELACION MANY TO MANY EN LA BASE DE DATOS

const PictogramSynonym = sequelize.define("pictogram_synonym", {
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = PictogramSynonym;