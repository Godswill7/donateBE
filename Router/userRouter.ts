import express  from "express"
import { createUser, deleteoneuser, getoneuser, getusers,  updateoneuser } from "../controller/userController";
    
const router = express.Router();

router.route("/register").post( createUser);
router.route("/users").get(getusers);
router.route("/:userID/user-detail").get(getoneuser);
router.route("/:userID/update-user").patch(updateoneuser);
router.route("/:userID/delete-user").delete(deleteoneuser);

export default router