import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true 
        },
        description:{
            type:String,
            required:true
        },
        requirements:[{
            type:String
        }],
        experienceLevel:{
            type:Number,
            required:true
        },
        salary:{
            type:Number,
            required:true,
        },
        location:{
            type:String,
            required:true
        },
        jobType:{
            type:String,
            required:true
        },
        position:{
            type:String,
            rrequired:true
        },
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Company',
            required:true
        },
        created_by:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    },{timestamps:true}
) ;

export default mongoose.model("jobSchema", jobSchema) ;