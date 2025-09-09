"use client"
import { useRouter } from "next/navigation"
import { AiOutlineMenu, AiOutlineClose  } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "motion/react"
import { useEffect, useState } from "react";
import axios from "axios";

interface user_type {
    email: string,
    join_date: number,
    username: string
}


export default function Navbar(){
    const [menu_opened, setMenu_opened] = useState<boolean>(false)
    const [userData, setUserData] = useState<user_type | null>(null)
    const route = useRouter()

    // animation variant
    const nav_variant = {
        open: {translateY:0,display:"flex"},
        closed: {translateY:-250,display:"none"}
    }

     //logout
    const Logout = () => {
        localStorage.removeItem('token')
        VerifyUser()
        console.log("logout")
        route.refresh()
    }

    //verify user data
    const VerifyUser = () => {
        axios({
            method: "POST",
            url: "/api/verify",
            data: {token: localStorage.getItem('token')}
        })
        .then( (res) => {
            console.log(res.data)
            if(res.data?.success){
                setUserData(res.data.data)
            }
            else if(res.data?.success == false){}
        })
        .catch( (err) =>{
            console.log(err)
        })
    }

    useEffect(() =>{
        VerifyUser()
    },[])

    return(
        <div>
            <div className="fixed top-0 z-100 flex items-center justify-between w-full bg-primery h-[60px] text-white">
                <button onClick={() => route.push("/")}>
                <div className="flex gap-2 p-2 ml-2">
                    <img width={"50px"} src="/Webpack.png" alt="logo"/>
                    <h1 className="text-blue-200 font-extrabold m-auto text-2xl">Recipes Pack</h1>
                </div>
                </button>
                <div className="visible mr-4 md:hidden">
                    <button onClick={() => setMenu_opened(!menu_opened)}>{menu_opened ? <AiOutlineClose className="text-3xl hover:text-blue-200"/> : <AiOutlineMenu className="text-3xl hover:text-blue-200"/>}</button>
                </div>
                <div className="hidden md:flex gap-4 mr-8">
                    <>
                        {userData == null ? 
                            <>
                                <button onClick={() => route.push("/login")} className="py-2 hover:text-blue-200">Login</button>
                                <motion.button onClick={() => route.push("/signup")} whileHover={{scale:1.05}} className="bg-blue-100 px-4 rounded-xl border-4 text-primery border-blue-200 py-1 hover:text-blue-500">Signup</motion.button>
                            </> 
                            : 
                            <>
                                <button onClick={Logout} className="py-2 hover:text-blue-200">Logout</button>
                                <motion.button whileHover={{scale:1.05}} className="flex items-center gap-2 text-[1.1rem] bg-blue-100 px-4 rounded-xl border-4 text-primery border-blue-200 py-1 hover:text-blue-500"><FaUserCircle className="text-[1.8rem]"/>{userData?.username}</motion.button>
                            </>
                        }
                    
                    </>
                </div>
            </div>

            {/* mobile menu */}
            {<motion.div 
            variants={nav_variant}
            initial={{translateY:-250,display:"none"}}
            animate={menu_opened ? "open" : "closed"}
            transition={{type:"tween"}}
            className="fixed top-0 p-6 mt-[60px] w-full flex flex-col gap-4 bg-primery text-white text-[1.2rem] z-10">
                <button className="py-2 hover:text-blue-200" onClick={() => route.push("/")}>Home</button>
                {userData == null ? 
                    <>
                        <button onClick={() => route.push("/login")} className="py-2 hover:text-blue-200">Login</button>
                        <button className="py-2 hover:text-blue-200">Signup</button>
                    </> 
                    : 
                    <>
                        <button className="py-2 hover:text-blue-200">{userData?.username}</button>
                        <button onClick={Logout} className="py-2 hover:text-blue-200">Logout</button>
                    </>
                }

            </motion.div>}

        </div>
    )
}