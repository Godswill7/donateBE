import mongoose from "mongoose";
import dotenv from  "dotenv"
dotenv.config()

const mongoosetring: string = process.env.APPLICATION_DB!;

export const dbConnect = () => {
    mongoose.connect(mongoosetring).then(() => {
        console.log(" DB connected")
    })
}
