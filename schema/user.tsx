import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  valid: Boolean,
  join_date: Number,
  token: String,
  uniquId: String,
  admin: Boolean
});
