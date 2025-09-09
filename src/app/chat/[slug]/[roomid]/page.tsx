
import Chat from "../../../../../componenets/chat"
import { GetGuestInfo } from "../../../../../services/guestInfo"

export default async function Page({ params }: any /*{ params: { slug: string } }*/) {
    const get_param = await params
    const getter_info = await GetGuestInfo(get_param.slug)

    return(
        <div>
            <Chat props={get_param} getter_info={getter_info}/>
        </div>
    )
}