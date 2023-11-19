const { response, request } = require("express");
const { getUserJWT } = require("../heplers/get-userJWT");
const { Activity, Teacher, DaybookActivity } = require("../models/index");

/**
 * FUNCION PARA OBTENER UNA LISTA DE ACTIVIDADES
 * @param {*} req 
 * @param {*} res 
 */
const activityGet = async (req = request, res = response) => {
  //number of institutions limit to show, and page where it starts
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };

  try {
    const [length, activity] = await Promise.all([
      Activity.count({ where: query }),
      Activity.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, activity });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA CREAR UNA ACTIVIDAD
 * @param {*} req 
 * @param {*} res 
 */
const activityPost = async (req = request, res = response) => {
  const { name, description, pictogramId } = req.body;
  const user = await getUserJWT(req)
  const teacher = await Teacher.findOne({ where: { state: true, userId: user.id } })

  try {
    if (!teacher) {
      console.log(error);
      res.status(401).json({ msg: "UNAUTHORIZED" })
    }

    const activity = await Activity.create({
      name,
      description,
      pictogramId,
      teacherId: teacher.id,
    });

    res.json({ activity });

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
const activityPut = async (req, res = response) => {
  /*const { id } = req.params;*/
  const { _id, updatedAt, createdAt, state, ...resto } = req.body;
  const user = await getUserJWT(req)
  const teacher = await Teacher.findOne({ where: { state: true, userId: user.id } })
  const creator = await Activity.findOne({ id: req.params.id })


  try {
    if ((!teacher) || teacher.id != creator.id) {
      return res.status(401).json({ msg: "UNAUTHORIZED" })
    }

    await Activity.update(resto, {
      where: {
        id: req.params.id,
      },
    });

    res.json({ msg: "Activity updated successfully" });

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
const activityDelete = async (req, res = response) => {
  const { id } = req.params;
  const user = await getUserJWT(req)
  const teacher = await Teacher.findOne({ where: { state: true, userId: user.id } })
  const creator = await Activity.findOne({ id: req.params.id })


  try {
    if (!teacher) {
      res.status(401).json({ msg: "UNAUTHORIZED ROLE" })
    }

    if (teacher.id != creator.id) {
      res.status(401).json({ msg: "UNAUTHORIZED: you are not the owner of this resource" })
      
    }
    const activity = await Activity.update({ state: false }, {
      where: {
        id,
      },
    });
    await DaybookActivity.update({ state: false }, { where: { activityId: id } });

    res.json({ activity });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

module.exports = {
  activityGet,
  activityPost,
  activityPut,
  activityDelete,
};
