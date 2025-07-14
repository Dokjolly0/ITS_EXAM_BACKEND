import "dotenv/config";
import "reflect-metadata";

import app from "./app";
import { emailService } from "./utils/services/email.service";
import mongoose from "mongoose";
import { requireEnvVars } from "./utils/dotenv";

const [MONGO_URI, DB_NAME, PORT, ADMIN_USER_NAME] = requireEnvVars([
  "MONGO_URI",
  "DB_NAME",
  "PORT",
  "ADMIN_USER_NAME",
]);

mongoose.set("debug", true);
mongoose
  .connect(`${MONGO_URI}/${DB_NAME}`)
  .then((_) => {
    PORT;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
