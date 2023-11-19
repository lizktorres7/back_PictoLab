const { response, request } = require("express");
const { getUserJWT } = require("../heplers/get-userJWT");
const { Children, Tutor } = require("../models/index");

/**
 * FUNCION PARA OBTENER UNA LISTA DE NIÑOS
 * @param {*} req 
 * @param {*} res 
 */
const childrenGet = async (req = request, res = response) => {
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };
  try {
    const [length, children] = await Promise.all([
      Children.count({ where: query }),
      Children.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, children });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA CREAR UN NIÑO
 * @param {*} req 
 * @param {*} res 
 */
const childrenPost = async (req = request, res = response) => {
  const { CI, name, lastname, age, gender, img } = req.body;
  const user = await getUserJWT(req)
  const tutor = await Tutor.findOne({ where: { state: true, userId: user.id } })

  if (!tutor) {
    console.log(error);
    res.status(401).json({ msg: "UNAUTHORIZED" })
  }

  try {
    const children = await Children.create({
      CI,
      name,
      lastname,
      age,
      gender,
      img,
      tutorId: tutor.id,
    });
    res.json({ children });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCIÓN PARA MODIFICAR UN NIÑO
 * @param {*} req 
 * @param {*} res 
 */
const childrenPut = async (req, res = response) => {
  /* const { id } = req.params; */

  const { _id, updatedAt, createdAt, tutorId, state, ...resto } = req.body;

  try {
    await Children.update(resto, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ msg: "Children updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA ELIMINAR UN NIÑO
 * @param {*} req 
 * @param {*} res 
 */
const childrenDelete = async (req, res = response) => {
  /* const { id } = req.params; */

  try {
    const children = await Children.update({ state: false }, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ children });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

module.exports = {
  childrenGet,
  childrenPost,
  childrenPut,
  childrenDelete,
};
