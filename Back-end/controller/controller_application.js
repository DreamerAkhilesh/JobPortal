import application from '../model/model_application.js' ;
import Job from '../model/model_job.js' ;

export const applyJob = async(req , res) => {
    try {
        const userId = req.id ;
        const jobId = req.params.id ;

        if(!jobId) {
            return res.status(404).json({
                message:"Job Not Found",
                success:false
            }) ;
        } ;

        // check if the user had already applied for it or not 
        const existingApplication = await application.findOne({job:jobId , applicant:userId}) ;
        if(existingApplication) {
            return res.status(400).json({
                message:"The applicant has already applied for the role",
                success:false
            }) ;
        } ;

        // check if the job exists or not 
        const job = await Job.findById(jobId) ;
        if(!job) {
            return res.status(400).json({
                message:"Job does not exist",
                success:false
            }) ;
        } ;

        // create new application 

        const newpplication = await application.create({
            job:jobId,
            applicant:userId
        }) ;

        job.applications.push(newpplication._id) ;
        await job.save() ;

        return res.status(200).json({
            message:"Job applied successfully.",
            job,
            success:true
        }) ;
    } 
    catch (error) {
        console.log(error) ;
    }
}


export const getAppliedJobs = async(req , res) => {
    try {
        const userId = req.id ;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path: 'job',
            options: {sort:{createdAt:-1}},
            populate: {
                path: 'company',
                options: {sort:{createdAt:-1}},
            }
        }) ;

        if(!application) {
            return res.status(400).json({
                message:"No Application was found.",
                success:false
            }) ;
        } ;

        return res.status(200).json({
            application,
            success: true,
        })
    } 
    catch (error) {
        console.log(error) ;
    }
}

// get applicants from the view of recruiter 

export const getApplicants = async(req, res) => {
    try {
        const jobId = req.params.id ;
        const job = await Job.findById(jobId).populate({
            path: 'application',
            options: {sort:{createdAt:-1}},
            populate: {
                path: 'applicants',
                options: {sort: {createdAt:-1}},
            }
        }) ;
        if(!job) {
            return res.status(400).json({
                message:"No applicant was found.",
                success:false
            }) ;
        } ;

        return res.status(200).json({
            job,
            success: true,
        })

    } catch (error) {
        console.log(error) ;
    }
}

export const updateStatus = async(req, res) => {
    try {
        const {status} = req.body ;
        const applicationId = req.params.id ;
        if(!status) {
            return res.status(400).json({
                message: "Status is required.",
                success: false
            }) ;
        } ;
        // find the application by application id
        const application = await Application.findOne(applicationId) ;
        if(!application) {
            return res.status(400).json({
                message: "Application not found.",
                success: false
            }) ;
        } ;

        // update the status
        application.status = status.toLowerCase ;
        await application.save() ;
        
        res.status(200).json({
            application,
            message:"Application's status has been updated.",
            success: true,
        })
    } catch (error) {
        console.log(error) ;
    }
}