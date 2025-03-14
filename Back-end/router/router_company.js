import express from "express" ;
const router = express.Router() ;


import isAuthenticated from "../middleware/isAuthenticated.js";
import {registerCompany , getCompany, getCompanyById, updateCompany } from "../controller/controller_company.js";
import { singleUpload } from "../middleware/multer.js"; //middleware wherever file upload is needed



router.route("/register").post(isAuthenticated , registerCompany) ;
router.route("/get").get(isAuthenticated , getCompany) ;
router.route("/get/:id").get(isAuthenticated ,getCompanyById) ;
router.route("/update/:id").put(isAuthenticated , singleUpload , updateCompany) ;

export default router ;