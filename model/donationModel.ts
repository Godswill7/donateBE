import mongoose from "mongoose";

interface iDonate {
    category?: string;
    ammount?: string;
}

interface iDonateData extends iDonate,  mongoose.Document { } 

const DonateModel = new mongoose.Schema({
    category: {
        type: String,
        // To remove whitespace
        trim: true,
    },
    ammount: {
        type: String,
    },
},
{
    timestamps: true}
    );

    export default mongoose.model<iDonateData>("donate", DonateModel)