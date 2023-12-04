const { Router } = require("express");
const { check } = require("express-validator");
const {
  tutorGet,
  tutorPost,
  tutorPut,
  tutorDelete,
} = require("./tutor.controllers");
const {
  isRoleValid,
  existsTutorForId,
} = require("../heplers/validate-db");
const { PhoneNumberValid } = require("../heplers/validate-empty");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");

//Definicion de las rutas que manejan solicitudes HTTP GET, POST, PUT y DELETE
const router = Router();


// GET ITEM
router.get("/", [
  validateJWT, 
  hasRole("admin"),
  /* isAdminRole, */
  validateFields
],
  tutorGet
);

// CREATE
router.post(
  "/",
  [
    validateJWT,
    hasRole("admin"),
    /* isAdminRole, */
    check("name", "The name is empty").not().isEmpty(),
    check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),
    
    check("lastname", "The lastname is empty").not().isEmpty(),
    check("lastname").isLength({ min: 2, max: 20  }).withMessage('The lastname must be longer than 2 characters and less of 20'),

    check("phone", "The phone is empty").not().isEmpty(),
    check("phone").custom(PhoneNumberValid),
    /* check("phone").custom(PhoneExists), */

    check("address", "The years of experience are empty").not().isEmpty(),
    check("address").isLength({ min: 2, max: 50  }).withMessage('The address must be longer than 2 characters and less of 50'),

    validateFields,
  ],
  tutorPost
);

// UPTDATE
router.put(
  "/:id",
  [
    validateJWT,
    hasRole("admin"),
    /* isAdminRole, */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsTutorForId),

    check("name", "The name is empty").not().isEmpty(),
    check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),

    check("lastname", "The lastname is empty").not().isEmpty(),
    check("lastname").isLength({ min: 2, max: 20  }).withMessage('The lastname must be longer than 2 characters and less of 20'),

    check("phone", "The phone is empty").not().isEmpty(),
    check("phone").custom(PhoneNumberValid),
    /* check("phone").custom(PhoneExists), */

    check("address", "The address is empty").not().isEmpty(),
    check("address").isLength({ min: 2, max: 50  }).withMessage('The address must be longer than 2 characters and less of 50'),
    
    validateFields,
  ],
  tutorPut
);

// DELETE
router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("admin"),
    /* isAdminRole, */
    check("id", "Not a valid ID").isUUID(4),
    check("id").custom(existsTutorForId),

    validateFields,
  ],
  tutorDelete
);

module.exports = router;
