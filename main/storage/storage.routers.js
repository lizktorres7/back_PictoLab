const express = require("express");
const uploadMiddleware = require("../heplers/uploadMiddleware");

const { Router } = require("express");
const { check } = require("express-validator");
const { validatorGetItem } = require("../../middlewares/validator-storage")
const { handleUploadError } = require('../heplers/uploadController');
const { getItems, getItem, createItem, deleteItem } = require("../storage/storage.controllers");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const {existsImgForId} = require("../heplers/validate-db")

const router = Router();

// GET ITEMS
router.get("/",
    [
        /* validateJWT, */
        check("id").custom(existsImgForId),
        validateFields,
    ],

    getItems);

router.get("/:id",
    [
        /*  validateJWT, */
        check("id").custom(existsImgForId),
        validatorGetItem,
    ],
    getItem);

router.post("/",
    [
        /* validateJWT,  */
        uploadMiddleware.single("myfile"),
        handleUploadError,
    ],
    createItem
);

router.delete("/:id",
    [
        /*  validateJWT, */
        check("id").custom(existsImgForId),
        validatorGetItem,
    ],
    deleteItem);


module.exports = router;