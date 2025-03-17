import Company from '../model/model_company.js' ;
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async(req , res) => {
    try {
        const{companyName} = req.body ;
        const userId = req.userId ;
        if(!companyName) {
            return res.status(400).json({
                message:"Company is required.",
                success:false
            }) ;
        } ;
        let company = await Company.findOne({name:companyName}) ;
        if(company) {
            return res.status(400).json({
                message:"You can't register same company.",
                success:false
            }) ;
        } ;
        company = await Company.create({
            name:companyName,
            userId,
        }) ;

        return res.status(200).json({
            message:'The company has been regestered successfully',
            company,
            success:true 
        }) ;
    } 
    catch (error) {
        console.log(error) ;
    }
}

export const getCompany = async(req , res) => {
    try {
        const userId = req.id ;
        const companies = await Company.find({userId}) ;
        if(!companies) {
            return res.status(404).json({
                message:'No such company is found (ERROR 404) .',
                success:false
            }) ;
        } ;

        return res.status(200).json({
            message:"Found the company",
            companies,
            success:true
        }) ;
    } 
    catch (error) {
        console.log(error) ;
    }
}

// get the company by its id
export const getCompanyById = async(req , res) => {
    try {
        const companyId = req.params.id ;
        const company = await Company.findById({companyId}) ;
        if(!company) {
            return res.status(404).json({
                message:'No such company is found (ERROR 404) .',
                success:false
            }) ;
        } ;

        return res.status(200).json({
            company,
            success:true
        }) ;
    } 
    catch (error) {
        console.log(error) ;
    }
}

export const updateCompany = async(req , res) => {
    try {
        const {name , description , website , location} = req.body ;
        const file = req.file ;
        // cloudinary
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url; 

        const updatedData = {name , description , website , location , logo} ;
        const company = await Company.findByIdAndUpdate(req.params.id , updatedData , {new:true}) ;

        if(!company) {
            return res.status(404).json({
                message:'No such company is found (ERROR 404) .',
                success:false
            }) ;
        } ;

        return res.status(200).json({
            message:"Company details successfully updated",
            company,
            success:true
        })
    } 
    catch (error) {
        console.log(error) ;
    }
}