
import { NextResponse,NextRequest } from "next/server"
import { Verfiy } from "../../../../services/verify";
 
export async function POST(request: NextRequest) {
    try{
        const data = await request.json()
        
        const verify_jwt = await Verfiy(data.token)
        

        if(verify_jwt){
            //console.log(verify_jwt)
            return NextResponse.json({
                msg: "ok",
                success: true,
                data: verify_jwt.data
            })
        }
        else{
            return NextResponse.json({
                msg: "expired",
                success: false,
                data: false
            })
        }

        
    }
    catch(err){
        console.log(err)
    }
}