import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { RecipesSchema } from "../../../../schema/recipes";
import connectToMongoDB from "../../../../services/db";


export async function GET(req: NextRequest) {
    try{
        await connectToMongoDB()
        // get the data
        const recipes = mongoose.models.recipes || mongoose.model('recipes', RecipesSchema)
        const get_recipes = await recipes.find({})

        return NextResponse.json(get_recipes)
    }
    catch(err){
        console.log(err)
    }
}