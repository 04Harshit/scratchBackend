const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

exports.authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(403);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

exports.authorizeAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    next();
};