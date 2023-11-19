const { Router } = require("express");
const { check } = require("express-validator");
const { login, register } = require("../../main/auth/auth.controllers");

const { validateFields } = require("../../middlewares/validate-fields");
const {PhoneNumberValid} = require("../heplers/validate-empty");
const { isCodeCorrect, assignRoleToUser } = require("../../middlewares/validate-code");

const { emailExists } = require("../heplers/validate-db");

const router = Router();

router.post(
  "/login",
  [
    check("email", "The email is invalid").isEmail(),
    check("password", "The email is invalid").not().isEmpty(),
    check("code", "The code is invalid").optional().isString(),
    validateFields,
    /* assignRoleToUser, */
  ],
  login
);

router.post(
  "/register",
  [

    check("email", "The email is invalid").isEmail(),
    check("password", "The password is invalid").not().isEmpty(),
    check("password", "Invalid password, must exceed 6 characters").isLength({
      min: 6,
    }),
    check("email").custom(emailExists),
    /* assignRoleToUser, */
    validateFields,
  ],
  register
);

module.exports = router;
