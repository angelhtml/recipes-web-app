import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { RecipesSchema } from "../../../../schema/recipes";
import connectToMongoDB from "../../../../services/db";

export async function GET(req: NextRequest) {
    try{
        await connectToMongoDB()
        // get the params from url (http://localhost:3000/api/allrecpies?size=9&page=1)
        const searchParams = await req.nextUrl.searchParams;
        const size : number =  Number(searchParams.get("size"))
        const page : number =  Number(searchParams.get("page"))

        // get the data
        const recipes = mongoose.models.recipes || mongoose.model('recipes', RecipesSchema)
        const find_recipes = await recipes.aggregate([
            {$unset: "ingredients"},
            {$unset: "method"},
            {$unset: "url"}
        ])

        // slice the data to the page with size
        const get_recipes = find_recipes.slice((page - 1) * size, page * size)

        if(get_recipes[0] != undefined){
            return NextResponse.json(get_recipes)
        }

        else{
            return NextResponse.json([])
        }

        
    }
    catch(err){
        console.log(err)
    }
}