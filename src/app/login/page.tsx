"use client"

import { AiOutlineSend } from "react-icons/ai";
import * as yup from "yup";
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validator from 'validator';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../componenets/nvabar";
import { MdLogin } from "react-icons/md";

export default function Page(){
    const route = useRouter()

    const [passwordScore, setPasswordScore] = useState<number>(0)
    const [passErorr, setPassError] = useState<string | null>(null)
    const [progressBarColor, setProgressBarColor] = useState<string>("red")
    
    const PasswordValid = (password : string) => {
      const passwordValid = validator.isStrongPassword(password ,{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore:true})
      setPasswordScore(passwordValid)
    }

    useEffect(() => {
        if(passwordScore < 50){
        setPassError("Please use minimum 8 character include uppercase number and a symbole")
        setProgressBarColor("red")
        }
        if(passwordScore >= 50){
            setPassError(null)
            setProgressBarColor("green")
        }
    },[passwordScore])

    const userSchema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(8)
    });

    const { register:registeruser, handleSubmit:handleSubmituser, formState: { errors:errorsuser }, reset:resetuser } = useForm({
      resolver: yupResolver(userSchema),
    });


    const onSubmitHandleruser = (data: any) => {
        if(validator.isStrongPassword(data?.password ,{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})){
          axios({
            method: 'post',
            url: `${process.env.URL}/api/login`,
            data: data,
          })
        .then(function (res) {
            //if was success
            if(res.data?.success){
                localStorage.setItem("token", res.headers?.token)
                route.push("/")
            }

          }).catch(function (error) {
            console.log(error);
          }) 
        }
    
    }; 

    return(
        <div>
            <Navbar />
        <div className="mt-40">
            <div className="flex flex-col w-[90%] md:w-[35rem] p-9 m-auto shadow-2xl rounded-2xl border-4 border-gray-200">
                <div className="text-tiny flex gap-2 items-center my-4">
                    <MdLogin className="text-[2rem]"/>
                    <h1 className="font-extrabold text-2xl">Login</h1>
                </div>
                <div className="flex flex-col my-5">
                    <span className="font-bold text-tiny bg-[#F2F2F2] relative top-3 left-6 w-fit text-[1.05rem]">Email</span>
                    <input {...registeruser("email")} className="h-10 rounded-[5px] p-6 border-2 border-gray-300 focus:border-gray-400" type="email" placeholder="example@email.com"/>
                    {errorsuser.email && <p className="text-red-500">Please enter Your email.</p>}
                </div>
                <div className="flex flex-col my-5">
                    <label className="font-bold text-tiny bg-[#F2F2F2] relative top-3 left-6 w-fit text-[1.05rem]">Password</label>
                    <input {...registeruser("password")}  onChange={(v) => PasswordValid(v.target.value) } className="h-10 rounded-[5px] p-6 border-2 border-gray-300 focus:border-gray-400" type="password" placeholder="********"/>
                    {errorsuser.password && <p className="text-red-500">Please enter a strong password.</p>}
                    {passErorr == null || passwordScore == 0 ? null : <p className="text-red-500">{passErorr}</p>}
                </div>
                <div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-100 my-5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${passwordScore}%`,background: progressBarColor, transition:"all .5s"}}></div>
                    </div>
                </div>
                <center>
                    <button onClick={handleSubmituser(onSubmitHandleruser)} className="flex bg-primery text-white px-6 py-2 rounded-[5px] items-center gap-2 my-5 text-[1.2rem]"><AiOutlineSend /> Login</button>
                </center>
            </div>
        </div>
        </div>
    )
}