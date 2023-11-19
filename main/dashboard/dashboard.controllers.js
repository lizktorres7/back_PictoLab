const { response, request } = require("express");
const { Dashboard, DashboardCategory, DashboardPictogram } = require("../models/index");

/**
 * FUNCION PARA OBTENER UN TABLERO
 * @param {*} req 
 * @param {*} res 
 */
const dashboardGet = async (req = request, res = response) => {
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };
  try {
    const [length, dashboard] = await Promise.all([
      Dashboard.count({ where: query }),
      Dashboard.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, dashboard });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA CREAR UN TABLERO
 * @param {*} req 
 * @param {*} res 
 */
const dashboardPost = async (req = request, res = response) => {
  const { name, rating, categoriesIds, pictogramsIds } = req.body;

  try {
    const dashboard = await Dashboard.create({
      name,
      rating,
      //userId: req.user.id,
    });
    console.log("CREATE DASH ", req.body);
    // Asociar el tablero con categorias
    await dashboardAssingCategories(dashboard.id, categoriesIds)
    // Asociar el tablero con pictogramas
    await dashboardAssingPictograms(dashboard.id, pictogramsIds)

    res.json({ dashboard });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCIÓN PARA MODIFICAR UN TABLERO
 * @param {*} req 
 * @param {*} res 
 */
//
const dashboardPut = async (req, res = response) => {
  /* const { id } = req.params; */
  const { _id, categoriesIds, rating, state, pictogramsIds, ...resto } = req.body;

  try {
    await Dashboard.update(resto, {
      where: {
        id: req.params.id,
      },
    });

    // Actualizar las categorias en el tablero
    await dashboardAssingCategoriesUpdate(Dashboard.id, categoriesIds)
    // Actualizar los pictogramas en el tablero
    await dashboardAssingPictogramsUpdate(Dashboard.id, pictogramsIds)

    res.json({ msg: "Dashboard updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA ELIMINAR UN TABLERO
 * @param {*} req 
 * @param {*} res 
 */
const dashboardDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const dashboard = await Dashboard.update({ state: false }, {
      where: {
        id,
      },
    });

    await DashboardCategory.update({ state: false }, { where: { dashboardId: id } });
    await DashboardPictogram.update({ state: false }, { where: { dashboardId: id } });

    res.json({ dashboard });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/******************************* UTIL FUNCTION *******************************/
/**
 * ASIGNAR CATEGORIAS AL TABLERO
 * @param {*} dash_id 
 * @param {*} cat 
 */
const dashboardAssingCategories = async (dash_id, cat) => {
  try {
    for (let index = 0; index < cat.length; index++) {
      const cat_id = cat[index];
      await DashboardCategory.create({ categoryId: cat_id, dashboardId: dash_id });
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * ACTUALIZAR CATEGORIA AL TABLERO
 * @param {*} dash_id 
 * @param {*} cat 
 */
const dashboardAssingCategoriesUpdate = async (dash_id, cat) => {
  try {
    await DashboardCategory.destroy({ where: { dashboardId: dash_id } });
    for (let index = 0; index < cat.length; index++) {
      const cat_id = cat[index];
      await DashboardCategory.create({ categoryId: cat_id, dashboardId: dash_id });
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * ASIGNAR PICTOGRAMAS AL TABLERO
 * @param {*} dash_id 
 * @param {*} picto 
 */
const dashboardAssingPictograms = async (dash_id, picto) => {
  try {
    for (let index = 0; index < picto.length; index++) {
      const picto_id = picto[index];
      await DashboardPictogram.create({ pictogramId: picto_id, dashboardId: dash_id });
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * ACTUALIZAR PICTOGRAMAS AL TABLERO
 * @param {*} ev_id 
 * @param {*} picto 
 */
const dashboardAssingPictogramsUpdate = async (dash_id, picto) => {
  try {
    await DashboardPictogram.destroy({ where: { dashboardId: dash_id } });
    for (let index = 0; index < cat.length; index++) {
      const picto_id = picto[index];
      await DashboardPictogram.create({ pictogramId: picto_id, dashboardId: dash_id });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  dashboardGet,
  dashboardPost,
  dashboardPut,
  dashboardDelete,
};
