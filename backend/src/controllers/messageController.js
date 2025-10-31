import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import multer from "multer";
import ImageKit from "imagekit";
import { getReceiverSocketId, io } from "../libs/socket.js";

//Configure Middleware,multer
const upload = multer({ storage: multer.memoryStorage() });

//Initalize imagekit
let imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINT,
});

console.log(imagekit);

export const getMessages = async (req, res) => {
  const { id: userToChatId } = req.params;

  try {
    //Current user is logged in
    let currentUserId = req.auth?.userId;

    //Find the messages based on the fromClerkId to toClerkId

    const messages = await Message.find({
      $or: [
        {
          fromClerkId: currentUserId,
          toClerkId: userToChatId,
        },
        {
          fromClerkId: userToChatId,
          toClerkId: currentUserId,
        },
      ],
    }).sort({ createdAt: 1 }); // 1 for adc-> desc, -1 -desc-> asc

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getting message controller", error);
    res.status(500).json({ error: "Internal server Error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: toClerkId } = req.params;

    const fromClerkId = req.auth?.userId;

    if (!fromClerkId) {
      return res.status(400).json({ error: "unauthorised user" });
    }

    const fromUser = await User.findOne({ clerkUserId: fromClerkId });
    const toUser = await User.findOne({ clerkUserId: toClerkId });

    //Handling the images for imagekit
    let imageUrl;
    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");
      const result = await imagekit.upload({
        file: base64Image,
        fileName: `${Date.now()}.jpg`,
        useUniqueFileName: true,
      });
      imageUrl = result.url;
    }

    const newMessage = await Message.create({
      fromClerkId,
      toClerkId,
      from: fromUser._id,
      to: toUser._id,
      text,
      image: imageUrl,
    });

    //send message and receive it using socket.io

    console.log("hit");
    const receiverSocketId = getReceiverSocketId(toClerkId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    const senderSocketId = getReceiverSocketId(fromClerkId);

    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sending message controller", error);
    res.status(500).json({ error: "Internal server Error" });
  }
};

export { upload };
