const { response, request } = require("express");
const { User } = require("../models/index.js");
const jwt = require("jsonwebtoken");

/**
 * OBTENER USUARIO DEL JWT
 * @param {*} req 
 * @returns 
 */
const getUserJWT = async (req = request) => {
   
    const token = req.header("x-token");
    try {
      const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
      const user = await User.findByPk(uid);
      if (!user || !user.state) {
        console.log("INVALID");
        return undefined;
      }
      console.log("ALL GOOD");
      return user;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

module.exports = {
    getUserJWT,
};

