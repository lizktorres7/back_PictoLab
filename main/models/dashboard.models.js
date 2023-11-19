const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/conf");

// MODELO Dashboard QUE REPRESENTA UN TABLERO EN LA BASE DE DATOS
const Dashboard = sequelize.define("dashboards", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    /* unique: true, */   
  },
  rating: {
    type: DataTypes.STRING,
/*     isIn: {
      args: [['Muy bien', 'Bien', 'Regular', 'Mal', 'Muy mal']],
      msg: "Must be: Muy bien, Bien, Regular, Mal or Muy mal"
    } */
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Dashboard;