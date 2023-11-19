const { response, request } = require("express");
const { Institution, Role, InstitutionRole } = require("../models/index");


/**
 * FUNCION PARA OBTENER LISTA DE INSTITUCIONES
 * @param {*} req 
 * @param {*} res 
 */
const institutionGet = async (req = request, res = response) => {
  //number of institutions limit to show, and page where it starts
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };

  try {
    const [length, institution] = await Promise.all([
      Institution.count({ where: query }),
      Institution.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, institution });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA CREAR UNA INSTITUCION
 * @param {*} req 
 * @param {*} res 
 */
const institutionPost = async (req = request, res = response) => {
  const { name, province, rol, code } = req.body;

  try {
    const institution = await Institution.create({
      name,
      province,
      /* userId: req.user.id, */
    });

    const newRole = await rolePost(rol)
    await InstitutionRole.create({ institutionId: institution.id, roleId: newRole.id, code: code })

    res.json({ institution });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCIÓN PARA MODIFICAR UNA INSTITUCION
 * @param {*} req 
 * @param {*} res 
 */
const institutionPut = async (req, res = response) => {
  /* const { id } = req.params; */
  const { _id, updatedAt, createdAt, state, rol, code, ...resto } = req.body;

  try {
    await Institution.update(resto, {
      where: {
        id: req.params.id
      },
    });

    res.json({ msg: "Institution updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA ELIMINAR UNA INSTITUCION
 * @param {*} req 
 * @param {*} res 
 */
const institutionDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const institution = await Institution.update({ state: false }, {
      where: {
        id,
      },
    })

    await roleDelete(id)
    res.json({ institution });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};


/******************************* UTIL FUNCTION *******************************/
/**
 * CREAR NUEVO ROL CONJUNTAMENTE CON UNA INSTITUCION
 * @param {*} name 
 * @returns 
 */
const rolePost = async (name) => {
  try {
    const role = await Role.create({ name });
    return role;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating the role");
  }
};

/**
 * PARA ELIMINAR EL ROL CREADO CONJUNTAMENTE CON UNA INSTITUCION
 * @param {*} id 
 * @returns 
 */
const roleDelete = async (id) => {
  try {
    // Buscar todas las relaciones InstitutionRole que coincidan con el ID de la institución
    const institutionRoles = await InstitutionRole.findAll({ where: { institutionId: id } });

    // Para cada relación InstitutionRole, actualizar el estado del rol correspondiente y la relación a false
    for (let institutionRole of institutionRoles) {
      if (institutionRole.roleId) {
        await Role.update({ state: false }, { where: { id: institutionRole.roleId } });
      } else {
        res.status(400).json({ msg: "No se encontró el rol correspondiente" });
        return;
      }
      if (institutionRole.institutionId) {
        await InstitutionRole.update({ state: false }, { where: { institutionId: institutionRole.institutionId } });
      } else {
        res.status(400).json({ msg: "No se encontró la relación InstitutionRole correspondiente" });
        return;
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting the role");
  }

}


module.exports = {
  institutionGet,
  institutionPost,
  institutionPut,
  institutionDelete,
};
