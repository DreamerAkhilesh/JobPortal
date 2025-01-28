import jwt from 'jsonwebtoken' ;

const isAuthenticated = async(req , res , next) => {
    try {
        const token = req.cookies.token ;
        if(!token) {
            return res.status(401).json({
                message:'The User is unAuthenticated',
                success: false
            }) ;
        } ;
        // if got authenticated
        const decode = await jwt.verify(token , process.env.SECRET_KEY) ;
        if(!decode) {
            return res.status(401).json({
                message:'Invalid token',
                success: false
            }) ;
        } ;

        // had stored user id within token previously so now will access it 
        req.id = decode.userId ; // store the id in req's id
        next() ;
    } 
    catch (error) {
        console.log(error) ;
    }
}

export default isAuthenticated ;