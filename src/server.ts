import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./router";

const app = express();

//** ----------------------------------- MIDDLEWARES ----------------------------------- */
app.use(cors()); // allow cross-origin requests from browsers
app.use(morgan("dev")); // logger

// allow client to send us json
app.use(express.json());

// allows client to add query string (?foo=bar&fizz=buzz) and decode it
app.use(express.urlencoded({ extended: true }));

// custom middleware
app.use((req, res, next) => {
  // #1 - augment req object
  req.shhhhh_secret = "007";
  next();

  // #2 - Bouncer mode
  // res.status(401);
  // res.send("Not Allowed");
});
//** ----------------------------------- MIDDLEWARES ----------------------------------- */

app.get("/", (req, res) => {
  console.log("Hello from Express");

  res.status(200);
  res.json({ message: "Hello from Express" });
});

app.use("/api", router);

export default app;
