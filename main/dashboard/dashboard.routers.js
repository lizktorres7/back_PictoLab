const { Router } = require("express");
const { check } = require("express-validator");
const {
  dashboardGet,
  dashboardPost,
  dashboardPut,
  dashboardDelete,
} = require("../dashboard/dashboard.controllers");
const {
  isRoleValid,
  existsDashboardForId,
  existsCategoryForId,
  existsPictogramForId,
  validateDashboardName
} = require("../heplers/validate-db");
const {
  NameNotEmpty,
  validateRating
} = require("../heplers/validate-empty");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { hasPermission } = require("../../middlewares/validate-permissions");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");


//Definicion de las rutas que manejan solicitudes HTTP GET, POST, PUT y DELETE
const router = Router();


// GET ITEM
router.get("/", [/* validateJWT, */ /* hasRole("ADMIN"), */ validateFields], dashboardGet);

// CREATE
router.post("/",
  [
    /* validateJWT, */
    /* hasRole("ADMIN"), */
    check("name", "The name is empty").not().isEmpty(),
    check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),
    check("name").custom(validateDashboardName),

    check("rating").custom(validateRating), 

    check("categoriesIds", "The dashboard must have at least one category").not().isEmpty(),
    check("categoriesIds").custom(existsCategoryForId), 

    check("pictogramsIds", "The dashboard must have at least one pictogram").not().isEmpty(),
    check("pictogramsIds").custom(existsPictogramForId), 

    validateFields,
  ],
  dashboardPost);

// UPTDATE
router.put(
  "/:id",
  [
    /* validateJWT, */
    /* hasRole("ADMIN"), */
    /* hasPermission, */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsDashboardForId),
    check("name", "The name is invalid").not().isEmpty(),
    check("name").custom(NameNotEmpty),
    check("rating").custom(validateRating),
    check("categoriesIds", "The dashboard must have at least one category").not().isEmpty(),
    check("categoriesIds").custom(existsCategoryForId), 
    check("pictogramsIds", "The dashboard must have at least one pictogram").not().isEmpty(),
    check("pictogramsIds").custom(existsPictogramForId), 

    validateFields,
  ],
  dashboardPut
);

//DELETE
router.delete(
  "/:id",
  [
    /* validateJWT, */
    /* hasPermission, */
    /* hasRole("ADMIN"), */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsDashboardForId),
    validateFields,
  ],
  dashboardDelete
);

module.exports = router;
