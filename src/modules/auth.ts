import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

// converts obj to string
export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET
  );

  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  // console.log("@protect - bearer", bearer);

  if (!bearer) {
    res.status(401);
    res.json({ message: "Not Authorized" });

    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "Invalid Token" });

    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // attach legit user info in the req obj for subsequent usage (& not rely on user inputs)
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    res.json({ message: "Invalid Token!" });

    return;
  }
};

export const hashPassword = (password) => {
  const saltRounds = 5;
  // this is async and returns promise by def
  return bcrypt.hash(password, saltRounds);

  // use this to do it sync
  // return bcrypt.hashSync(password, "saltysalt");
};

export const comparePasswords = (password, hash) => {
  console.log("@comparePasswords", password, hash);
  // this is async and returns promise by def
  return bcrypt.compare(password, hash);

  // use this to do it sync
  // return bcrypt.compareSync(password, hash);
};
