const jwt = require('jsonwebtoken');


// Vérification du token JWT
function verifyToken(req, res, next) {
    const token = req.session.token;
    
    if (!token) {
       return res.redirect('/login');
    }
  
    jwt.verify(token, 'foo', (err, decodedToken) => {
      if (err) {
        // return res.redirect('/login');
        res.send("token existe")
      }
      req.user = decodedToken.userId;
      next();
    });
  }

  module.exports = verifyToken;