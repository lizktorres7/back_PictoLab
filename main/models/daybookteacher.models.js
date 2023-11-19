const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO DaybookTeacher QUE REPRESENTA LA AGENDA DEL PROFESOR EN LA BASE DE DATOS
const Daybookteacher = sequelize.define("daybookteachers", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Daybookteacher;
