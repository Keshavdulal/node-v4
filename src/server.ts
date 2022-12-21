import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/users";

const app = express();

// ----------------------------------- MIDDLEWARES -----------------------------------
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

// ----------------------------------- ROUTE HANDLERS -----------------------------------

app.get("/", (req, res, next) => {
  console.log("Hello from Express");

  // SYNC Error
  // throw new Error("Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  // ASYNC Error
  // setTimeout(() => {
  //   // next here is -> our error handler at the end
  //   next(new Error("ASYNC Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"));
  // }, 10);

  res.status(200);
  res.json({ message: "Hello from Express" });
});

// AUTHENTICATED PRIVATE ROUTES
app.use("/api", protect, router);

// UNAUTHENTICATED PUBLIC ROUTES
app.post("/user", createNewUser);
app.post("/signin", signin);

// ----------------------------------- ERROR HANDLERS MW -----------------------------------

// Generic SYNC Error Handler Middleware
// - Catches errors thrown by routes, handler and other middlewares above it
// - prevents server crash
// - doesn't catch anything below it, so put it at bottom
// - doesn't catch ASYNC errors
app.use((err, req, res, next) => {
  console.error(err);
  // res.json({ message: `There was an error\n${err.message}` });

  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid User Input" });
  } else {
    res.status(500).json({ message: "Server Fault" });
  }
});

// ----------------------------------------------------------------------
// Handling errors coming outside express i.e. node
setTimeout(() => {
  throw new Error("OOPS!!! outside express");
}, 100);

// Sync Error
process.on("uncaughtException", (err) => {
  console.error("@uncaughtException");
  console.error(err);
});

// Async Error
process.on("unhandledRejection", (err) => {
  console.error("@unhandledRejection");
  console.error(err);
});

// ----------------------------------- EXPORTS -----------------------------------

export default app;
