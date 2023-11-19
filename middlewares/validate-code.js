const { Role, InstitutionRole } = require("../main/models/index");

const assignRoleToUser = async (req, res, next) => {

    const code = req.body.code; // Obtén el código del cuerpo de la solicitud

    try {
        // Busca el InstitutionRole que coincide con el code del usuario
        const institutionRole = await InstitutionRole.findOne({
            where: {
                code: code,
                state: true
            },
        });

        // Si no se encuentra ningún codigo en InstitutionRole, lanza un error
        if (!institutionRole) {
            console.log('NO SE ECNONTRO CODIGOOOOO ningún InstitutionRole con el código proporcionado.');
            return res.status(401).json({ error: `El código no es válido` });
        }

        return next();


        /* return role.id; */

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'ERROOOOOR del servidor' });
    }
}



/* const { response, request } = require('express'); */
/* const { Role, InstitutionRole } = require("../main/models/index");

const isCodeCorrect = async (req, res, next) => {
    if (!req.body.code) {
        return res.json({ status: 500, error: 'Code not defined' })
    }
    
   /*  const { name, code } = req.user; */

//const code = req.body.code; // Obtén el código del cuerpo de la solicitud */
/* res.json({ status: 500, error: 'User not defined', code: code }) */

/* try {
    // Busca el InstitutionRole que coincide con el code del usuario
    const institutionRole = await InstitutionRole.findOne({
        where: {
            code: code
        },
    });
    // Si no se encuentra ningún InstitutionRole, lanza un error
    if (!institutionRole) {
        return res.json({ status: 401, error: `code is not permitted` }); */
/* return res.json({ status: 401, error: `${name} user is not permitted` }); */
/*  }


 // Luego, busca el Role que coincide con el roleId de InstitutionRole
 const role = await Role.findOne({
     where: {
         id: institutionRole.roleId
     },
 });
 // Si no se encuentra ningún Role, lanza un error
 if (!role) {
     return res.json({ status: 500, error: 'Server error' });
 } */

// Finalmente, asigna el nombre del Role al usuario
/* req.user.roleId = role.name; nooo*/
/* req.user.roleId = role.id; */

/*     } catch (error) {
        console.error(error);
        return res.json({ status: 500, error: 'Server errorrrr' });
    }
    next();
}
 */
module.exports = {
    /* isCodeCorrect */
    assignRoleToUser
}


/* const { response, request } = require('express');
const { Role,
    InstitutionRole,
} = require("../main/models/index");

const isCodeCorrect = async (req = request, res = response, next) => {
    if (!req.user) {
        return res.json({ status: 500, error: 'Code validation before token' })
    }
    const { roleId, name, code } = req.user
    try {
        const code = await InstitutionRole.findOne({
            where: {
                id: roleId
            },
        })
        if (!code.includes(code.name)) {
            //return res.status(401).json({error:`${ req.user.name } user is not permitted`})
            return res.json({ status: 401, error: `${name} user is not permitted` })
        }
    } catch (error) {
        return res.json({ status: 500, error: 'Server error' })
    }
    next();
}



module.exports = {
    isCodeCorrect
} */