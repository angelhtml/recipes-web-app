import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { RecipesSchema } from "../../../../schema/recipes";
import connectToMongoDB from "../../../../services/db";


export async function POST(req: NextRequest) {
    try{
      await connectToMongoDB()
        const data = await req.json()
        const recipes = mongoose.models.recipes || mongoose.model('recipes', RecipesSchema)

        const get_recipes = await recipes.aggregate([
            {
      $match: {
        $or: [
          { description: { $regex: data.search, $options: 'i' } },
          { name: { $regex: data.search, $options: 'i' } },
          { 'ingredients.name': { $regex: data.search, $options: 'i' } }
        ]
      }
    },
    {
      $addFields: {
        relevance: {
          $add: [
            { $size: { $regexFindAll: { input: 'name', regex: data.search, options: 'i' } } },
            { $size: { $regexFindAll: { input: 'description', regex: data.search, options: 'i' } } }
          ]
        }
      }
    },
    {$unset: "ingredients"},
            {$unset: "method"},
            {$unset: "url"},
    { $sort: { relevance: -1 } }
            //{$match: {name: data.search}}
        ])

        return NextResponse.json(get_recipes)
    }
    catch(err){
        console.log(err)
    }
}