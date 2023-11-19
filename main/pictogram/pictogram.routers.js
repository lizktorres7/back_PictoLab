const { Router } = require("express");
const { check } = require("express-validator");
const {
  pictogramGet,
  pictogramPost,
  pictogramPut,
  pictogramDelete,
} = require("../pictogram/pictogram.controllers");
const { validateFields } = require("../../middlewares/validate-fields");
const { 
  validatePictogramName, 
  existsCategoryForId, 
  existsSynonymForId, 
  existsImgForId,
  existsPictogramForId } = require("../heplers/validate-db")
const { validateJWT } = require("../../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../../middlewares/validate-role");
//const Role = require("../role/role.models");

//Definicion de las rutas que manejan solicitudes HTTP GET, POST, PUT y DELETE
const router = Router();

router.get("/", [validateJWT, /* hasRole("ADMIN"), */ validateFields], pictogramGet);

router.post(
  "/", 
  [
    validateJWT, 
    /* hasRole("ADMIN"), */ 
    check("name", "The name is empty").not().isEmpty(),
    check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),
    check("name").isAlpha().withMessage('The name must contain only letters'),
    check("name").custom(validatePictogramName),

    check("description").isLength({ max: 255  }).withMessage('The description must be longer than 2 characters and less of 255'),

    check("synonymsIds", "The synonym is empty").not().isEmpty(),
    check("synonymsIds").custom(existsSynonymForId),

    check("categoriesIds", "The category is empty").not().isEmpty(),
    check("categoriesIds").custom(existsCategoryForId),

    check("storageId", "The image is empty").not().isEmpty(),
    check("storageId").custom(existsImgForId),

    validateFields,
  ], 
  pictogramPost
  );

router.put(
  "/:id",
  [
    validateJWT,
    /* hasRole("ADMIN"), */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsPictogramForId),

    check("name", "The name is empty").not().isEmpty(),
    check("name").isLength({ min: 2, max: 20  }).withMessage('The name must be longer than 2 characters and less of 20'),
    check("name").isAlpha().withMessage('The name must contain only letters'),
    check("name").custom(validatePictogramName),

    check("description").isLength({ max: 255  }).withMessage('The description must be longer than 2 characters and less of 255'),

    check("synonymsIds", "The synonym is empty").not().isEmpty(),
    check("synonymsIds").custom(existsSynonymForId),

    check("categoriesIds", "The category is empty").not().isEmpty(),
    check("categoriesIds").custom(existsCategoryForId),

    check("storageId", "The image is empty").not().isEmpty(),
    check("storageId").custom(existsImgForId),
    validateFields,
  ],
  pictogramPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    /* hasRole("ADMIN"), */
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsPictogramForId),

    validateFields,
  ],
  pictogramDelete
);

module.exports = router;
