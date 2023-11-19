const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO Menu QUE REPRESENTA UN MENÚ DE ALIMENTOS EN LA BASE DE DATOS
// ES GESTIONADO POR EL MAITRE

const Menu = sequelize.define("menus", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  event: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Menu;
