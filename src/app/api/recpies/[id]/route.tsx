import mongoose, { isValidObjectId, Types } from "mongoose";
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

      const find : any = await recipes.findById(get_params.id)

      
      const find_recipe = await recipes.aggregate([
        {$match:{"_id": new Types.ObjectId(get_params.id)}},
        {
          $lookup: {
            from: 'users',           // Collection name in MongoDB (usually pluralized)
            localField: 'author',       // Field in current collection
            foreignField: 'username',  // Field in foreign collection
            pipeline: [
            {
              $project: {
                _id: 1,       // Include only these fields
                join_date: 1,
                admin: 1,
                uniquId: 1,
              }
            }
            ],
            as: 'author_info'              // Array field name to store results
          }
        }
      ])

      //console.log(find_recipe[0]?.author_info)

      // if find the recipe
      if(find_recipe){
      return NextResponse.json(find_recipe[0]);
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