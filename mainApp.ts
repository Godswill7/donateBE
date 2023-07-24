import express from "express";
import { Application } from "express"
import cors from "cors"
import user from "./Router/userRouter"
import donation from "./Router/donateRouter"

export const mainApp = (app: Application) => {
    app.use(express.json()).use(cors())
    .use("/boot/user", user)
    .use("/boot/donation", donation)
}