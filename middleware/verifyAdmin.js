const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Accès refusé. Aucun token fourni.');
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.user = decoded;

        if (req.user.role !== 'administrateur') {
            return res.status(403).send('Accès refusé. Rôle administrateur requis.');
        }

        next();
    } catch (error) {
        res.status(400).send('Token invalide.');
    }
};


module.exports = verifyAdmin;