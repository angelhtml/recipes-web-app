
import Chat from "../../../../../componenets/chat"

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

export default async function Page({ params }: any /*{ params: { slug: string } }*/) {
    const get_param = await params
    const getter_info = await GetGuestInfo(get_param.slug)

    return(
        <div>
            <Chat props={get_param} getter_info={getter_info}/>
        </div>
    )
}