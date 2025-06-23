const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({message: 'Authentication required' });
    }
    
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user_id = data.user_id;
        next();
    } catch {
        return res.status(403).json({ error: 'Invalid token' });
    }
}

module.exports = authMiddleware;