import {configureStore} from "@reduxjs/toolkit" 
import authSlice from './authSlice' 
import jobSlice from './jobSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        job:jobSlice,
        // company:companySlice,
        // application:applicationSlice
    }
}) ;

export default store ;
