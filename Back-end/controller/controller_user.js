import User from '../model/model_user.js' ;
import bcrypt from 'bcryptjs' ;
import jwt from 'jsonwebtoken' ;

export const register = async(req , res) => {
    try {
        const {fullName , email , phoneNumber , password , role} = req.body ;
        if(!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message:'Something is missing',
                success:false
            }) ;
        } ;

        const user = await User.findOne({email}) ;
        if(user) {
            return res.status(400).json({
                message:'User already present with the email Id',
                success:false
            }) ;
        } ;

        const hashedPassword = await bcrypt.hash(password , 10) ;

        await User.create({
            fullName, 
            email, 
            phoneNumber, 
            password:hashedPassword  , 
            role
        }) ;

        return res.status(201).json({
            message:"Account created successfully",
            success:true
        }) ;
    }
    catch(error) {
        console.log(error) ;
    }
}

export const login = async(req , res) => {
    try {
        const{email , password , role} = req.body ;
        if(!email || !password || !role) {
            return res.status(400).json({
                message:'Something is missing',
                success:false
            }) ;
        } ;
        
        let user = await User.findOne({email}) ; // this user contains User and Password
        if(!user) {
            return res.status(400).json({
                message:'Incorrect Email or Email',
                success:false
            }) ;
        } ;

        const isPasswordMatch = await bcrypt.compare(password , user.password) ;
        if(!isPasswordMatch) {
            return res.status(400).json({
                message:'Incorrect Email or Email',
                success:false
            }) ;
        } ;

        // Also check if the role is same or not 
        if(role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role",
                success:false
            }) ;
        } ;

        // Generate JWT token
        const tokenData = {
            userId:user._id // contains user id
        }
        const token = jwt.sign(tokenData , process.env.SECRET_KEY , {expiresIn:'1d'}) ;

        user = {
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        }) ;

    }
    catch(error) {
        console.log(error) ;
    }
}

export const logout = async(req , res) => {
    try {
        return res.status(200).cookie("token" , "" , {maxAge:0}) ;
    }
    catch(error) {
        console.log(error) ;
    }
}

export const updateProfile = async(req , res) => {
    try {
        const {fullName , email , phoneNumber , bio , skill} = req.body ;
        const file = req.file ; // for resume
        if(!fullName || !email || !phoneNumber || !bio || !skill) {
            return res.status(400).json({
                message:'Something is missing',
                success:false
            }) ;
        } ;

        // cloudinary for resume thing in future

        let skillArray ;
        if(skill) skillArray = skill.split(",") ;
        const userId = req.id ; // middleware authentication
        let user = await User.findById(userId) ;

        if(!user) {
            return res.status(400).json({
                message:'User not found',
                success:false
            }) ;
        }

        // updating data
        if(fullName) user.fullName = fullName;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skill) user.profile.skill = skillArray;

        // in future resume updation will be possible and will it here


        await user.save() ;

        user = {
            UserId:user._id,
            fullname:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:'Profile updated successfully',
            user,
            success:true
        }) ;
    } 
    catch (error) {
        console.log(error) ;
    }
}