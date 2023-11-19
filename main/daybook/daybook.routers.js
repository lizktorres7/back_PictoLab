const { Router } = require("express");
const { check } = require("express-validator");
const {
  daybookGet,
  daybookPost,
  daybookPut,
  daybookDelete,
} = require("../daybook/daybook.controllers");
const {
  isRoleValid,
  existsDaybookForId,
} = require("../heplers/validate-db");
const { NameNotEmpty } = require("../heplers/validate-empty");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");
//const Role = require("../role/role.models");

//Definicion de las rutas que manejan solicitudes HTTP GET, POST, PUT y DELETE
const router = Router();


// GET ITEM
router.get("/", [validateJWT, /* hasRole("ADMIN"), */ validateFields], daybookGet);

// CREATE
router.post("/",
  [
    validateJWT,
    /* hasRole("ADMIN"), */
    check("day", "The name for the day is invalid").not().isEmpty(),
    /* check("name").custom(NameNotEmpty), */
    validateFields,
  ],
  daybookPost
);

// UPTDATE
router.put(
  "/:id",
  [
    validateJWT,
    /* hasRole("ADMIN"), */
    /* check("name").custom(NameNotEmpty), */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsDaybookForId),
    validateFields,
  ],
  daybookPut
);

//DELETE
router.delete(
  "/:id",
  [
    validateJWT,
    /* hasRole("ADMIN"), */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsDaybookForId),
    validateFields,
  ],
  daybookDelete
);

module.exports = router;
