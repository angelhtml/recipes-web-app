import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "../../../../services/db";
import { ContactSchema } from "../../../../schema/contact";
import mongoose from "mongoose";
import uniqid from "uniqid"
import { Verfiy } from "../../../../services/verify";

interface Data {
    sender_token: string,
    getter: string
}

export async function POST(req: NextRequest, res: NextResponse){
    try{
        await connectToMongoDB()
        const data : Data = await req.json()

        const verify_jwt = await Verfiy(data.sender_token)

        // valid user token
        if(verify_jwt){
            console.log(verify_jwt.data._id)
            const contact = mongoose.models.contact || mongoose.model('contact', ContactSchema)

            // find the contact
         
            const find_contact = await contact.find({
                $or: [
                        { sender: verify_jwt.data._id, getter: data.getter },
                        { sender: data.getter, getter: verify_jwt.data._id }
                    ]
            })

            if(find_contact[0] == undefined){
                const create_contact = await contact.create({
                    sender: verify_jwt.data._id,
                    getter: data.getter,
                    roomId: uniqid(),
                    date: Date.now()
                })
                return NextResponse.json({success: true, data:create_contact})
            }
            else{
                return NextResponse.json({success: true, data:find_contact[0]})
            }
        }

        // unvalid user token
        else{
            return NextResponse.json({success: false, data:{}})
        }





    }
    catch(err){
        console.log(err)
    }
}