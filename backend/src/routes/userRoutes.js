import express from "express";
import bodyParser from "body-parser";
import {
  getUsersForSidebar,
  handleClerkWebhook,
} from "../controllers/userController.js";
import { requireAuth } from "@clerk/express";

const userRouter = express.Router();

userRouter
  .route("/webhooks")
  .post(bodyParser.raw({ type: "application/json" }), handleClerkWebhook);

userRouter.route("/getall").get(requireAuth(), getUsersForSidebar);

export default userRouter;
