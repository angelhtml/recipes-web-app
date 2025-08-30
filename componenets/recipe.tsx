"use client"

import { FaDotCircle } from "react-icons/fa"
import { FaUser } from "react-icons/fa6"



export default function Recipe({data}:  any){



    return(
        <>
            <div className="m-4 border-gray-100 border-2 rounded-xl shadow-2xl">
                <div className="flex flex-col gap-8 p-4">
                    <h1 className="text-2xl font-bold text-center">{data.name}</h1>
                    <div className='flex items-center gap-2'>
                        <FaUser className='text-[1.2rem] text-gray-800'/>
                        <p className='text-gray-800'>{data.author}</p>
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