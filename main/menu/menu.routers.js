const { Router } = require("express");
const { check } = require("express-validator");
const {
  menuGet,
  menuPost,
  menuPut,
  menuDelete,
} = require("../menu/menu.controllers");
const {
  isRoleValid,
  existsMenuForId,
  
} = require("../heplers/validate-db");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");
//const Role = require("../role/role.models");

//Definicion de las rutas que manejan solicitudes HTTP GET, POST, PUT y DELETE
const router = Router();


// GET ITEM
router.get("/", [validateJWT, /* hasRole("ADMIN"), */ validateFields], menuGet);

// CREATE
router.post("/", 
[
  validateJWT, 
  /* hasRole("ADMIN"), */
  check("event", "The event is invalid").not().isEmpty(), 
  validateFields,
], 
menuPost
);

// UPTDATE
router.put(
  "/:id",
  [
    validateJWT,
    /* hasRole("ADMIN"), */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsMenuForId),
    check("event", "The event name is empty").not().isEmpty(), 
    
    check("pictogramsIds", "The dashboard must have at least one pictogram").not().isEmpty(),
    /* check("pictogramsIds").custom(existsPictogramForId),  */

    validateFields,
  ],
  menuPut
);

// DELETE
router.delete(
  "/:id",
  [
    validateJWT,
    /* hasRole("ADMIN"), */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsMenuForId),
    validateFields,
  ],
  menuDelete
);

module.exports = router;
