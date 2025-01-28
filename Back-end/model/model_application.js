import mongoose from "mongoose";

const applicationSchema = mongoose.Schema(
    {
        job:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'job',
            required:true
        },
        applicant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        status:{
            type:String,
            enum:['pending','accepted','rejected'],
            default:'pending',
            required:true
        }
    },{timestamps:true}
) ;

export default mongoose.model("applicationSchema", applicationSchema) ;