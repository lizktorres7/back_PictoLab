const { Router } = require("express");
const { check } = require("express-validator");
const {
  teacherGet,
  teacherPost,
  teacherPut,
  teacherDelete,
} = require("./teacher.controllers");
const {
  isRoleValid,
  existsTeacherForId,
} = require("../heplers/validate-db");
const { PhoneNumberValid } = require("../heplers/validate-empty");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");

const router = Router();


// GET ITEM
router.get("/", [
  /* validateJWT, */
  /* hasRole("admin") */
  /* isAdminRole, */
  validateFields
],
  teacherGet
);

// CREATE
router.post(
  "/",
  [
    /* validateJWT, */
    /* hasRole("admin") */
    /* isAdminRole, */
    check("name", "The name is empty").not().isEmpty(),
    check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),

    check("lastname", "The lastname is empty").not().isEmpty(),
    check("lastname").isLength({ min: 2, max: 20  }).withMessage('The lastname must be longer than 2 characters and less of 20'),

    check("phone", "The phone is empty").not().isEmpty(),
    check("phone").custom(PhoneNumberValid),
    /* check("phone").custom(PhoneExists), */

    check("years_experience", "The years of experience are empty").not().isEmpty(),
    check("years_experience").isInt({ min: 0, max: 75 }).withMessage('The years of experience must be between 0 and 75'),

    validateFields,
  ],
  teacherPost
);

// UPTDATE
router.put(
  "/:id",
  [
    /* validateJWT, */
    /* hasRole("admin") */
    /* isAdminRole, */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsTeacherForId),

    check("name", "The name is empty").not().isEmpty(),
    check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),

    check("lastname", "The lastname is empty").not().isEmpty(),
    check("lastname").isLength({ min: 2, max: 20  }).withMessage('The lastname must be longer than 2 characters and less of 20'),

    check("phone", "The phone is empty").not().isEmpty(),
    check("phone").custom(PhoneNumberValid),
    /* check("phone").custom(PhoneExists), */

    check("years_experience", "The years of experience are empty").not().isEmpty(),
    check("years_experience").isInt({ min: 0, max: 75 }).withMessage('The years of experience must be between 0 and 75'),
    validateFields,
  ],
  teacherPut
);

// DELETE
router.delete(
  "/:id",
  [
    /* validateJWT, */
    /* hasRole("admin") */
    /* isAdminRole, */
    check("id", "Not a valid ID").isUUID(4),
    check("id").custom(existsTeacherForId),
    validateFields,
  ],
  teacherDelete
);

module.exports = router;
