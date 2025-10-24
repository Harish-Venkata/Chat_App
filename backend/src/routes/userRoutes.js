import express from "express";
import bodyParser from "body-parser";
import { handleClerkWebhook } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter
  .route("/webhooks")
  .post(bodyParser.raw({ type: "application/json" }), handleClerkWebhook);

export default userRouter;
