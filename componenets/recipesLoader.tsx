import GetRecipes from "../services/getrecipes";
import Card from "./card";

export default async function RecipesLoader(){
    const data = await GetRecipes(1, 20)

    return(
        <Card props={data}/>
    )
}