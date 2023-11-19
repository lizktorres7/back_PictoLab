const { response, request } = require("express");
const { Synonym } = require("../models/index");

/**
 * FUNCION PARA OBTENER UNA LISTA DE SINÓNIMOS
 * @param {*} req 
 * @param {*} res 
 */
const synonymGet = async (req = request, res = response) => {
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };

  try {
    const [length, synonym] = await Promise.all([
      Synonym.count({ where: query }),
      Synonym.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, synonym });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA CREAR UN SINÓNIMO
 * @param {*} req 
 * @param {*} res 
 */
const synonymPost = async (req = request, res = response) => {
  const { name } = req.body;

  try {
    const synonym = await Synonym.create({
      name,
      //userId: req.user.id,
    });
    res.json({ synonym });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCIÓN PARA MODIFICAR UNA ACTIVIDAD
 * @param {*} req 
 * @param {*} res 
 */
const synonymPut = async (req, res = response) => {
  /* const { id } = req.params; */
  const { _id, updatedAt, createdAt, state, ...resto } = req.body;

  try {
    await Synonym.update(resto, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ msg: "Synonym updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA ELIMINAR UNA ACTIVIDAD
 * @param {*} req 
 * @param {*} res 
 */
const synonymDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const synonym = await Synonym.update({ state: false }, {
      where: {
        id,
      },
    });
    res.json({ synonym });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

module.exports = {
  synonymGet,
  synonymPost,
  synonymPut,
  synonymDelete,
};
