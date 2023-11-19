const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO Classroom QUE REPRESENTA UN AULA EN LA BASE DE DATOS
// SOLO EL MAESTRO TIENE ACCESO AL AULA
const Classroom = sequelize.define("classrooms", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
/*   subject: {
    type: DataTypes.STRING,
    allowNull: false,
  }, */
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Classroom;
