const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../../picto_storage`;
        cb(null, pathStorage);
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".").pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename);
    },
});

const fileFilter = (req, file, cb) => {
    // Acepta solo imágenes
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('No image has been sent'), false);
    }
}; 


const uploadMiddleware = multer ({storage, fileFilter});

module.exports = uploadMiddleware;