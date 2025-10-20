import dotenv from "dotenv";

import { app } from "./app.js";

dotenv.config({ path: "local.env" });

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
