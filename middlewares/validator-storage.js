const { check, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next(); //Si no hay error continua al controlador
    } catch (err) {
        res.status(403);
        res.send({ error: err.array() })
    }
};

const validatorGetItem = [
    check ("id")
    .exists()
    .notEmpty()
    .isInt(),

    validateResult
];

module.exports = { validatorGetItem };
