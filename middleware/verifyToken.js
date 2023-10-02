const jwt = require('jsonwebtoken');

// Vérification du token JWT
function verifyToken(req, res, next) {
    const token = req.session.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Token non trouvé' });
    }

    jwt.verify(token, 'foo', (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }
        req.user = decodedToken.userId;
        next();
    });
}

module.exports = verifyToken;
