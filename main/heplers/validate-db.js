const {
  Role,
  Activity,
  Institution,
  User,
  Category,
  Classroom,
  Daybookteacher,
  Children,
  Dashboard,
  Daybook,
  Menu,
  Synonym,
  Pictogram,
  Teacher,
  Tutor,
  Storage
} = require("../models/index");


/**
 * EXISTE IMG?
 * @param {*} id 
 */
const existsImgForId = async (id) => {
  const existsImgForId = await Storage.findOne({ where: { id: id, state: true } });
  if (!existsImgForId) {
    throw new Error(`The id: ${id}does not exist`);
  }
};

/**
 * EXISTE MAESTRO?
 * @param {*} id 
 */
const existsTeacherForId = async (id) => {
  const existsTeacherForId = await Teacher.findOne({ where: { id: id, state: true } });
  if (!existsTeacherForId) {
    throw new Error(`The id: ${id} does not exist`);
  }
};

/**
 * EXISTE TUTOR?
 * @param {*} id 
 */
const existsTutorForId = async (id) => {
  const existsTutorForId = await Tutor.findOne({ where: { id: id, state: true } });
  if (!existsTutorForId) {
    throw new Error(`The id: ${id} does not exist `);
  }
};

/**
 * EXISTE INSTITUCION?
 * @param {*} id 
 */
const existsInstitutionForId = async (id) => {
  const existsInstitutions = await Institution.findOne({ where: { id: id, state: true } });
  if (!existsInstitutions) {
    throw new Error(`The id: ${id} does not exist `);
  }
};

/**
 * EXISTE NOMBRE DE INSTITUCIÓN EN USO?
 * @param {*} name 
 */
const validateInstitutionName = async (name) => {
  const institution = await Institution.findOne({ where: { name }, state: true });
  if (institution) {
    throw new Error('The name of the institution is already in use');
  }
};

/**
 * EXISTE ROL?
 * @param {*} id 
 */
const existsRoleForId = async (id) => {
  const existsRoleForId = await Role.findOne({ where: { id: id, state: true } });
  if (!existsRoleForId) {
    throw new Error(`The id: ${id} does not exist `);
  }
};

/**
 * EXISTE NOMBRE DE ROL EN USO?
 * @param {*} name 
 */
const validateRolName = async (name) => {
  const role = await Role.findOne({ where: { name }, state: true });
  if (role) {
    throw new Error('The name of the role is already in use');
  }
};

/**
 * EXISTE CATEGORÍA O CATEGORIAS POR ID?
 * @param {*} categoriesIds 
 */
const existsCategoryForId = async (categoriesIds) => {
  // Comprueba si categoriesIds es un array
  if (Array.isArray(categoriesIds)) {
    // Si es un array, itera sobre cada ID
    for (let id of categoriesIds) {
      const existsCategoryForId = await Category.findOne({ where: { id: id, state: true } });
      if (!existsCategoryForId) {
        throw new Error(`The id: ${id} does not exist`);
      }
    }
  } else {
    // Si no es un array, asume que es un solo ID y comprueba si existe
    const existsCategoryForId = await Category.findOne({ where: { id: categoriesIds, state: true } });
    if (!existsCategoryForId) {
      throw new Error(`The id: ${categoriesIds} does not exist`);
    }
  }
};

/**
 * EXISTE NOMBRE DE CATEGORIA EN USO?
 * @param {*} name 
 */
const validateCategoryName = async (name) => {
  const category = await Category.findOne({ where: { name }, state: true });
  if (category) {
    throw new Error('The name of the category is already in use');
  }
};

/**
 * EXISTE SINONIMO?
 * @param {*} id 
 */
const existsSynonymForId = async (id) => {
  const existsSynonymForId = await Synonym.findOne({ where: { id: id, state: true } });
  if (!existsSynonymForId) {
    throw new Error(`The id: ${id} does not exist`);
  }
};

/**
 * EXISTE NOMBRE DE SINONIMO EN USO?
 * @param {*} name 
 */
const validateSynonymName = async (name) => {
  const synonym = await Synonym.findOne({ where: { name }, state: true });
  if (synonym) {
    throw new Error('The name of the synonym is already in use');
  }
}; 

/**
 * EXISTE PICTOGRAMA O  PICTOGRAMAS POR ID?
 * @param {*} pictogramsIds 
 */
const existsPictogramForId = async (pictogramsIds) => {
  // Comprueba si categoriesIds es un array
  if (Array.isArray(pictogramsIds)) {
    // Si es un array, itera sobre cada ID
    for (let id of pictogramsIds) {
      const existsPictogramForId = await Pictogram.findOne({ where: { id: id, state: true } });
      if (!existsPictogramForId) {
        throw new Error(`The id: ${id} does not exist`);
      }
    }
  } else {
    // Si no es un array, asume que es un solo ID y comprueba si existe
    const existsPictogramForId = await Pictogram.findOne({ where: { id: pictogramsIds, state: true } });
    if (!existsPictogramForId) {
      throw new Error(`The id: ${pictogramsIds} does not exist`);
    }
  }
};

