import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button"; // Named import
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from 'lucide-react'

function Navbar() {
    const user = false ;

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                <h1 className="text-2xl font-bold">
                    Job<span className="text-[#F83002]">Portal</span>
                </h1>
                </div>
                <div className="flex items-center gap-12">
                <ul className="flex font-medium items-center gap-5">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="/browse">Browse</Link></li>
                </ul>

                {/* if there is no user then show different options and if there exist a user show different options */}
                {!user ? (
                    <div>
                        <div className='flex items-center gap-2'>
                            <Link to="/Login"><Button variant="outline">Login</Button></Link>
                            <Link to="/Signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                        </div>
                    </div>
                ) : (<Popover>
                    <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"></AvatarImage>
                    </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 ">
                        <div className="flex gap-4 space-y-2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"></AvatarImage>
                            </Avatar>
                            <div className="">
                                <h4 className="font-medium">Akhilesh Pratap Singh</h4>    
                                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet.</p>                    
                            </div>
                        </div>
                        <div className="flex flex-col my-2 text-gray-600">
                            <div className= 'flex w-fit items-center gap-2 cursor-pointer'>
                                <User2/>
                                <Button variant="link">View Profile</Button>
                            </div>
                            <div className= 'flex w-fit items-center gap-2 cursor-pointer'>
                                <LogOut/>
                                <Button variant="link">Logout</Button>
                            </div>
                        
                        </div>
                    </PopoverContent>
                </Popover>) }
                
                </div>
            </div>
        </div>
    );
}

export default Navbar;
