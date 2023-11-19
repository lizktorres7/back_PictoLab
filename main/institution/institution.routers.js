const { Router } = require("express");
const { check } = require("express-validator");
const {
  institutionGet,
  institutionPost,
  institutionPut,
  institutionDelete,
} = require("../institution/institution.controllers");
const {
  isRoleValid,
  existsInstitutionForId,
  validateInstitutionName,
} = require("../heplers/validate-db");
const { validateProvince } = require("../heplers/validate-empty");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");

//Definicion de las rutas que manejan solicitudes HTTP GET, POST, PUT y DELETE
const router = Router();


// GET ITEM
router.get("/",
  [
    /* validateJWT, */
    /*hasRole("ADMIN"),*/
    validateFields
  ],
  institutionGet
);

// CREATE
router.post(
  "/",
  [
    /* validateJWT, */
    /* hasRole("ADMIN"), */
    /* check("role").custom(isRoleValid), */
    check("name", "The name is empty").not().isEmpty(),
    check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),
    check("name").custom(validateInstitutionName),

    check("province", "The province is empty").not().isEmpty(),
    check("province").custom(validateProvince),

    check("rol", "The rol is empty").not().isEmpty(),
    check("rol").isLength({ min: 2, max: 20  }).withMessage('The role must be longer than 2 characters and less of 20'),

    check("code", "The code is empty").not().isEmpty(),
    check("code").isLength({ min: 2, max: 20  }).withMessage('The code must be longer than 6 characters and less of 20'),

    validateFields,
  ],
  institutionPost
);

// UPTDATE
router.put(
  "/:id",
  [
    /* validateJWT, */
    /* hasRole("ADMIN"), */
    /* check("role").custom(isRoleValid), */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsInstitutionForId),

    check("name", "The name is empty").not().isEmpty(),
    check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),
    
    check("province", "The province is empty").not().isEmpty(),
    check("province").custom(validateProvince),

    validateFields,
  ],
  institutionPut
);

// DELETE
router.delete(
  "/:id",
  [
    /* validateJWT, */
    //isAdminRole,
    /* hasRole("ADMIN"), */
    check("id", "Not a valid ID").isUUID(4),
    check("id").custom(existsInstitutionForId),

    validateFields,
  ],
  institutionDelete
);

module.exports = router;
