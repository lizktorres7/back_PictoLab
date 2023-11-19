const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO QUE REPRESENTA UNA RELACION MANY TO MENY EN LA BASE DE DATOS

const DashboardCategory = sequelize.define("dashboard_category", {
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = DashboardCategory;