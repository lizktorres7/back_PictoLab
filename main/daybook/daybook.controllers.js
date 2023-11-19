const { response, request } = require("express");
const { Daybook, Teacher, DaybookActivity } = require("../models/index");

/**
 * FUNCION PARA OBTENER UNA AGENDA
 * @param {*} req 
 * @param {*} res 
 */
const daybookGet = async (req = request, res = response) => {
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };

  try {
    const [length, daybook] = await Promise.all([
      Daybook.count({ where: query }),
      Daybook.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, daybook });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA CREAR UNA AGENDA
 * @param {*} req 
 * @param {*} res 
 */
const daybookPost = async (req = request, res = response) => {
  const { name, date, summary, childId, start_time, end_time, comment } = req.body;
  const user = await getUserJWT(req)
  const teacher = await Teacher.findOne({ where: { state: true, userId: user.id } })

  try {
    if (!teacher) {
      console.log(error);
      return res.status(401).json({ msg: "UNAUTHORIZED" })
    }

    const daybook = await Daybook.create({
      name,
      date,
      summary,
      childId,
      teacherId: teacher.id,
    });

    // Asociar el tablero con categorias
    await dashboardAssingActivity(daybook.id, start_time, end_time, comment)

    res.json({ daybook });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};


/**
 * FUNCIÓN PARA MODIFICAR UNA AGENDA
 * @param {*} req 
 * @param {*} res 
 */
const daybookPut = async (req, res = response) => {
  /*  const { id } = req.params; */
  const { _id, updatedAt, createdAt, state, childId, teacherId, ...resto } = req.body;
  const user = await getUserJWT(req)
  const teacher = await Teacher.findOne({ where: { state: true, userId: user.id } })
  const creator = await Activity.findOne({ id: req.params.id })

  try {
    if ((!teacher) || teacher.id != creator.id) {
      return res.status(401).json({ msg: "UNAUTHORIZED" })
    }

    await Daybook.update(resto, {
      where: {
        id: req.params.id,

      },
    });

    res.json({ msg: "Daybook updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA ELIMINAR UNA AGENDA
 * @param {*} req 
 * @param {*} res 
 */
const daybookDelete = async (req, res = response) => {
  const { id } = req.params;
  const user = await getUserJWT(req)
  const teacher = await Teacher.findOne({ where: { state: true, userId: user.id } })

  try {
    if (!teacher) {
      console.log(error);
      res.status(401).json({ msg: "UNAUTHORIZED" })
    }

    const daybook = await Daybook.update({ state: false }, {
      where: {
        id,
      },
    });
    res.json({ daybook });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/******************************* UTIL FUNCTION *******************************/
/**
 * ASIGNAR ACTIVIDADES A LA AGENDA
 * @param {*} dash_id 
 * @param {*} cat 
 */
const dashboardAssingActivity = async (dash_id, cat) => {
  try {
    for (let index = 0; index < cat.length; index++) {
      const cat_id = cat[index];
      await DashboardCategory.create({ categoryId: cat_id, dashboardId: dash_id });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  daybookGet,
  daybookPost,
  daybookPut,
  daybookDelete,
};
