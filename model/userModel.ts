import mongoose from "mongoose";

interface iUser {
   userName?: string;
    email?: string;
    password?: string;
    donate?: []
}

interface iUserData extends iUser,  mongoose.Document { } 

const userModel = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        // trim: true,
        // required: true,
        unique: true,
    },
    password: {
        type: String,
        // require: true,
    },
    // donate: [
    //     // {
    //     //   type: mongoose.Types.ObjectId,
    //     //   ref: "users",
    //     // },
    //   ],
},
{
    timestamps: true}
    );

    export default mongoose.model<iUserData>("users", userModel)