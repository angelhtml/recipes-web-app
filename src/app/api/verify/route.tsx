
import { NextResponse,NextRequest } from "next/server"
import { Verfiy } from "../../../../services/verify";
import { UserSchema } from "../../../../schema/user";
import mongoose from "mongoose";
 
export async function POST(request: NextRequest) {
    try{
        const data = await request.json()
        
        const verify_jwt = await Verfiy(data.token)
        

        if(verify_jwt){
            
            const user = mongoose.models.user || mongoose.model('user', UserSchema)
            const find_user = await user.find({token: data.token})

            return NextResponse.json({
                msg: "ok",
                success: true,
                admin: find_user[0].admin,
                data: verify_jwt.data
            })
        }
        else{
            return NextResponse.json({
                msg: "expired",
                success: false,
                admin: false,
                data: false
            })
        }

        
    }
    catch(err){
        console.log(err)
    }
}