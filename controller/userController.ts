import express, {Request, Response} from "express"
import userModel from "../model/userModel";
import bcrypt from "bcrypt"

export const createUser = async (req: Request, res : Response) : Promise<Response> => {
    try {
        const { userName,email, password  } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create ({
            userName,
            email,
            password: hash,
        })

    return res.status(201).json({
        message: " Created user",
        data: user,
    });
         
    } catch (error) {
       return res.status(404).json({
            message: "user cannot be created",
        });
    }
};

export const signInUser = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const { email, password } = req.body;
  
      const user = await userModel.findOne({ email });
      console.log(user);
      console.log(email);
  
      if (user) {
        const checkPassword = await bcrypt.compare(password, user?.password!);
  
        if (checkPassword!) {
          return res.status(201).json({
            message: "user created",
            data: user._id,
          });
        } else {
          return res.status(404).json({
            message: "User's password is not correct'",
          });
        }
      } else {
        return res.status(404).json({
          message: "User doesn't exit",
        });
      }
    } catch (error) {
      return res.status(404).json({
        message: "Unable to create user",
      });
    }
  };



export const getusers = async (req: Request, res : Response) : Promise<Response> => {
    try {
        const {userID} = req.params;
// const {user, priority, isComplete}  = req.body;
        const users = await userModel.find()
        // .sort({createdAt: -1})

    return res.status(201).json({
        message: "users Gotten",
        data: users,
    });
         
    } catch (error) {
       return res.status(404).json({
            message: "Cannot get users",
        })
    }
}

export const getoneuser = async (req: Request, res : Response) : Promise<Response> => {
    try {

        const { userID } = req.params
        const user = await userModel.findById(userID)

    return res.status(201).json({
        message: "One user Gotten",
        data: user,
    });
         
    } catch (error) {
       return res.status(404).json({
            message: "Cannot get one user",
        })
    }
}

export const updateoneuser = async (req: Request, res : Response) : Promise<Response> => {
    try {
        const { userName } = req.body;
const {userID} = req.params
        const user = await userModel.findByIdAndUpdate(
            userID,
            {
               userName
            },
            {
                new: true},
            );
    return res.status(201).json({
        message: "user Updated",
        data: user,
    });
         
    } catch (error) {
       return res.status(404).json({
            message: "user cannot be Updated",
        })
    }
}

export const deleteoneuser = async (req: Request, res : Response) : Promise<Response> => {
    try {

        const { userID }  = req.params

const usered = await userModel.findByIdAndDelete(userID)
    return res.status(201).json({
        message: "user Deleted",
        data: usered,
    });
    } catch (error) {
       return res.status(404).json({
            message: "user cannot be Deleted",
            data:error
        })
    }
}