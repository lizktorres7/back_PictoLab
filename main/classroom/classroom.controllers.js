const { response, request } = require("express");
const { getUserJWT } = require("../heplers/get-userJWT");
const { Classroom, Children, Teacher } = require("../models/index");

/**
 * FUNCION PARA OBTENER UNA LISTA DE AULAs
 * @param {*} req 
 * @param {*} res 
 */
const classroomGet = async (req = request, res = response) => {
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };
  try {
    const [length, classroom] = await Promise.all([
      Classroom.count({ where: query }),
      Classroom.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, classroom });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA CREAR UN AULA
 * @param {*} req 
 * @param {*} res 
 */
const classroomPost = async (req = request, res = response) => {
  const { name, childrenId } = req.body;
  const user = await getUserJWT(req)
  const teacher = await Teacher.findOne({ where: { state: true, userId: user.id } })

  try {
    if (!teacher) {
      console.log(error);
      res.status(401).json({ msg: "UNAUTHORIZED" })
    }

    // Recorre cada ID en el arreglo: EXISTE NIÑO?
    for (let i = 0; i < childrenId.length; i++) {
      const id = childrenId[i];

      // Busca el niño en la base de datos
      const child = await Children.findOne({ where: { id: id, state: true } });

      // Si el niño no existe, retorna un error
      if (!child) {
        return res.status(400).json({ error: `The child with id: ${id} does not exist` });
      }
    }

    //Crear aula
    const classroom = await Classroom.create({
      name,
      teacherId: teacher.id
    });

    //Actualizar el al niño que pertenece a un aula
    let add = 0
    for (let i = 0; i < childrenId.length; i++) {
      const id = childrenId[i];
      const free_child = await Children.findOne({ where: { id: id, classroomId: null, state: true } })
  
      if (free_child) {
        await Children.update({ classroomId: classroom.id }, { where: { id: free_child.id, state: true } });
        add++
      }
      
    }

    res.json({ msg: `The classroom has been successfully created with ${add} children`, classroom });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCIÓN PARA MODIFICAR UN AULA
 * @param {*} req 
 * @param {*} res 
 */
const classroomPut = async (req, res = response) => {
  /* const { id } = req.params; */
  const { _id, updatedAt, createdAt, state, ...resto } = req.body;

  try {
    await Classroom.update(resto, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ msg: "Classroom updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA ELIMINAR UN AULA
 * @param {*} req 
 * @param {*} res 
 */
const classroomDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const classroom = await Classroom.update({ state: false }, {
      where: {
        id,
      },
    });
    res.json({ classroom });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

module.exports = {
  classroomGet,
  classroomPost,
  classroomPut,
  classroomDelete,
};
