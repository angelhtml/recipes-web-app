import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    sender: String,
    getter: String,
    roomId: String,
    date: String
});
