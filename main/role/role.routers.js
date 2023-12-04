const { Router } = require("express");
const { check } = require("express-validator");
const {
  roleGet,
  rolePost,
  rolePut,
  roleDelete,
} = require("../role/role.controllers");
const {
  isRoleValid,
  existsRoleForId,
  validateRolName,
} = require("../heplers/validate-db");
const { NameNotEmpty } = require("../heplers/validate-empty");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");

//Definicion de las rutas que manejan solicitudes HTTP GET, POST, PUT y DELETE
const router = Router();


// GET ITEM
router.get("/", [validateJWT, hasRole(["admin"]), validateFields], roleGet);

// CREATE
router.post("/",
  [
    validateJWT,
    hasRole(["admin"]),

    check("name", "The name is empty").not().isEmpty(),
    check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),
    check("name").custom(validateRolName),

    check("code", "The code is empty").not().isEmpty(),
    check("code").isLength({ min: 2, max: 20  }).withMessage('The code must be longer than 6 characters and less of 20'),

    validateFields,
  ],
  rolePost
);

// UPTDATE
router.put(
  "/:id",
  [
    validateJWT,  
    hasRole(["admin"]),
    
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsRoleForId),

    check("name", "The name is empty").not().isEmpty(),
    check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),

    validateFields,
  ],
  rolePut
);

// DELETE
router.delete(
  "/:id",
  [
    /* validateJWT, */
    /*hasRole("ADMIN"),*/

    check("id", "Not a valid ID").isUUID(4),
    check("id").custom(existsRoleForId),

    validateFields,
  ],
  roleDelete
);

module.exports = router;
