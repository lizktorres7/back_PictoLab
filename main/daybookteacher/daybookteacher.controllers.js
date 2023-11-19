const { response, request } = require("express");
const { Daybookteacher } = require("../models/index");

/**
 * FUNCION PARA OBTENER UNA LISTA DE AGENDAS(PROFESOR)
 * @param {*} req 
 * @param {*} res 
 */
const daybookteacherGet = async (req = request, res = response) => {
  //number of institutions limit to show, and page where it starts
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };

  try {
    const [length, daybookteacher] = await Promise.all([
      Daybookteacher.count({ where: query }),
      Daybookteacher.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, daybookteacher });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA CREAR UNA AGENDA(PROFESOR)
 * @param {*} req 
 * @param {*} res 
 */
const daybookteacherPost = async (req = request, res = response) => {
  const { name, description } = req.body;

  try {
    const daybookteacher = await Daybookteacher.create({
      name,
      description,
      userId: req.user.id,
    });
    res.json({ daybookteacher });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCIÓN PARA MODIFICAR UNA AGENDA(PROFESOR)
 * @param {*} req 
 * @param {*} res 
 */
const daybookteacherPut = async (req, res = response) => {
  /* const { id } = req.params; */
  const { _id, updatedAt, createdAt, state, ...resto } = req.body;

  try {
    await Daybookteacher.update(resto, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ msg: "Daybookteacher updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA ELIMINAR UNA AGENDA(PROFESOR)
 * @param {*} req 
 * @param {*} res 
 */
const daybookteacherDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const daybookteacher = await Daybookteacher.update({ state: false }, {
      where: {
        id,
      },
    });
    res.json({ daybookteacher });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }

};

module.exports = {
  daybookteacherGet,
  daybookteacherPost,
  daybookteacherPut,
  daybookteacherDelete,
};
