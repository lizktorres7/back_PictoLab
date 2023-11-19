const { getUserJWT } = require("../main/heplers/get-userJWT")

const hasPermission = async (req, res, next) => {
    
    try {
        const { id } = req.params;
        let user = getUserJWT(req)
        console.log("USER", user.name)
        if (id != user.id) {
            return res.json({ status: 401, error: "This user is not the owner" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.json({
            status: 401,
            error: "Talk to the administrator",
        });
    }
};

module.exports = {
    hasPermission,
};
