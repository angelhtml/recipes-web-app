export async function GetGuestInfo(id: string){
    try{
        const posts = await fetch(`${process.env.URL}/api/userinfo`, {
            method:"POST",
            body: JSON.stringify({id: id}),
            next: {revalidate: 60}
        })

        const res = await posts.json()

        return res

    }
    catch(err){
        console.log(err)
    }
}