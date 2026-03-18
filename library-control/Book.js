import { Schema, model } from "mongoose";
const bookSchema = new Schema(
    {
        book_serie: {
        type: Number,
        required: true,
        unique: true,
        },
        title: String,
        author: String,
        public_date: String,
        gender: String,
        stock: Number
    },
    {
        versionKey: false,
        timestamps: true,
    } 
);
export default model("book", bookSchema);