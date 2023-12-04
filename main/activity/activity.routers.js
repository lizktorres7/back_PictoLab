const { Router } = require("express");
const { check } = require("express-validator");
const {
  activityGet,
  activityPost,
  activityPut,
  activityDelete,
} = require("../activity/activity.controllers");
const {
  isRoleValid,
  existsActivityForId,
} = require("../heplers/validate-db");
const { NameNotEmpty } = require("../heplers/validate-empty");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");
//const Role = require("../role/role.models");

//Definicion de las rutas que manejan solicitudes HTTP GET, POST, PUT y DELETE
const router = Router();


// GET ITEM
router.get("/", [validateJWT, validateFields], activityGet);

// CREATE
router.post("/",
  [
    validateJWT,
    hasRole("teacher","admin"),
    check("name", "The name is invalid").not().isEmpty(),
    validateFields,
  ],
  activityPost
);

// UPTDATE
router.put(
  "/:id",
  [
    validateJWT,
    hasRole("teacher","admin"),
    check("name").custom(NameNotEmpty),
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsActivityForId),
    validateFields,
  ],
  activityPut
);

// DELETE
router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("teacher","admin"),
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsActivityForId),
    validateFields,
  ],
  activityDelete
);

module.exports = router;
