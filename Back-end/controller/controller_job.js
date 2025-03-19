import Job from '../model/model_job.js' ;

// recruiter user perspective
export const postJob = async(req , res) => {
    try {
        const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;
        const userId = req.userId ;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(404).json({
                message: "Something is missing",
                success:true
            }) ;
        } ;
        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experience,
            position,
            company:companyId,
            created_by:userId
        }) ;
        return res.status(200).json({
            message:"Job has been finally created",
            job,
            success:true
        }) ;
    } 
    catch (error) {
        console.log(error) ;
    }
}

// student user perspective
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            message:"Hello Jobs",
            jobs,
            success: true
        })
    } catch (error) {
        message:"Hello Jobs Bitch",
        console.log(error);
    }
}

// student user perspective
export const getJobById = async(req , res)=> {
    try {
        const jobId = req.params.id ;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job) {
            return res.status(400).json({
                message:"Job not found.",
                success:false
            }) ;
        } ;

        return res.status(200).json({
            messsage:"Job found successfully",
            job,
            success:true
        }) ;
    } 
    catch (error) {
        console.log(error) ;
    }
}


// recruiters user perspective
// all the jobs created till now
export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.userId;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}