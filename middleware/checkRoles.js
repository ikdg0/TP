// middleware/checkRole.js

const jwt = require('jsonwebtoken');


const checkRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).send('Accès refusé. Rôle insuffisant.');
    }
    next();
};


module.exports = checkRole;

