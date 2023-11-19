const { response, request } = require("express");
const { Role, InstitutionRole } = require("../models/index");


/**
 * FUNCION PARA OBTENER LISTA DE ROL
 * @param {*} req 
 * @param {*} res 
 */
const roleGet = async (req = request, res = response) => {
  //number of users limit to show, and page where it starts
  //console.log('roleGet function is running');
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };

  try {
    const [length, role] = await Promise.all([
      Role.count({ where: query }),
      Role.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, role });

  } catch (error) {
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA CREAR UN ROL
 * @param {*} req 
 * @param {*} res 
 */
const rolePost = async (req = request, res = response) => {
  const { name, code, institutionId } = req.body;

  try {
    const role = await Role.create({
      name,
    });

    await InstitutionRole.create({ institutionId: institutionId, roleId: role.id, code: code })
    res.json({ role });

  } catch (error) {
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCIÓN PARA MODIFICAR UN ROL
 * @param {*} req 
 * @param {*} res 
 */
const rolePut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, updatedAt, createdAt, state, code, institutionId, ...resto } = req.body;


  try {
    await Role.update(resto, {
      where: {
        id,
      },
    });
    res.json({ msg: "Role updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA ELIMINAR UN ROL
 * @param {*} req 
 * @param {*} res 
 */
const roleDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const role = await Role.update({ state: false }, {
      where: {
        id,
      },
    });
    
    //Borrar un rol general del sistema sin tomar en cuenta la Institution. Se borra tambien su codigo
    await InstitutionRole.update({ state: false }, { where: { roleId: id } });
    res.json({ role });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

module.exports = {
  roleGet,
  rolePost,
  rolePut,
  roleDelete,
};
