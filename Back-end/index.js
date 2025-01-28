import express from "express" ;
import cookieParser from "cookie-parser" ;
import cors from "cors" ;
const app = express() ;

import dotenv from 'dotenv';
dotenv.config();

// Middleware
app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;
app.use(cookieParser()) ;
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions)) ;


const PORT = process.env.PORT || 3000 ;
app.listen(PORT,()=> { 
    console.log(`Server running at port ${PORT}`) ;
}) ;

// Connect to the database 
import dbConnect from "./config/database.js" ;
dbConnect() ;

import userRouter from "./router/router_user.js";
import companyRouter from "./router/router_company.js";
import jobRouter from "./router/router_job.js" ;
import applicationRouter from "./router/router_application.js" ;

// Now all the API's will come here
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);











