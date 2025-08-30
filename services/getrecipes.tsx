"use server"
export default async function GetRecipes(page: number, size: number){
    try{
        //console.log(process.env.MONGODB_URI)

        const res = await fetch(`${process.env.URL}/api/allrecpies?size=${size}&page=${page}`, {
           // cache:"force-cache"
          })
        const repo = await res.json()

        return(repo)
    }
    catch(err){
        console.log(err)
    }
}