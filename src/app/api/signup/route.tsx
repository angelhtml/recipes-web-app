import { NextResponse,NextRequest } from "next/server"
import mongoose from "mongoose";
import connectToMongoDB from "../../../../services/db";
import { UserSchema } from "../../../../schema/user";
import jwt from "jsonwebtoken";
import validator from 'validator';
import bcrypt from "bcrypt";
import uniqid from 'uniqid';

 
export async function POST(request: NextRequest, response: Response) {
  try{
    await connectToMongoDB()
    const data = await request.json()

    //password and email validator
    const valid_password : number = validator.isStrongPassword(data?.password,{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore:true})
    const valid_email : boolean = validator.isEmail(data?.email)

    // if password was valid
    if(valid_password >= 50){

        // if email was valid
        if(valid_email){

            const user = mongoose.models.user || mongoose.model('user', UserSchema)

            const find_user : any = await user.find({email: data.email})

            if(find_user[0] == undefined){
            
                const join_date : number = Date.now()
                const user_uniqid = uniqid()
            
                const secretJwt = process.env.SECRET_JWT;
                const pass = await bcrypt.hash(data?.password, 10)
            
                if (!secretJwt) {throw new Error('SECRET_JWT is not defined')}

                const create_user = await user.create({
                    username: data.username,
                    email: data.email,
                    password: pass,
                    valid: true,
                    join_date: join_date,
                    token: "",
                    uniquId: user_uniqid,
                    admin: false
                });
            
                console.log(create_user)
            
                // create a token
                const info = {
                    email: data.email,
                    username: data.username,
                    join_date: join_date,
                    uniquId: user_uniqid,
                    _id: create_user._id
                }
                const token = jwt.sign({
                    data: info
                }, secretJwt, { expiresIn: "7d" });


                // add user a token
                await user.findOneAndUpdate({_id:create_user._id},{token: token})
            
                
            
                return NextResponse.json({
                    msg: "user added",
                    success: true
                },{ status: 200 ,headers:{"token":token}})
            
            }
        
            else{
                return NextResponse.json({ msg: 'user already exist',success: false }, { status: 200 })
            }

        }

        else{
            return NextResponse.json({ msg: 'Your email is not valid',success: false }, { status: 200 })
        }
    }

    else{
        return NextResponse.json({ msg: 'Please use a strong password',success: false }, { status: 200 })
    }

  }
  catch(err){
    console.log(err)
    return NextResponse.json({ msg: 'An error occurred',success: false }, { status: 500 })
  }
}