"use cache"

// get all users signed in databse
export async function GetUsers(){
    try{
        const req = await fetch(`${process.env.URL}api/allusers`, {
            method:"GET",
            next: {revalidate: 120}
        })

        const users = await req.json()

        return users

    }
    catch(err){
        console.log(err)
    }
}