const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/conf");


const Pictogram = sequelize.define("pictograms", {
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
/*   storageId: {
    type: DataTypes.INTEGER,
/*     references: {
      model: 'Storage', // nombre de tu modelo Storage
      key: 'id',
    } 
  }, */
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Pictogram;