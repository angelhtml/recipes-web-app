import mongoose, { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "../../../../schema/user";
import connectToMongoDB from "../../../../services/db";

interface req_data {
    id: string
}

export async function POST(req: NextRequest, res: NextResponse){
    try{
        await connectToMongoDB()
        
        const data : req_data = await req.json()

        const user = mongoose.models.user || mongoose.model('user', UserSchema)

         const find_user = await user.aggregate([
            {$match: {_id: new Types.ObjectId(data.id)}},
            {$unset: "password"},
            {$unset: "email"},
            {$unset: "token"},
            {$unset: "uniqid"},
            {$unset: "valid"}
        ])

        return NextResponse.json(find_user)
    }
    catch(err){
        console.log(err)
    }
}