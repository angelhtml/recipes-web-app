import mongoose, { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { RecipesSchema } from "../../../../../schema/recipes";
import connectToMongoDB  from "../../../../../services/db";

export async function GET(request: NextRequest,{ params }: { params: any }) {
  try{
    await connectToMongoDB()
    const recipes : any = mongoose.models.recipes || mongoose.model('recipes', RecipesSchema)

    // get the id from params
    const get_params = await params

    // if id was a valid object id
    if(isValidObjectId(await get_params?.id)){

      const find_recipe : any = await recipes.findById(get_params.id)
      
      // if find the recipe
      if(find_recipe){
      return NextResponse.json(find_recipe);
      }
      else{
        return NextResponse.json({});
      }
      
    }
    
    else{
      return NextResponse.json({});
    }

  }
  catch(err){
    console.log(err)
  }
  }