const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO Category QUE REPRESENTA UNA CATEGORIA EN LOS PICTOGRAMAS Y TABLEROS
const Category = sequelize.define("categories", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Category;
