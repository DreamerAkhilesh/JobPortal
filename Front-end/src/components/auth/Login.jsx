// import React, { useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { RadioGroup } from '../ui/radio-group'
// import { Button } from '../ui/button'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { USER_API_END_POINT } from '../../utils/constant'
// import { toast } from 'sonner'
// import { useDispatch, useSelector } from 'react-redux'
// import { setLoading, setUser } from '../../redux/authSlice'
// import { Loader2 } from 'lucide-react'

// const Login = () => {
//     const [input, setInput] = useState({
//         email: "",
//         password: "",
//         role: "",
//     });

//     const {loading} =useSelector(store => store.auth) ;
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     // whenever these handlers are called they are doing the following 
//     // putting all the rest of the input values same as before but changing the targetted value only.
//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }

//     const submitHandler = async (e) => {  //async as api call is happening
//         e.preventDefault();
        
//         try {
//             dispatch(setLoading(true)) ;
//             console.log("Sending Login Data:", input);
//             const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
//                 headers: { 'Content-Type': "application/json" },
//                 withCredentials: true, // Necessary if your server sends cookies
//             });
//             if (res.data.success) {
//                 dispatch(setUser(res.data.user)) ; // as the controller returns the user onsuccessful login
//                 // accordingly change the navbar that it displays the user

//                 navigate("/");
//                 toast.success(res.data.message);
//                 console.log(res.data); // Logging the correct variable
//                 console.log(`Welcome back, ${res.data.user.fullName}`);
//             }
//         } catch (error) {
//             if (error.response) {
//               // Server responded with a status code outside the 2xx range
//               console.error(error.response.data.message);
//               alert(error.response.data.message);
//             } else if (error.request) {
//               // No response received from the server
//               console.error('No response from server:', error.request);
//               alert('Network error. Please check your connection.');
//             } else {
//               // Something went wrong in setting up the request
//               console.error('Error:', error.message);
//             } ;
//           } finally {
//             dispatch(setLoading(false)) ;
//           }; 
//     } ;

//   return (
//     <div>
//         <Navbar />
//         <div className='flex items-center justify-center max-w-7xl mx-auto'>
//         <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
//                     <h1 className='font-bold text-xl mb-5'>Login</h1>
//                     <div className='my-2'>
//                         <Label htmlFor="email">Email</Label>
//                         <Input
//                             type="email"
//                             value={input.email}
//                             name="email"
//                             onChange= {changeEventHandler}
//                             placeholder="imakhileshpratap@gmail.com"
//                         />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Password</Label>
//                         <Input
//                             type="password" 
//                             value={input.password}
//                             name="password"
//                             onChange= {changeEventHandler}
//                             placeholder="Akhilesh16@ak97"
//                         />
//                     </div>
//                     <div className='flex items-center justify-between'>
//                         <RadioGroup className="flex items-center gap-4 my-5">
//                             {/* Student */}
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     id="role-student"
//                                     type="radio"
//                                     name="role"
//                                     value="Student"
//                                     checked={input.role === 'Student'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                 />
//                                 <Label htmlFor="role-student">Student</Label>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     id="role-recruiter"
//                                     type="radio"
//                                     name="role"
//                                     value="Recruiter"
//                                     checked={input.role === 'Recruiter'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                 />
//                                 <Label htmlFor="role-recruiter">Recruiter</Label>
//                             </div> 
//                         </RadioGroup>
//                     </div>
//                     {
//                         loading ? 
//                             <Button className="w-full my-4 "> 
//                                 <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                                 Please Wait
//                             </Button>
//                             :
//                             <Button type="submit" className="w-full my-4 bg-black text-white">Login</Button>
//                     }
//                     <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
//                 </form>
//         </div>
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="Student"
                                    checked={input.role === 'Student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="Recruiter"
                                    checked={input.role === 'Recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login