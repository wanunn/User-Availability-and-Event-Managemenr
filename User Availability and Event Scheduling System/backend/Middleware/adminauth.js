const jwt = require('jsonwebtoken');

const adminauth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.jwt_secret_key); // Use your actual JWT secret
        req.user = decoded; 
        if(req.user.role=='admin'){
            next();
        }else{
            res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = adminauth;
