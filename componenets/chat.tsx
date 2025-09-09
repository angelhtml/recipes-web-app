"use client"

import { useEffect, useRef, useState } from "react";
import {io} from "socket.io-client";
import { useRouter } from "next/navigation";
const socket = io(`${process.env.SOKET_URL}`);
import { FaUserCircle } from "react-icons/fa";
import Navbar from "./nvabar";


interface sender_token_type {
    email: string,
    join_date: number,
    uniqid: string,
    username: string,
    _id: string
}



export default function Chat({props, getter_info} : any){
    const messagesEndRef = useRef<HTMLDivElement>(null);

    
    console.log(process.env.SOKET_URL)


    const route = useRouter()
    const [message, setMessage] = useState("")
    const [messageReceived, setMessageReceived] = useState<any>([])
    const [oldMessage, setOldMessage] = useState([])

    const [room, setRoom] = useState("")
    const [sender, setSender] = useState("")
    const [to, setTo] = useState("")
    const [senderInfo, setSenderInfo] = useState<sender_token_type>()

    useEffect(() => {
        const load = async ()=>{
            await GetUserInfo()
            setRoom(props?.roomid)
            setTo(props?.slug)
            JoinRoom()
        }
        load()
    },[room])

    // send message button
    const SendMassage = () => {
        if(message != ""){
            socket.emit("send_message", {message, room, sender, to})
            setMessageReceived((messageReceived : any )=> [...messageReceived, {message, room, sender, to}]);
            //clear the input after send the message
            setMessage("")
            scrollToBottom()
        }
    }

    const JoinRoom = () => {
        
        if(room !== ""){
            socket.emit("join_room", room)

            //get old messages in same room
            socket.on("old_message", (data) => {
                setOldMessage(data);
            })
        }
    }
    
        useEffect(() => {
                socket.on("receive_message", (data) => {
                    setMessageReceived((messageReceived:any) => [...messageReceived, data]);
                    //console.log("data: ",messageReceived)
                })
            },[socket])


        async function GetUserInfo(){

            try{
                const posts = await fetch('/api/verify', {
                    next: {revalidate: 60},
                    method: "post",
                    body: JSON.stringify({token: localStorage.getItem('token')})
                })

                const result = await posts.json();

                //token verified
                if(result.success){
                    setSender(result.data._id)
                    //console.log(result.data)
                    setSenderInfo(result.data)
                }
                else if(result.success == false){
                    route.push("/signup")
                }
                else{
                    route.push("/signup")
                }
            }
            
            catch(err){
                console.log(err)
            }

        }


          const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  };

    return(
        <div>
            <Navbar />
            <div style={{height:"90vh",overflow:"auto", marginBottom:"0rem",display:"flex",flexDirection:"column-reverse",marginTop:"10vh"}} className="message_container">
                <div style={{display:"flex",flexDirection:"column",padding:"0 15px"}}>
                {/* list of old messages */}
                {oldMessage && oldMessage.map((i:any) => 
                        <div key={i._id} className="flex flex-col">
                            <div className="flex gap-2">
                            {i.sender == sender ? <FaUserCircle className="text-4xl mt-4 text-blue-400"/> : <FaUserCircle className="text-4xl mt-4 text-blue-200"/>}
                            <div style={{background: i.sender == sender ? "#8ec5ff" : "#bedbff"}} className="max-w-3/4 my-2 flex flex-col rounded-md px-6 py-2 shadow-xl">
                                <b>{i.sender == sender ? senderInfo?.username : getter_info[0].username}</b>
                                <p className="px-4">{i.content}</p>
                            </div>
                        </div>
                        </div>
                )}

                {/* load new messages */}
                {messageReceived && messageReceived.map((i:any, index:any) => (
                    <div key={index}>
                        <div className="flex gap-2">
                            {i.sender == sender ? <FaUserCircle className="text-4xl mt-4 text-blue-400"/> : <FaUserCircle className="text-4xl mt-4 text-blue-200"/>}
                            <div style={{background: i.sender == sender ? "#8ec5ff" : "#bedbff"}} className="max-w-3/4 my-2 flex flex-col rounded-md px-6 py-2 shadow-xl">
                                <b>{i.sender == sender ? senderInfo?.username : getter_info[0].username}</b>
                                <p className="px-4">{i.message}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div  ref={messagesEndRef} className="h-10"></div>
                </div>
                
            </div>


            <div className="fixed bottom-0 w-full bg-white">
                <div className="flex">
                    <input value={message} className="h-10 w-full" onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Message ..." />
                    <button className="px-4 bg-purple-600 text-white" onClick={SendMassage}>send</button>
                </div>
            </div>
        </div>
    )
}