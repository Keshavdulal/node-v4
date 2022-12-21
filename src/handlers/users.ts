import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  // Create user using prima sdk and store it in db
  // Store created user locally too for next step
  // Create a JWT token using auth module
  // Send JWT back

  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    // latching in necessary info for our Error Handler and calling it
    error.type = "input";
    next(error);
  }
};

export const signin = async (req, res) => {
  // Need username & password to proceed
  // Check validity of username first
  // Only then check validity of password (with hashed pwd in db)
  // Create token if valid else 401
  // Send JWT back

  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  console.log(
    "@signin",
    req.body.username,
    req.body.password,
    user.username,
    user.password
  );

  const isValidPwd = await comparePasswords(req.body.password, user.password);

  if (!isValidPwd) {
    res.status(401);
    res.json({ message: "Username and password do not match" });

    return;
  }

  // send back JWT token to valid user
  const token = createJWT(user);
  res.json({ token });
};
