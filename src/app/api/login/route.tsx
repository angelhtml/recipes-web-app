import { NextResponse,NextRequest } from "next/server"
import mongoose from "mongoose";
import connectToMongoDB from "../../../../services/db";
import { UserSchema } from "../../../../schema/user";
import jwt from "jsonwebtoken";
import validator from 'validator';
import bcrypt from "bcrypt";
import { Verfiy } from "../../../../services/verify";


 
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

                // if user found
                if(find_user[0]){
                    const pass : boolean = await bcrypt.compare(data?.password, find_user[0].password)

                    // if password was correct
                    if(pass){
                        const verify_jwt = await Verfiy(find_user[0].token)

                        // if everythings was correctly send the user token by response header
                        if(verify_jwt){
                            return NextResponse.json({msg: "ok",success: true},{status: 200 ,headers:{token: find_user[0].token}})
                        }

                        //update jwt if was expired
                        else{
                            const info = {
                                email: find_user[0].email,
                                username: find_user[0].username,
                                join_date: find_user[0].join_date,
                                uniquId: find_user[0].uniquId,
                                _id: find_user[0]._id
                            }
                            const secretJwt = process.env.SECRET_JWT;
                            if (!secretJwt) {throw new Error('SECRET_JWT is not defined')}

                            const token = jwt.sign({
                                data: info
                            }, secretJwt, { expiresIn: "7d" });
                            const new_update = await user.findOneAndUpdate({email:find_user[0].email},{token: token})

                            return NextResponse.json({msg: "ok",success: true},{status: 200 ,headers:{token: find_user[0].token}})

                        }

                    }

                    else{
                        return NextResponse.json({msg: "incorrect password",success: false }, { status: 200 })
                    }
                }

                else{
                    return NextResponse.json({msg: "user not found",success: false }, { status: 200 })
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