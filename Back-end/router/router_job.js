import express from "express" ;
const router = express.Router() ;

import isAuthenticated from "../middleware/isAuthenticated.js";
import { getAdminJob, getAllJobs, getJobById, postJob } from "../controller/controller_job.js";


router.route("/post").post(isAuthenticated , postJob) ;
router.route("/get").get(isAuthenticated , getAllJobs) ;
router.route("/get/:id").get(isAuthenticated , getJobById) ;
router.route("/getadminjobs").get(isAuthenticated , getAdminJob) ;

export default router ;