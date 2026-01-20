import express from "express"
import { handleSSEUpdate } from "../controllers/update.controllers.js"

export const updateRouter = express.Router()

updateRouter.get("/:parentJobId", handleSSEUpdate)