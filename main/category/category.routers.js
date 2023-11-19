const { Router } = require("express");
const { check } = require("express-validator");
const {
    categoryGet,
    categoryPost,
    categoryPut,
    categoryDelete,
} = require("../category/category.controllers");
const {
    isRoleValid,
    existsCategoryForId,
    validateCategoryName,
  } = require("../heplers/validate-db");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");
//const Role = require("../role/role.models");

//Definicion de las rutas que manejan solicitudes HTTP GET, POST, PUT y DELETE
const router = Router();


// GET ITEM
router.get("/", [validateJWT, /* hasRole("ADMIN"), */ validateFields], categoryGet);

// CREATE
router.post("/",
    [
       validateJWT,
       /* hasRole("ADMIN"), */
       check("name", "The name is empty").not().isEmpty(),
       check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),
       check("name").custom(validateCategoryName),
       
       validateFields,
    ],
    categoryPost
);

// UPTDATE
router.put(
    "/:id",
    [
        validateJWT,
        /* hasRole("ADMIN"), */
        check("id", "Not valid id").isUUID(4),
        check("id").custom(existsCategoryForId),

        check("name", "The name is empty").not().isEmpty(),
        check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),
        check("name").custom(validateCategoryName),

        validateFields,
    ],
    categoryPut
);

// DELETE
router.delete(
    "/:id",
    [
        validateJWT,
        /* hasRole("ADMIN"), */
        check("id", "Not valid id").isUUID(4),
        check("id").custom(existsCategoryForId),
        validateFields,
    ],
    categoryDelete
);

module.exports = router;
