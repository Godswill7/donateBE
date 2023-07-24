import express, {Request, Response} from "express"
import donateModel from "../model/donationModel"
import userModel from "../model/userModel";
import mongoose from "mongoose";

export const createdonate = async (req: Request, res : Response) : Promise<Response> => {
    try {

        const { authID } = req.params;
        const { category,ammount } = req.body
        const user: any = await userModel.findById(authID);
        const donated = await donateModel.create ({
            category,
            ammount,
        })

        user?.post?.push(new mongoose.Types.ObjectId(donated._id!));
        user?.save();

    return res.status(201).json({
        message: " Create donate",
        data: donated,
    });
         
    } catch (error) {
       return res.status(404).json({
            message: "donate cannot be Viewed",
        })
    }
}

export const readAllDonate = async (req: Request, res : Response) : Promise<Response> => {
    try {

        const donated: any = await donateModel.find();

    return res.status(201).json({
        message: " get all donate",
        data: donated,
    });
    } catch (error) {
       return res.status(404).json({
            message: "donate cannot be Viewed",
        })
    }
}


export const viewUserdonate = async (req: Request, res : Response) : Promise<Response> => {
    try {
const {userID}  = req.params;
const donated = await userModel.findById(userID).populate({
    path: "donate",
    options: {
        sort: {
          createAt: -1,
        },
      },
});
       
    return res.status(201).json({
        message: "donate Gotten",
        data: donated?.donate,
    });
         
    } catch (error) {
       return res.status(404).json({
            message: "Cannot get donate",
        })
    }
}

export const getonedonate = async (req: Request, res : Response) : Promise<Response> => {
    try {

const {donateID} = req.params

        const donated = await donateModel.findById({donateID})

    return res.status(201).json({
        message: "One donate Gotten",
        data: donated,
    });
         
    } catch (error) {
       return res.status(404).json({
            message: "Cannot get one donate",
        })
    }
}
export const updateonedonate = async (req: Request, res : Response) : Promise<Response> => {
    try {
const {id} = req.params
        const donated = await donateModel.findByIdAndUpdate(
            id,
            {
                new: true
            },
            );
    return res.status(201).json({
        message: "donate Updated",
        data: donated,
    });
         
    } catch (error) {
       return res.status(404).json({
            message: "donate cannot be Updated",
        })
    }
}

export const deleteonedonate = async (req: Request, res : Response) : Promise<Response> => {
    try {
        const {donateID}  = req.params
const donated = await donateModel.findByIdAndDelete(donateID)
    return res.status(201).json({
        message: "donate Deleted",
        data: donated,
    });
    } catch (error) {
       return res.status(404).json({
            message: "donate cannot be Deleted",
            data:error
        })
    }
}