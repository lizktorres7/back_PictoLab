const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json({ status: 400, errors: error.errors })
    }
    next();
}

module.exports = {
    validateFields
}