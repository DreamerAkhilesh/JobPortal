import User from '../model/model_user.js' ;
import bcrypt from 'bcryptjs' ;
import jwt from 'jsonwebtoken' ;
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const register = async(req , res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;

        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: 'Missing required fields',
                success: false
            });
        }

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: 'User already registered with this email',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }    
        });

        return res.status(201).json({
            message: 'Account created successfully',
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error while registering user',
            success: false
        });
    }
};


// export const login = async(req , res) => {
//     try {
//         console.log("Received Login Request:", req.body);
        
//         const { email, password, role } = req.body;

//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 message: 'Missing required fields',
//                 success: false
//             });
//         }

//         const user = await User.findOne({ email });

//         console.log("User Found:", user); // temporary debug

//         if (!user) {
//             return res.status(400).json({
//                 message: 'Invalid email or password',
//                 success: false
//             });
//         }

//         console.log("Checking Password...");
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         console.log("Password Match:", isPasswordMatch);  // 👈 Check if the password is correct
        
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: 'Invalid email or password',
//                 success: false
//             });
//         }

//         if (role !== user.role) {
//             return res.status(400).json({
//                 message: 'Role mismatch',
//                 success: false
//             });
//         }

//         const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

//         const userResponse = {
//             _id: user._id,
//             fullName: user.fullName,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         };

//         return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
//             message: `Welcome back, ${user.fullName}`,
//             user: userResponse,
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: 'Server error while logging in',
//             success: false
//         });
//     }
// };

// export const login = async (req, res) => {
//     try {
//         console.log("📥 Received Login Request:", req.body);

//         const { email, password, role } = req.body;

//         if (!email || !password || !role) {
//             console.log("⚠️ Missing required fields");
//             return res.status(400).json({ message: 'Missing required fields', success: false });
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             console.log("❌ User Not Found for Email:", email);
//             return res.status(400).json({ message: 'Invalid email or password', success: false });
//         }

//         console.log("✅ User Found:", user.email, "| Stored Role:", user.role);

//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         console.log("🔑 Password Match:", isPasswordMatch);

//         if (!isPasswordMatch) {
//             console.log("❌ Password Does Not Match!");
//             return res.status(400).json({ message: 'Invalid email or password', success: false });
//         }

//         if (role !== user.role) {
//             console.log("❌ Role Mismatch! Sent:", role, "| Expected:", user.role);
//             return res.status(400).json({ message: 'Role mismatch', success: false });
//         }

//         const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

//         return res.status(200).cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }).json({
//             message: `🎉 Welcome back, ${user.fullName}`,
//             user: {
//                 _id: user._id,
//                 fullName: user.fullName,
//                 email: user.email,
//                 phoneNumber: user.phoneNumber,
//                 role: user.role
//             },
//             success: true
//         });

//     } catch (error) {
//         console.error("🔥 Server Error:", error);
//         return res.status(500).json({ message: 'Server error while logging in', success: false });
//     }
// };

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async(req , res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: 'strict' }).json({
            message: 'Logged out successfully',
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error while logging out',
            success: false
        });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;

        const file = req.file ;
        const fileUri = getDataUri(file) ;
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        if (!fullName || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({
                message: 'Missing required fields',
                success: false
            });
        }

        // Ensure skills is an array
        const skillArray = Array.isArray(skills) ? skills : skills.split(",");

        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized: No user ID found",
                success: false
            });
        }
        

        const userId = req.userId;  // User ID is stored in req.userId by the authentication middleware
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }

        // Don't allow email update
        if (email) {
            console.log('Email update is not allowed') ;
        }

        // Update fields
        user.fullName = fullName || user.fullName;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.profile.bio = bio || user.profile.bio;
        user.profile.skills = skillArray;
        // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }

        await user.save();

        return res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profile: user.profile,
                role: user.role
            },
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error while updating profile',
            success: false
        });
    }
};

// export const updateProfile = async (req, res) => {
//     try {
//         const { fullName, phoneNumber, bio, skill } = req.body;
//         const file = req.file ? req.file.path : undefined; // Resume file path

//         console.log("Received Data:", req.body);
//         console.log("Uploaded File:", req.file);
        
//         if (!fullName || !phoneNumber || !bio || !skill) {
//             return res.status(400).json({
//                 message: 'Something is missing',
//                 success: false,
//             });
//         }

//         const skillArray = Array.isArray(skill) ? skill : skill.split(",");
//         const userId = req.id; // Fix: use req.id instead of req.user.userId

//         let user = await User.findById(userId);
//         if (!user) {
//             return res.status(400).json({
//                 message: 'User not found',
//                 success: false
//             });
//         }

//         // Updating fields
//         user.fullName = fullName;
//         user.phoneNumber = phoneNumber;
//         user.profile.bio = bio;
//         user.profile.skill = skillArray;

//         if (file) {
//             user.profile.resume = file; // Save resume path if uploaded
//         }

//         await user.save();

//         return res.status(200).json({
//             message: 'Profile updated successfully',
//             user,
//             success: true
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             message: "Internal Server Error",
//             success: false
//         });
//     }
// };
