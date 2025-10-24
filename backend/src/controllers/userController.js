//https://clerk.com/docs/guides/development/webhooks/overview
import { Webhook } from "svix";
import User from "../models/userModel.js";
const handleClerkWebhook = async (req, res) => {
  try {
    console.log("UserCreation Route");

    const CLERK_WEBHOOK_SECRET_KEY = process.env.CLERK_WEBHOOK_SECRET_KEY;
    if (!CLERK_WEBHOOK_SECRET_KEY) {
      console.error("Error:clerk_webhook_screckt_key is missing in .env file");
      return res.status(500).json({ success: false, message: "Server error" });
    }
    //Extract the http headers from the request .these headers contain the signature that will be used to verify the webhook

    const svixHeaders = req.headers;

    //Extract the request body,which contains the webhook data sent by clerk
    const payloadString = req.body;

    //create a new instance of the svix webhook verification class,passing in the scret key.svix is the webhook service clerk uses

    const wh = new Webhook(CLERK_WEBHOOK_SECRET_KEY);

    //verifies the webhook signature using the payload and headers.if verification fails this will throw an error and the execution will jump to the catch block

    const evt = wh.verify(payloadString, svixHeaders);
    // console.log(evt);

    //Destructures the event data,extracting the id field and putting all other fields into attribute object

    const { id, ...attributes } = evt.data;

    //extract the eventType
    const eventType = evt.type;
    console.log(`Recieved webhook : ID :${id} ,Event Type:${eventType}`);
    console.log(`Payload Data / Attributes:${attributes}`);

    //check if the event type is "user.created ".This is the beginning of the specific handler code for user creation events

    if (eventType === "user.created") {
      try {
        //Find if any user exist with the user id
        const userExists = await User.findOne({ clerkUserId: id });
        if (userExists) {
          return res
            .status(400)
            .json({ success: false, message: "user already Exists" });
        }
        const newUser = new User({
          clerkUserId: id,
          email: attributes.email_addresses[0].email_address,
          username: attributes.username || "",
          firstName: attributes.first_name || "",
          lastName: attributes.last_name || "",
          profileImage: attributes.profile_image_url || "",
        });
        await newUser.save();
        res.status(200).json({ success: true, message: "User Created " });
      } catch (error) {
        res.status(400).json({ success: false, message: "user not created" });
      }
    } else if (eventType === "user.updated") {
      try {
        //Find the user in MongoDB
        const updateUser = await User.updateOne(
          { clerkUserId: id },
          {
            $set: {
              firstName: attributes.first_name,
              lastName: attributes.last_name,
              username: attributes.username,
              profileImage: attributes.profile_image_url,
            },
          }
        );

        //Validate
        if (updateUser.modifiedCount > 0) {
          console.log(`User with Clerk id - ${id}, Updated Successfully`);
        } else {
          console.log(`No User with Clerk id - ${id} found`);
        }

        res
          .status(200)
          .json({ success: true, message: "User updated successfully" });
      } catch (error) {
        res.status(400).json({ success: false, message: "User not updated" });
      }
    }

    if (eventType === "user.deleted") {
      try {
        const deletedUser = await User.deleteOne({ clerkUserId: id });

        if (deletedUser.deletedCount > 0) {
          console.log(`User with Clerk id - ${id}, deleted Successfully`);
          res
            .status(200)
            .json({ success: true, message: "User deleted successfully" });
        } else {
          console.log(`No User found with Clerk id - ${id},nothing to delete`);
        }
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Something went wrong, while deleting",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { handleClerkWebhook };
