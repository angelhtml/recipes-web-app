"use client"

import { FaDotCircle, FaUserCircle } from "react-icons/fa"
import { FaMessage, FaUser } from "react-icons/fa6"
import Navbar from "./nvabar"
import {motion} from "motion/react"
import { useRouter } from "next/navigation"
import axios from "axios"



export default function Recipe({data}:  any){
    const route = useRouter()

    // message button
    const Message = () =>{
        axios({
            method: "POST",
            url: "/api/contact",
            data: {sender_token: localStorage.getItem('token'), getter:data?.author_info[0]?._id}
        })
        .then( (res) => {
            if(res.data?.success){
                route.push(`/chat/${data?.author_info[0]?._id}/${res.data.data.roomId}`)
            }
            else if(res.data?.success == false){
                route.push('/signup')
            }
        })
        .catch( (err) =>{
            console.log(err)
        })
    }


    return(
        <>
        <Navbar />
            <div className="m-4 mt-20 border-gray-100 border-2 rounded-xl shadow-2xl">
                <div className="flex flex-col gap-8 p-4">
                    <h1 className="text-2xl font-bold text-center">{data.name}</h1>
                        <div className='flex justify-between'>
                            <div className="flex items-center gap-2">
                                <FaUserCircle className='text-[2.1rem] text-gray-800'/>
                                <p className='text-gray-800'>{data.author}</p>
                            </div>
                            <motion.button onClick={Message} whileHover={{scale:1.05}} className="flex items-center gap-2 bg-blue-100 border-2 border-blue-200 text-tiny px-4 py-2 rounded-[5px] mr-1 hover:bg-blue-200 hover:text-black"><FaMessage/> Message</motion.button>
                        </div>
                    <ul>
                        <li className="font-extrabold">Ingredients :</li>
                        {data && data.ingredients.map((i:string, index: any) => 
                        <li className="flex items-start gap-2 px-4 pt-1" key={index}>
                            <FaDotCircle className="text-primery text-[.7rem] mt-[.4rem]"/>
                            <p className="text-primery">{i}</p>
                        </li>
                        )}
                    </ul>
                    <ul>
                        <li className="font-extrabold">Method :</li>
                        {data && data.method.map((i:string, index: any) => 
                        <li className="flex items-start px-4 pt-4" key={index}>
                            <p className="text-primery">{index} - {i}</p>
                        </li>
                        )}
                    </ul>
                    <ul>
                        <li className="font-extrabold">Description :</li>
                        <li className="px-4 pt-4">{data.description}</li>
                    </ul>
                    
                    <p className="text-tiny text-[.8rem]">{String(new Date(data.date * 1000))}</p>
                </div>
            </div>
        </>
    )
}