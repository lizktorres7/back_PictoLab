const allowedOptions = require('../main/heplers/cors-config');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOptions.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatues: 200
}

const credentials = (req, res, next) => {
    const origin = req.headres.origin;
    if(allowedOptions.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = {corsOptions, credentials};





