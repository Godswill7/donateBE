import express, {Router} from "express"
import { createdonate, deleteonedonate, viewUserdonate, getonedonate, updateonedonate, readAllDonate } from "../controller/donateController";

const router = Router();

router.route("/donates").get(readAllDonate)
router.route("/:donateID/donate-details").get(getonedonate)
router.route("//:userID/read-user-donate").get(viewUserdonate)
router.route("/:userID/create").post(createdonate)

router.route("/:postID/delete-donate").delete(deleteonedonate);
router.route("/:postID/update-donate").delete(updateonedonate);


export default router