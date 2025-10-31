import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import userRouter from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

app.use(cors());
app.use(clerkMiddleware());

app.use("/api/users", userRouter);
//Never use express.json for body parser

app.use(express.json());

app.use("/api/messages", messageRoutes);

app.get("/api/test", requireAuth(), (req, res) => {
  res.json({ message: "Authenticated", userId: req.auth.userId });
});

export { app };
