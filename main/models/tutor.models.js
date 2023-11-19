const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/conf");

const Tutor = sequelize.define("tutors", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = Tutor;