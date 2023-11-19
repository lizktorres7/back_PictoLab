const { response, request } = require("express");
const { Menu, MenuPictogram } = require("../models/index");

/**
 * FUNCION PARA OBTENER EL MENU
 * @param {*} req 
 * @param {*} res 
 */
const menuGet = async (req = request, res = response) => {
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };

  try {
    const [length, menu] = await Promise.all([
      Menu.count({ where: query }),
      Menu.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, menu });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA CREAR UN MENU
 * @param {*} req 
 * @param {*} res 
 */
const menuPost = async (req = request, res = response) => {
  const { event, pictogramsIds } = req.body;

  try {
    const menu = await Menu.create({
      event,
      userId: req.user.id,
    });

    // Asociar el tablero con pictogramas
    await menuAssingPictograms(menu.id, pictogramsIds)

    res.json({ menu });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCIÓN PARA MODIFICAR UN MENU
 * @param {*} req 
 * @param {*} res 
 */
const menuPut = async (req, res = response) => {
  /* const { id } = req.params; */
  const { _id, event, pictogramsIds, ...resto } = req.body;

  try {
    await Menu.update(resto, {
      where: {
        id: req.params.id,
      },
    });

    // Actualizar los pictogramas en el tablero
    await menuAssingPictogramsUpdate(Menu.id, pictogramsIds)

    res.json({ msg: "Menu updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }

};

/**
 * FUNCION PARA ELIMINAR UN MENU
 * @param {*} req 
 * @param {*} res 
 */
const menuDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const menu = await Menu.update({ state: false }, {
      where: {
        id,
      },
    });

    await MenuPictogram.update({ state: false }, { where: { menuId: id } });

    res.json({ menu });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/******************************* UTIL FUNCTION *******************************/
/**
 * ASIGNAR PICTOGRAMAS AL TABLERO
 * @param {*} menu_id 
 * @param {*} picto 
 */
const menuAssingPictograms = async (menu_id, picto) => {
  try {
    for (let index = 0; index < picto.length; index++) {
      const picto_id = picto[index];
      await MenuPictogram.create({ pictogramId: picto_id, menuId: menu_id });
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * ACTUALIZAR PICTOGRAMAS AL TABLERO
 * @param {*} menu_id 
 * @param {*} picto 
 */
const menuAssingPictogramsUpdate = async (menu_id, picto) => {
  try {
    await MenuPictogram.destroy({ where: { menuId: menu_id } });
    for (let index = 0; index < cat.length; index++) {
      const picto_id = picto[index];
      await MenuPictogram.create({ pictogramId: picto_id, menuId: menu_id });
    }
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  menuGet,
  menuPost,
  menuPut,
  menuDelete,
};
