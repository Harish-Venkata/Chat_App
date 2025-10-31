import { requireAuth } from "@clerk/express";
import express from "express";
import {
  getMessages,
  sendMessages,
  upload,
} from "../controllers/messageController.js";

const messageRoutes = express.Router();

messageRoutes.get("/:id", requireAuth(), getMessages);
messageRoutes.post(
  "/send/:id",
  requireAuth(),
  upload.single("image"),
  sendMessages
);

export default messageRoutes;
