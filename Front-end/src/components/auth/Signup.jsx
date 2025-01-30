import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../../utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'



const Signup = () => {
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    
    const {loading} =useSelector(store => store.auth) ;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // whenever these handlers are called they are doing the following 
    // putting all the rest of the input values same as before but changing the targetted value only.
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {  //async as api call is happening
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        // Testing ...
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }
        
        try {
            dispatch(setLoading(true)) ;
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a non-2xx status code
                console.error('Error:', error.response.data);
            } else if (error.request) {
                // No response was received
                console.error('Network Error:', error.message);
            } else {
                // Something else caused the error
                console.error('Error:', error.message);
            }
            toast.error(error.response.data.message);
            
        } finally {
            dispatch(setLoading(false)) ;
        }
    } ;

    // useEffect(()=>{
    //     if(user){
    //         navigate("/");
    //     }
    // },[]) ;


  return (
    <div>
        <Navbar />
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullName}
                            name="fullName"
                            onChange= {changeEventHandler}
                            placeholder="Akhilesh Pratap Singh"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange= {changeEventHandler}
                            placeholder="imakhileshpratap@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange= {changeEventHandler}
                            placeholder="8810828730"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password" 
                            value={input.password}
                            name="password"
                            onChange= {changeEventHandler}
                            placeholder="Akhilesh16@ak97"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            {/* Student */}
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
                            {/* Recruiter */}
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
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    {
                        loading ? 
                            <Button className="w-full my-4 "> 
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please Wait
                            </Button>
                            :
                            <Button type="submit" className="w-full my-4 bg-black text-white">Signup</Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
        </div>
    </div>
  )
}

export default Signup