import jwt from 'jsonwebtoken'
import User from '../models/users.model.js'

export const protectRoute = async (req, res, next) => {
    try {
        // Retrieve the token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No Token Provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized: Invalid Token' });
        }

        // Find the user by ID (extracted from token payload)
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        // Attach user info to the request object
        req.user = user;
        console.log(req.user)
        // Pass control to the next middleware/route
        next();
    } catch (error) {
        console.error('[Middleware: protectRoute Error]:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};