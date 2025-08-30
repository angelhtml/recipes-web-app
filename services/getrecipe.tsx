"use server"

import mongoose, { isValidObjectId } from "mongoose";

export default async function GetRecipe(id: string){
    try{
        const is_valid_id = isValidObjectId(id)

        if(is_valid_id){
            const objectId = new mongoose.Types.ObjectId(id);
            const res = await fetch(`${process.env.URL}/api/recpies/${objectId}`, {
                // cache:"force-cache"
            })
            const repo = await res.json()

            return(repo)
        }
        else{
            return(null)
        }
        
    }
    catch(err){
        console.log(err)
    }
}