const { response, request } = require("express");
const { Tutor } = require("../models/index");

/**
 * FUNCION PARA OBTENER LISTA DE MAESTROS
 * @param {*} req 
 * @param {*} res 
 */
const tutorGet = async (req = request, res = response) => {
  //number of users limit to show, and page where it starts
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };

  try {
    const [length, tutor] = await Promise.all([
      Tutor.count({ where: query }),
      Tutor.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, tutor });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA CREAR UN USUARIO
 * @param {*} req 
 * @param {*} res 
 */
const tutorPost = async (req = request, res = response) => {
  const { name, lastname, phone, address, /* userId */ } = req.body;

  try {
    const tutor = await Tutor.create({
      name,
      lastname,
      phone,
      address,
    });
    res.json({ tutor });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCIÓN PARA MODIFICAR UN USUARIO
 * @param {*} req 
 * @param {*} res 
 */
const tutorPut = async (req, res = response) => {
  const { id, updatedAt, createdAt, state, ...resto } = req.body;

  try {
    await Tutor.update(resto, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ msg: "Teacher updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA ELIMINAR UN USUARIO
 * @param {*} req 
 * @param {*} res 
 */
const tutorDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const tutor = await Tutor.update({ state: false }, {
      where: {
        id,
      },
    })
    res.json({ tutor });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

module.exports = {
  tutorGet,
  tutorPost,
  tutorPut,
  tutorDelete,
};
