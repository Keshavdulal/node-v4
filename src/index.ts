import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Hello on http://localhost:${PORT}`);
});
