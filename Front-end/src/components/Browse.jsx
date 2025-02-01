import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice';
// import useGetAllJobs from '@/hooks/useGetAllJobs';
import Jobs from './Jobs';

const randomJobs = [1, 2,45];

const Browse = () => {
    // useGetAllJobs();
    // const {allJobs} = useSelector(store=>store.job);
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     return ()=>{
    //         dispatch(setSearchedQuery(""));
    //     }
    // },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({randomJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        randomJobs.map((item, index) => {
                            return (
                                // <Job key={job._id} job={job}/>
                                <Job/>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse