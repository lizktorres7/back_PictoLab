const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { User, Teacher, Tutor, Institution, Role, InstitutionRole } = require("../models/index");
const { generateJWT } = require("../heplers/generate-jwt");
const { assignRoleToUser } = require("../../middlewares/validate-code")

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    //verificar si el email existe y verificar si el usuario esta activo
    const user = await User.findOne({ where: { email } });
    if (!user || !user.state) {
      return res.json({ status: 400, error: "User or password not valid" });
    }
    //verificar si la contrasenna es correcta
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.json({ status: 400, error: "User or password not valid password" });
    }
    //generar JWT
    const token = await generateJWT(user.id);
    //respuesta
    return res.json({ status: 200, user, token });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, error: "Internal error" });
  }
};

const register = async (req = request, res = response) => {
  const { name, lastname, phone, address, email, password, years_experience, code, roleId } = req.body;

  let mm_id_role = null

  try {
    if (!code) {
      //Crear tutor
      const mm_role = await Role.findOne({ where: { state: true, name: 'tutor' } });
      mm_id_role = mm_role.id

      //Encripta la contrasenna
      let mm_password = await encriptar(password)

      const mm_new_user = await User.create({ email, password: mm_password, roleId: mm_id_role, code: 'user' })
      let mm_tutor = await Tutor.create({ name, lastname, phone, address, userId: mm_new_user.id })

      //Genera el JWT
      const token = await generateJWT(mm_tutor.id);

      return res.json({ status: 200, user: mm_new_user, /* token: token */ });

    } else {
      const mm_id = await nameRol(code)

      if (!mm_id) {
        return res.json({ status: 401, msg: "INVALID CODE" });
      }

      if (mm_id.name === 'teacher') {
        //Encripta la contrasenna
        let mm_password = await encriptar(password)

        //Crear teacher
        const mm_new_user = await User.create({ email, password: mm_password, roleId: mm_id.id, code: code })

        let mm_teacher = await Teacher.create({ name, lastname, phone, years_experience, userId: mm_new_user.id })
        const token = await generateJWT(mm_teacher.id);

        return res.json({ status: 200, user: mm_teacher, /* token: token */ });
      }

      if (mm_id.name === 'chef') {
        //Encripta la contrasenna
        let mm_password = await encriptar(password)

        //Crear chef
        let mm_chef = await User.create({ email, password: mm_password, roleId: mm_id.id, code })
        const token = await generateJWT(mm_chef.id);
        return res.json({ status: 200, user: mm_chef, /* token: token */ });
      }

      
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, error: "Internal error" });
  }
};


/******************************* UTIL FUNCTION *******************************/
/**
 * EXISTE NOMBRE DE CODE?
 * @param {*} code 
 * @returns 
 */
const nameRol = async (code) => {
  try {

    let institution_code = await InstitutionRole.findOne({ where: { state: true, code: code } })

    if (institution_code) {
      
      let name_role = await Role.findOne({ where: { state: true, id: institution_code.roleId } })
  
      return name_role;
    }

    return null;


  } catch (error) {
    console.log(error);
    return res.json({ status: 500, error: "Internal error" });
  }
}

const encriptar = async (password) => {
  try {
    const salt = bcryptjs.genSaltSync();
    let mm_password = bcryptjs.hashSync(password, salt);
    return mm_password;

  } catch (error) {
    console.log(error);
    return res.json({ status: 500, error: "Internal error" });
  }

}


module.exports = {
  login,
  register,
};