/**
 * EXISTE NOMBRE DE PICTOGRAMA EN USO?
 * @param {*} name 
 */
const validatePictogramName = async (name) => {
  const picto = await Pictogram.findOne({ where: { name }, state: true });
  if (picto) {
    throw new Error('The name of the pictogram is already in use');
  }
};

/**
 * EXISTE TABLERO?
 * @param {*} id 
 */
const existsDashboardForId = async (id) => {
  const existsDashboardForId = await Dashboard.findOne({ where: { id: id, state: true } });
  if (!existsDashboardForId) {
    throw new Error(`The id does not exist ${id}`);
  }
};

/**
 * EXISTE NOMBRE DE TABLERO EN USO?
 * @param {*} name 
 */
const validateDashboardName = async (name) => {
  const dashboard = await Dashboard.findOne({ where: { name }, state: true });
  if (dashboard) {
    throw new Error('The name of the dashboard is already in use');
  }
};

const isRoleValid = async (role = "") => {
  const existsRole = await Role.findOne({ where: { role } });
  if (role && !existsRole) {
    throw new Error("No es un rol permitido");
  }
};

/**
 * EXISTE YA ESE EMAIL?
 * @param {*} email 
 */
const emailExists = async (email = "") => {
  const existEmail = await User.findOne({ where: { email }, state: true });
  if (existEmail) {
    throw new Error(`El correo ${email} ya existe`);
  }
};

/**
 * EXISTE NUMERO DE TELEFONO?
 * @param {*} phone 
 */
const PhoneExists = async (phone = "") => {
  const PhoneExists = await User.findOne({ where: { phone }, state: true });
  if (PhoneExists) {
    throw new Error(`El numero de telefono ${phone} ya existe`);
  }
};

/**
 * EXISTE USUARIO POR ID?
 * @param {*} id 
 */
const existsUserForId = async (id) => {
  const existsUsers = await User.findByPk(id);
  if (!existsUsers) {
    throw new Error(`The id does not exist ${id}`);
  }
};


/**
 * EXISTE ACTIVIDAD POR ID?
 * @param {*} id 
 */
const existsActivityForId = async (id) => {
  const existsActivityForId = await Activity.findByPk(id);
  if (!existsActivityForId) {
    throw new Error(`The id does not exist ${id}`);
  }
};

/**
 * EXISTE AULA POR ID?
 * @param {*} id 
 */
const existsClassroomForId = async (id) => {
  const existsClassroomForId = await Classroom.findByPk(id);
  if (!existsClassroomForId) {
    throw new Error(`The id does not exist ${id}`);
  }
};





/**
 * EXISTE AGENDA (PROFESOR) POR ID?
 * @param {*} id 
 */
const existsDaybookteacherForId = async (id) => {
  const existsDaybookteacherForId = await Daybookteacher.findByPk(id);
  if (!existsDaybookteacherForId) {
    throw new Error(`The id does not exist ${id}`);
  }
};

/**
 * EXISTE NIÑO POR ID?
 * @param {*} id 
 */
const existsChildrenForId = async (id) => {
  const existsChildrenForId = await Children.findByPk(id);
  if (!existsChildrenForId) {
    throw new Error(`The id does not exist ${id}`);
  }
};




/**
 * EXISTE AGENDA (NIÑO) POR ID?
 * @param {*} id 
 */
const existsDaybookForId = async (id) => {
  const existsDaybookForId = await Daybook.findByPk(id);
  if (!existsDaybookForId) {
    throw new Error(`The id does not exist ${id}`);
  }
};

/**
 * EXISTE MENU POR ID?
 * @param {*} id 
 */
const existsMenuForId = async (id) => {
  const existsMenuForId = await Menu.findByPk(id);
  if (!existsMenuForId) {
    throw new Error(`The id does not exist ${id}`);
  }
};




module.exports = {
  isRoleValid,
  emailExists,
  PhoneExists,
  existsUserForId,
  existsInstitutionForId,
  existsRoleForId,
  existsActivityForId,
  existsCategoryForId,
  existsPictogramForId,
  existsClassroomForId,
  existsDaybookteacherForId,
  existsChildrenForId,
  existsDashboardForId,
  existsDaybookForId,
  existsMenuForId,
  existsSynonymForId,
  existsTutorForId,
  existsTeacherForId,
  validateInstitutionName,
  validateRolName,
  validateCategoryName,
  validateSynonymName,
  validatePictogramName,
  validateDashboardName,
  existsImgForId,
};
