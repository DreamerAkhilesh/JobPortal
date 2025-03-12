import express from "express" ;
const router = express.Router() ;


import { register , login , logout , updateProfile } from '../controller/controller_user.js' ;
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js"; //middleware wherever file upload is needed


router.route("/register").post(singleUpload, register) ;
router.route("/login").post(login) ;
router.route("/logout").get(logout) ;
router.route("/profile/update").put(singleUpload, isAuthenticated, updateProfile) ;

export default router ;