import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.json({ message: "Chat App server is running" });
});

export { app };
