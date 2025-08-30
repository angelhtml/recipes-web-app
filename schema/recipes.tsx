import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const RecipesSchema = new Schema({
  name: String,
  url: String,
  description: String,
  author: String,
  ingredients: Array,
  method: Array,
  date: Number,
  data1: String,
  uniqid: String
});
