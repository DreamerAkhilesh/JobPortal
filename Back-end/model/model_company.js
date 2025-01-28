import mongoose from "mongoose";

const companySchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true 
        },
        description:{
            type:String,
            required:true
        },
        website:[{
            type:String
        }],
        location:{
            type:Number,
        },
        logo:{
            type:String, // URL to the company logo
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    },{timestamps:true}
) ;

export default mongoose.model("companySchema", companySchema) ;