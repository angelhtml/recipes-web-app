
import Recipe from "../../../../componenets/recipe"
import GetRecipe from "../../../../services/getrecipe"


// Generate metadata dynamically based on the recipe
export async function generateMetadata({ params }: any /*{ params: { slug: string } }*/){
  const recipe_id = params.slug;
  const data = await GetRecipe(recipe_id);
  
  if (data) {
    return {
      title: `${data.name} - Recipe`,
      description: data.description || `Learn how to make ${data.name}`,
      keywords: [data.name],
      openGraph: {
        title: data.name,
        description: data.description || `Delicious recipe for ${data.name}`,
        images: data.image ? [data.image] : [],
      },
    }
  }
}

export default async function Page({ params }: any /*{ params: { slug: string } }*/) {

    const recipe_id = await params
    const data = await GetRecipe(recipe_id.slug)



    if(data != null){
      return (
        <>
          <Recipe data={data}/>
        </>
      )
    }
    else{
      return <div>recipe not found</div>
    }
  }