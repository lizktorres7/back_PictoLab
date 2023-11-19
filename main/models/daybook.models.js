const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO Daybook QUE REPRESENTA LA AGENDA EN LA BASE DE DATOS
const Daybook = sequelize.define("daybooks", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE, // (1980, 6, 20)
    allowNull: false,
  },
  summary: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Daybook;
