import mongoose from "mongoose"
import { UserSchema } from "../../../../schema/user"
import { NextResponse } from "next/server"

export async function GET(){
    try{

        const user = mongoose.models.user || mongoose.model('user', UserSchema)
        
        const users = await user.aggregate([
            {$unset: "password"},
            {$unset: "token"},
            {$unset: "uniqid"},
            {$unset: "valid"}
        ])
        
        return NextResponse.json(users)
    
    }
    catch(err){
        console.log(err)
    }
}