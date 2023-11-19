const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { User, Institution, Role, InstitutionRole } = require("../models/index");
const { assignRoleToUser } = require("../../middlewares/validate-code")

/**
 * FUNCION PARA OBTENER LISTA DE USUARIOS
 * @param {*} req 
 * @param {*} res 
 */
const userGet = async (req = request, res = response) => {
  //number of users limit to show, and page where it starts
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };

  try {
    const [length, user] = await Promise.all([
      User.count({ where: query }),
      User.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, user });

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
const userPost = async (req = request, res = response) => {
  const { email, password, institutionId, roleId, code } = req.body;
  console.log('Antes de validar institution');

  // Asigna el roleId al usuario basado en el código
  //Validacion del codigo-rol-institucion

/*   try {

    await validateInstIDs(institutionId, res);
    await validateRoleIDs(institutionId, roleId, res);
    await validateCodeIDs(institutionId, roleId, code, res);

  } catch (error) {
    console.log("ERRRROOOOOROROROROR:", error)
    res.json({ status: 400, error: "ERROR" });
  } */



  //Encriptar la contrasenna
  const salt = bcryptjs.genSaltSync();
  _password = bcryptjs.hashSync(password, salt);



  try {
    const user = await User.create({

      email,
      password: _password,
      code,
      roleId: roleId,
    });
    res.json({ user });

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
const usersPut = async (req, res = response) => {
  /* const { id } = req.params; */
  const { id, updatedAt, createdAt, state, password, code, ...resto } = req.body;

  try {
    if (password) {
      // Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }
    await User.update(resto, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ msg: "User updated successfully" });

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
const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const user = await User.update({ state: false }, {
      where: {
        id,
      },
    })
    res.json({ user });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};


/******************************* UTIL FUNCTION *******************************/
/**
 * VALIDAR CODIGO-ROL-INSTITUCION
 * @param {*} institution 
 * @param {*} role 
 * @param {*} code 
 * @returns 
 */
/* const validateInstIDs = async (institutionid, res, next) => {

  try {
    const institution = await InstitutionRole.findOne({ where: { institutionId: institutionid, state: true }, });
    if (!institution) {
      return res.json({ status: 400, error: "That institution does not exist." });
    }
    return next();

  } catch (error) {
    console.log(error);
  }

}

const validateRoleIDs = async (institutionid, roleid, res, next) => {

  try {
    const role = await InstitutionRole.findOne({ where: { institutionId: institutionid, roleId: roleid, state: true, }, });
    if (!role) {
      return res.json({ status: 400, error: "There is no such role in that institution" });
    }
    return next();

  } catch (error) {
    console.log(error);
  }

}

const validateCodeIDs = async (institutionid, roleid, cod, res, next) => {

  try {
    const code = await InstitutionRole.findOne({ where: { institutionId: institutionid, roleId: roleid, code: cod, state: true, }, });
    if (!code) {
      return res.json({ status: 400, error: "The code is invalid" });
    }
    return next();

  } catch (error) {
    console.log(error);
  }

} */


module.exports = {
  userGet,
  userPost,
  usersPut,
  usersDelete,
};
