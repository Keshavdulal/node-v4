import * as dotenv from "dotenv";
dotenv.config();

import config from "./config";
import app from "./server";

// const PORT = 3001;

app.listen(config.port, () => {
  console.log(`Hello on http://localhost:${config.port}`);
});
