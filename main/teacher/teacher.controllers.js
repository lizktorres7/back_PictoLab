const { response, request } = require("express");
const { Teacher } = require("../models/index");

/**
 * FUNCION PARA OBTENER LISTA DE MAESTROS
 * @param {*} req 
 * @param {*} res 
 */
const teacherGet = async (req = request, res = response) => {
  //number of users limit to show, and page where it starts
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };

  try {
    const [length, teacher] = await Promise.all([
      Teacher.count({ where: query }),
      Teacher.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, teacher });

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
const teacherPost = async (req = request, res = response) => {
  const { name, lastname, phone, years_experience, /* userId */ } = req.body;

  try {
    const teacher = await Teacher.create({
      name,
      lastname,
      phone,
      years_experience,
    });
    res.json({ teacher });

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
const teacherPut = async (req, res = response) => {
  const { id, updatedAt, createdAt, state, ...resto } = req.body;

  try {
    await Teacher.update(resto, {
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
const teacherDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.update({ state: false }, {
      where: {
        id,
      },
    })
    res.json({ teacher });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

module.exports = {
  teacherGet,
  teacherPost,
  teacherPut,
  teacherDelete,
};
