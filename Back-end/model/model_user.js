import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true 
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        phoneNumber:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:['Student','Recruiter'],
            required:true
        },
        profile:{
            bio:{type:String},
            skill:[{type:String}],
            resume:{type:String}, // URL to resume file
            resumeOriginalName:{type:String},
            company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
            profilePhoto:{type:String,default:""}
        }
    },{timestamps:true}
) ;

export default mongoose.model("User", userSchema) ;