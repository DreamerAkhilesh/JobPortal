import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        // const fetchCompanies = async () => {
        //     console.log("Fetched called") ;
        //     try {
        //         const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
        //         console.log('called');
        //         if(res.data.success){
        //             console.log("Data recieved on front-end") ;
        //             console.log('Fetched companies:', res.data.companies); // Debugging log
        //             dispatch(setCompanies(res.data.companies));
        //         }
        //     } catch (error) {
        //         console.log("Error YO YO");
        //         console.log(error);
        //     }
        // }

        const fetchCompanies = async () => {
            console.log("Fetching companies...");
            try {
                const token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('token='))
                    ?.split('=')[1];
        
                if (!token) {
                    console.log("No token found!");
                    return;
                }
        
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
        
                if (res.data.success) {
                    console.log("Data received on front-end", res.data.companies);
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };        
        fetchCompanies();
        
    },[dispatch]) ;
}

export { useGetAllCompanies };