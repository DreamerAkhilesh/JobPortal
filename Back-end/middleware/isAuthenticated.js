// import jwt from 'jsonwebtoken';

// const isAuthenticated = async (req, res, next) => {
//     try {
//         // Get token from cookies
//         const token = req.cookies.token;

//         // Check if token exists
//         if (!token) {
//             return res.status(401).json({
//                 message: 'The User is Unauthenticated',
//                 success: false,
//             });
//         }

//         // Decode token to get user information
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);

//         if(!decoded){
//             return res.status(401).json({
//                 message:"Invalid token",
//                 success:false
//             })
//         };

//         // If token is valid, decoded will have the user data
//         req.userId = decoded.userId; // store the user ID in the request object
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         console.error('Authentication Error:', error);
//         return res.status(401).json({
//             message: 'Invalid or expired token',
//             success: false,
//         });
//     }
// };

// export default isAuthenticated;


import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies?.token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: 'User is unauthenticated. Token not found.',
                success: false,
            });
        }

        // Verify and decode token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                message: "Invalid or corrupted token",
                success: false
            });
        }

        // Attach user ID to request object
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Authentication Error:', error.message);
        return res.status(401).json({
            message: 'Invalid or expired token. Please login again.',
            success: false,
        });
    }
};

export default isAuthenticated;
