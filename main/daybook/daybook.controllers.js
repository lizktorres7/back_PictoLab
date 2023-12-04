const { response, request } = require("express");
const { Daybook, Teacher, DaybookActivity, Activity } = require("../models/index");
const { getUserJWT } = require("../heplers/get-userJWT");

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

const daybookGetActivitis = async (req = request, res = response) => {
  const { id } = req.params;
  try {

    const query = { state: true, daybookId: id };
    const mm_data_db = await DaybookActivity.findAll({
      where: query
    })

    let mm_response = []

    for (let index = 0; index < mm_data_db.length; index++) {
      const element = mm_data_db[index];
      let activ = await Activity.findOne({
        where: { id: element.activityId }
      })
      mm_response.push({ daybook: id, comment: element.comment, activity: activ.get({ plain: true }) })
    }

    res.json({ activitys: mm_response });

  } catch (error) {
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
}

/**
 * FUNCION PARA CREAR UNA AGENDA
 * @param {*} req 
 * @param {*} res 
 */
const daybookPost = async (req = request, res = response) => {
  const { name, date, summary, childId, comment, activitys } = req.body;
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
    await dashboardAssingActivity(daybook.id, comment, activitys)

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
  /* const { id } = req.params; */
  const { id, updatedAt, createdAt, state, childId, teacherId, ...resto } = req.body;
  console.log('ID DAY BOOK ', req.params.id)
  const user = await getUserJWT(req)
  const daybook = await Daybook.findOne({ where: { state: true, id: req.params.id } })
  const teacher = await Teacher.findOne({ where: { state: true, userId: user.id } })

  try {
    console.log('TEACHER : ', teacher?.get({ plain: true }).id, '\n DAYBOOK : ', daybook?.get({ plain: true }).teacherId)
    if (!teacher || teacher.id != daybook.teacherId) {
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
  console.log('ID DAY BOOK ', req.params.id)
  const user = await getUserJWT(req)
  const daybook = await Daybook.findOne({ where: { state: true, id: req.params.id } })
  const teacher = await Teacher.findOne({ where: { state: true, userId: user.id } })

  try {
    console.log('TEACHER : ', teacher?.get({ plain: true }).id, '\n DAYBOOK : ', daybook?.get({ plain: true }).teacherId)
    if (!teacher || teacher.id != daybook.teacherId) {
      return res.status(401).json({ msg: "UNAUTHORIZED" })
    }

    const mm_daybook = await Daybook.update({ state: false }, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ mm_daybook });

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
const dashboardAssingActivity = async (aybook_id , comment, activity_ids) => {
  try {
    for (let index = 0; index < activity_ids.length; index++) {
      const mm_activ_id = activity_ids[index];
      await DaybookActivity.create({ daybookId: aybook_id, activityId: mm_activ_id, comment: comment });
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
  daybookGetActivitis
};
