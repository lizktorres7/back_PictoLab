const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO QUE REPRESENTA UNA RELACION MANY TO MENY EN LA BASE DE DATOS

const DaybookActivity = sequelize.define("daybook_activity", {
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  start_time: {
    type: DataTypes.TIME, // (13:30:00)
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME, // (09:20:34)
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
  },
});

module.exports = DaybookActivity;