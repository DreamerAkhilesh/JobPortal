import multer from "multer";
// Middleware wherever file upload is needed 

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");