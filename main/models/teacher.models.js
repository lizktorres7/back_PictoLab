const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/conf");

const Teachers = sequelize.define("teachers", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
/*         validate: {
            notEmpty: {
                args: true,
                msg: "El nombre no puede estar vacío"
            },
            len: {
                args: [3, 255],
                msg: "El nombre debe tener más de 2 caracteres"
            }
        } */
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    years_experience: {
        type: DataTypes.INTEGER,
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

module.exports = Teachers;