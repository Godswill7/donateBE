import express, {Application} from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { mainApp } from './mainApp';
import { dbConnect } from './config/db';
dotenv.config();

const mongoosetring: string = process.env.APPLICATION_DB!;

const realPort: number = parseInt(process.env.APPLICATION_PORT!);

const port: number = realPort;

const app: Application = express();

mainApp(app)



const server = app.listen(port, () => {
    mongoose.connect(mongoosetring).then(() => {
        console.log("");
        dbConnect();
        console.log("")
        console.log("")
        console.log("Server is up and running", port)
    })  
});

process.on("uncaughtException", (error: any) => {
    console.log("Server is Shutting Down due to : uncaught exception ")
 console.log(error);

   server.close(() => {
    process.exit(1);
   })
});

process.on("unhandledRejection", (reason: any) => {
    console.log("Server is Shutting Down due to : unhandledRejection ")

console.log(reason);

    server.close(() => {
        process.exit(1);
    })
});