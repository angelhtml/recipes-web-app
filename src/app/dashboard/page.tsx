"use client"

import { useEffect, useState } from "react"
import Navbar from "../../../componenets/nvabar"
import { GetUsers } from "../../../services/getUsers"
import { AiOutlineRead, AiOutlineUser } from "react-icons/ai"
import UserVerify from "../../../services/userVerify"
import { useRouter } from "next/navigation"
import { GetAdminRecipe } from "../../../services/getAdminRecipes"


export default function Page(){
    const route = useRouter()
    const [admin, setAdmin] = useState<boolean>(false)
    const [tab, setTab] = useState<string>("users")
    const [users, setUsers] = useState([])
    const [recipes, setRecipes] = useState([])

    //verify only admin can get access to this page
        const VerifyUser = async () => {
            const user_token = localStorage.getItem('token')
            const user_verifing : any = await UserVerify(String(user_token))

            if(user_verifing?.success && user_verifing?.admin){
                setAdmin(true)
            }

            else if(user_verifing?.success == false || user_verifing?.admin == false){
                route.push("/")
            }

            else{
                setAdmin(false)
            }
        }

    // get users
    const Get_Users = async () =>{
        const get_users = await GetUsers()
        console.log(get_users)
        setUsers(get_users) 
    }

    // get recipes
    const Get_Recipes = async () => {
        const get_recipes = await GetAdminRecipe()
        console.log(get_recipes)
        setRecipes(get_recipes) 
    }

    useEffect(() => {
        VerifyUser()

        if(tab == "users"){
            Get_Users()
        }
        else if(tab == "recipes"){
            Get_Recipes()
        }
          
    },[tab])
    
    return(
        <div>
            {admin ? <div>
                <Navbar />
                <div className="flex w-[100%] h-[90vh] mt-[10vh]">
                    <div className="w-[16rem] flex flex-col gap-6">
                        <button onClick={() => setTab("users")} className="flex gap-2 items-center justify-center bg-blue-400 mx-8 px-4 py-2 rounded-[5px] shadow-2xl text-white"><AiOutlineUser />Users</button>
                        <button onClick={() => setTab("recipes")} className="flex gap-2 items-center justify-center bg-blue-400 mx-8 px-4 py-2 rounded-[5px] shadow-2xl text-white"><AiOutlineRead />Recipes</button>
                    </div>

                    <div className="w-[100%]">

                        {/* users */}
                        {tab == "users" && users &&
                            <div>
                                <h1 className="font-extrabold text-tiny text-[1.3rem] text-center">ƪ Users ƪ</h1>
                                <div className="w-[90%] m-auto flex justify-around mt-4 gap-5">
                                    <div className="flex justify-center items-center w-[8rem] h-[8rem] shadow-blue-300 shadow-xl flex-col border-2 border-blue-300 rounded-[5px]">
                                        <AiOutlineUser className="text-[3rem] text-blue-300"/>
                                        <p className="text-blue-400">{users.length}</p>
                                    </div>
                                </div>
                            </div>
                        }

                        {/* recipes */}
                        {tab == "recipes" &&
                            <div>
                                <h1 className="font-extrabold text-tiny text-[1.3rem] text-center">ƪ Recipes ƪ</h1>
                                <div className="w-[90%] m-auto flex justify-around mt-4 gap-5">
                                    <div className="flex justify-center items-center w-[8rem] h-[8rem] shadow-blue-300 shadow-xl flex-col border-2 border-blue-300 rounded-[5px]">
                                        <AiOutlineRead className="text-[3rem] text-blue-300"/>
                                        <p className="text-blue-400">9999999</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    
                </div>
            </div> 
            :
            <div className='flex flex-col gap-4 w-[100%] justify-center items-center mt-12'>
              <img style={{width:"50px", height:"50px"}} className='loading' src="./Loading.png" alt="loading"/>
              <h1 className='text-gray-500 font-extrabold'>Verifing ...</h1>
            </div>
            }
        </div>
    )
}