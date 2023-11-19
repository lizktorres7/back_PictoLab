const { Router } = require("express");
const { check } = require("express-validator");
const {
  childrenGet,
  childrenPost,
  childrenPut,
  childrenDelete,
} = require("../children/children.controllers");
const {
  isRoleValid,
  existsChildrenForId,
} = require("../heplers/validate-db");
const { 
  NameNotEmpty,
  GenderTipe
} = require("../heplers/validate-empty");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");
//const Role = require("../role/role.models");

//Definicion de las rutas que manejan solicitudes HTTP GET, POST, PUT y DELETE
const router = Router();


// GET ITEM
router.get("/", [validateJWT, /* hasRole("ADMIN"), */ validateFields], childrenGet);

// CREATE
router.post("/",
[
  validateJWT, 
  /* hasRole("ADMIN"), */ 
  check("name", "The name is invalid").not().isEmpty(),
  check("lastname", "The name is invalid").not().isEmpty(),
  check("gender", "The name is invalid").not().isEmpty(), 
  check("gender").custom(GenderTipe),
  validateFields,
], 
childrenPost
);

// UPTDATE
router.put(
  "/:id",
  [
    validateJWT,
    /* hasRole("ADMIN"), */
    check("name", "The name is invalid").not().isEmpty(),
    check("name").custom(NameNotEmpty),
    check("lastname", "The name is invalid").not().isEmpty(),
    check("lastname").custom(NameNotEmpty),
    check("gender", "The name is invalid").not().isEmpty(), 
    check("gender").custom(GenderTipe),
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsChildrenForId),
    validateFields,
  ],
  childrenPut
);

// DELETE
router.delete(
  "/:id",
  [
    validateJWT,
    /* hasRole("ADMIN"), */
        check("id", "Not valid id").isUUID(4),
    check("id").custom(existsChildrenForId),
    validateFields,
  ],
  childrenDelete
);

module.exports = router;
