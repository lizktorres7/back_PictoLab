// uploadController.js

module.exports.uploadFile = (req, res, next) => {
    // Aquí puedes hacer cualquier cosa con el archivo cargado
    // ...
};

module.exports.handleUploadError = (error, req, res, next) => {
    // Si no se ha enviado una imagen
    if (error) {
        console.log(error);
        return res.status(400).json({
            msg: "No image has been sent",
        });
    }

    // Si se ha enviado una imagen, continúa con el siguiente middleware
    next();
};
