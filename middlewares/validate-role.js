const { response, request } = require('express');
const { Role } = require("../main/models/index");

const isAdminRole = async (req = request, res = response, next) => {
    if (!req.user) {
        return res.json({ status: 500, error: 'Role validation before token' })
    }
    const { roleId, name } = req.user
    try {
        const role = await Role.findOne({
            where: {
                id: roleId
            },
        })
        if (role.name !== 'admin') {
            //return res.status(401).json({error:`${ name } user is not administrator`})
            return res.json({ status: 401, error: `${name} user is not administrator` })
        }
    } catch (error) {
        return res.json({ status: 500, error: 'Server error' })
    }
    next();
}

const hasRole = (...roles) => {

    return async (req = request, res = response, next) => {
        if (!req.user) {
            //return res.status(500).json({error:'Role validation before token'})
            return res.json({ status: 500, error: 'Role validation before token' })
        }

        try {
            const { roleId } = req.user
            const role = await Role.findOne({
                where: {
                    id: roleId
                },
            })
            if (!roles.includes(role.name)) {
                //return res.status(401).json({error:`${ req.user.name } user is not permitted`})
                return res.json({ status: 401, error: `User is not permitted` })
            }
        } catch (error) {
            return res.json({ status: 500, error: 'Server error' })
        }



        next();
    }

}

module.exports = {
    isAdminRole,
    hasRole
}