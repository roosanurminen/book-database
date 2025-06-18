const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Token needed' });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = data.userId;
        next();
    } catch {
        return res.status(403).json({ error: 'Invalid token' });
    }
}

module.exports = authMiddleware;