const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('No token provided');
    }

    const token = authHeader.replace('Bearer ', '');
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.user = decoded;
        next();
    });
};

module.exports = { authenticate };
