const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO QUE REPRESENTA UNA RELACION MANY TO MENY EN LA BASE DE DATOS

const DashboardPictogram = sequelize.define("dashboard_pictogram", {
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = DashboardPictogram;