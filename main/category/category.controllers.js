const { response, request } = require("express");
const { Category } = require("../models/index");

/**
 * FUNCION PARA OBTENER UNA LISTA DE CATEGORÍAS
 * @param {*} req 
 * @param {*} res 
 */
const categoryGet = async (req = request, res = response) => {
    const { limit = 1000, offset = 0 } = req.query;
    const query = { state: true };

    try {
        const [length, category] = await Promise.all([
            Category.count({ where: query }),
            Category.findAll({
                where: query,
                offset: Number(offset),
                limit: Number(limit),
            }),
        ]);
        res.json({ length, category });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk to the administrator",
        });
    }
};

/**
 * FUNCION PARA CREAR UNA CATEGORÍA
 * @param {*} req 
 * @param {*} res 
 */
const categoryPost = async (req = request, res = response) => {
    const { name } = req.body;

    try {
        const category = await Category.create({
            name,
            //userId: req.user.id,
        });
        res.json({ category });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk to the administrator",
        });
    }
};

/**
 * FUNCIÓN PARA MODIFICAR UNA CATEGORÍA
 * @param {*} req 
 * @param {*} res 
 */
const categoryPut = async (req = request, res = response) => {
    /* const { id } = req.params; */
    const { _id, updatedAt, createdAt, state, ...resto } = req.body;
    try {
        await Category.update(resto, {
            where: {
                id: req.params.id,
            },
        });
        res.json({ msg: "Category updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk to the administrator",
        });
    }
};

/**
 * FUNCION PARA ELIMINAR UNA CATEGORÍA
 * @param {*} req 
 * @param {*} res 
 */
const categoryDelete = async (req, res = response) => {
    const { id } = req.params;

    try {
        const category = await Category.update({ state: false }, {
            where: {
                id,
            },
        });

        res.json({ category });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Talk to the administrator",
        });
    }

};

module.exports = {
    categoryGet,
    categoryPost,
    categoryPut,
    categoryDelete,
};
