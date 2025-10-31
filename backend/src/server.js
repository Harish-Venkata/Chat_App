import "dotenv/config";

import connectDB from "./db/index.js";
import { server } from "./libs/socket.js";

const PORT = process.env.PORT || 7001;

connectDB()
  .then(
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((err) => console.log("MongoDB connection Error", err));
