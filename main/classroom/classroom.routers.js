const { Router } = require("express");
const { check } = require("express-validator");
const {
  classroomGet,
  classroomPost,
  classroomPut,
  classroomDelete,
} = require("../classroom/classroom.controllers");
const {
  isRoleValid,
  existsClassroomForId,
} = require("../heplers/validate-db");
const { NameNotEmpty } = require("../heplers/validate-empty");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");
//const Role = require("../role/role.models");

//Definicion de las rutas que manejan solicitudes HTTP GET, POST, PUT y DELETE
const router = Router();


// GET ITEM
router.get("/", [validateJWT, /* hasRole("ADMIN"), */ validateFields], classroomGet);

// CREATE
router.post("/", 
[
  validateJWT, 
  /* hasRole("ADMIN"), */ 
  check("name", "The name is invalid").not().isEmpty(),
  validateFields,
], 
classroomPost
);

// UPTDATE
router.put(
  "/:id",
  [
    validateJWT,
    /* hasRole("ADMIN"), */
    check("name").custom(NameNotEmpty),
    check("subject").custom(NameNotEmpty),
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsClassroomForId),
    validateFields,
  ],
  classroomPut
);

// DELETE
router.delete(
  "/:id",
  [
    validateJWT,
    /* hasRole("ADMIN"), */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsClassroomForId),
    validateFields,
  ],
  classroomDelete
);

module.exports = router;
