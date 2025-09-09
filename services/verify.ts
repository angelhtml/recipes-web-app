import jwt from 'jsonwebtoken';

export const Verfiy = async (token : Storage | string) => {
    try{
        let result: any = false
        if(!token){
            return {success:false, msg: "Error! Token was not provided."}
        }
        else{
            const secretJwt = process.env.SECRET_JWT;
            if (!secretJwt) {throw new Error('SECRET_JWT is not defined')}

            const decode = jwt.verify(String(token), secretJwt,(err, decoded) => {
                if(decoded){
                    result = decoded
                }
                if(err){
                    result = false
                }
            })

            return result
            
        }
    }
    catch(err){
        console.log(err)
    }
}