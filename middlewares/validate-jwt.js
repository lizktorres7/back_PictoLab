const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../main/models/index");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    //return res.status(401).json({error:'Token not found'})
    return res.json({ status: 401, error: "Token not found" });
  } else {
    try {
      const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); //lanza un error si no es valido
      const user = await User.findByPk(uid);
      //const user = await User.findById({ where: { uid } });
      //verificar que el usuario no este borrado o que exista en la db
      if (!user || !user.state) {
        return res.json({ status: 401, error: "Invalid token" });
      }
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.json({
        status: 401,
        error: "Invalid token or malformed json",
      });
    }
  }
};


module.exports = {
  validateJWT,
};
