const { Router } = require("express");
const { check } = require("express-validator");
const {
  synonymGet,
  synonymPost,
  synonymPut,
  synonymDelete,
} = require("../synonym/synonym.controllers");
const {
  isRoleValid,
  existsSynonymForId,
  validateSynonymName
} = require("../heplers/validate-db");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");
//const Role = require("../role/role.models");

//Definicion de las rutas que manejan solicitudes HTTP GET, POST, PUT y DELETE
const router = Router();


// GET ITEM
router.get("/", [validateJWT, /* hasRole("ADMIN") */ validateFields], synonymGet);

// CREATE
router.post("/", 
[
  validateJWT, 
  /* hasRole("ADMIN") */
  check("name", "The name is empty").not().isEmpty(),
  check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),
  check("name").isAlpha().withMessage('The name must contain only letters'),
  check("name").custom(validateSynonymName),

  validateFields,
], 
synonymPost
);

// UPTDATE
router.put(
  "/:id",
  [
    validateJWT,
    /* hasRole("ADMIN"), */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsSynonymForId),
    
    check("name", "The name is empty").not().isEmpty(),
    check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),
    check("name").isAlpha().withMessage('The name must contain only letters'),
    check("name").custom(validateSynonymName),

    validateFields,
  ],
  synonymPut
);

// DELETE
router.delete(
  "/:id",
  [
    validateJWT,
    /* hasRole("ADMIN"), */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsSynonymForId),
    validateFields,
  ],
  synonymDelete
);

module.exports = router;
