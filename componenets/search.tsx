"use client"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

export default function Search(){
    const [result, setResult] = useState<[]>([])

    const variant = {
        open: {translateX:"0px"},
        closed: {translateY:"0px"}
    }

    const Find = async (i: string) => {
        try {
          const response = await fetch('/api/search', { // Target your API endpoint
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: i }), // Send data as JSON
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if(i != ""){
            setResult(data)
          }
          else{
            setResult([])
          }
          
          // Handle successful response, e.g., clear form, show success message
        } catch (error) {
          console.error('Error posting data:', error);
          // Handle errors, e.g., show error message to user
        }
    }

    return(
        <>
        <div className="w-[90%] ml-[5%] my-[4rem]">
            <div className="h-14 border-2 border-gray-100 shadow-2xl rounded-3xl flex items-center justify-between">
                <input onChange={(i) => Find(i.target.value)} className="w-[100%] ml-4 focus:border-0 outline-0" type="text" placeholder="Search ..."/>
                <FaSearch className="mr-4"/>
            </div>
            
            <div className="max-h-80 overflow-y-scroll overflow-x-hidden">
            <AnimatePresence>
                {result.map((i:any, index:any) => 

                    <motion.div key={index} initial={{translateX:"-150px"}} animate={result ? "open" : "closed"} variants={variant} className="h-14 p-8" >
                        <Link href={`/index/${i._id}`} target="_blank" className="flex items-center gap-2">
                            <FaChevronRight />
                            <p>{i.name}</p>
                        </Link>

                    </motion.div>

                )}
            </AnimatePresence>
            </div>
        </div>
        </>
    )
}