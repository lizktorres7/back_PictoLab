/* const fs = require("fs"); // Eliminar archivo permanente de la BD y del storage local */
const { matchedData } = require("express-validator");
const { Storage } = require("../models/index");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../../picto_storage`;

/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await Storage.findAll({});
        res.send({ data });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk to the administrator",
        });
    }
};

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await Storage.findByPk(id);
        res.send({ data });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk to the administrator",
        });
    }
};

/* *
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const { file } = req
        console.log(file)
        
        if (!file) {
            return res.status(400).json({ msg: "No image has been uploaded" });
        }
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await Storage.create(fileData)
        res.send({ data })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk to the administrator",
        });
    }
};


/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const dataFile = await Storage.findByPk(id);
        /* await Storage.destroy({ where: { id: id } }); // eliminar directamente de la BD */
        await Storage.update({ state: false }, { where: { id: id } }); //actualiza el parametro status y deja el registro en la BD
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;

        /* fs.unlinkSync(filePath); //Elimina del local y de la BD */
        const data = {
            filePath,
            deleted: 1
        }

        res.send({ data });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk to the administrator",
        });
    }
};

module.exports = { getItems, getItem, createItem, deleteItem };
