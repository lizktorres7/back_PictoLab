const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO Synonym QUE REPRESENTA LOS SINÓNIMOS DE PICTOGRAMA EN LA BASE DE DATOS
const Synonym = sequelize.define("synonym", {
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

module.exports = Synonym;