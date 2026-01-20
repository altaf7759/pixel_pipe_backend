import express from "express"

import { retryImageProcessing } from "../controllers/retry.controllers.js"

export const retryRouter = express.Router()

retryRouter.post("/", retryImageProcessing)