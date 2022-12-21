import { validationResult } from "express-validator";

// input validator
const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    // bad req handling
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next();
  }
};

export { handleInputErrors };
