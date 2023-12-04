const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPost,
  usersPut,
  usersDelete,
} = require("../../main/user/user.controllers");
const {
  isRoleValid,
  emailExists,
  existsUserForId,
} = require("../heplers/validate-db");
const { NameNotEmpty, EmailNotEmpty, PhoneNumberValid } = require("../heplers/validate-empty");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");

const router = Router();


// GET ITEM
router.get("/", [
 validateJWT,
  hasRole("admin"),
  /* isAdminRole, */
  validateFields
],
  userGet
);

// CREATE
router.post(
  "/",
  [
    validateJWT,
    hasRole("admin"),
    /* isAdminRole, */

    check("email", "The email is invalid").isEmail(),
    check("email").custom(emailExists),
    check("password", "Invalid password, must exceed 6 characters").isLength({
      min: 6,
    }),

    validateFields,
  ],
  userPost
);

// UPTDATE
router.put(
  "/:id",
  [
    validateJWT,
    hasRole("admin"),
    /* isAdminRole, */
    check("email").custom(EmailNotEmpty),
    check("email", "The email is invalid").isEmail(),
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsUserForId),
    validateFields,
  ],
  usersPut
);

// DELETE
router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("admin"),
    /* isAdminRole, */
    check("id", "Not a valid ID").isUUID(4),
    check("id").custom(existsUserForId),
    validateFields,
  ],
  usersDelete
);

module.exports = router;
