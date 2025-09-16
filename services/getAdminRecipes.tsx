

export async function GetAdminRecipe(){
    try{
        const res = await fetch(`${process.env.URL}api/adminrecipes`, {
            method:"GET",
            next:{revalidate: 60}
        })

        console.log(res)
        const repo = await res.json()

        return(repo)
        
    }
    catch(err){
        console.log(err)
    }
}