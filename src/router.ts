// AUTHENTICATED ROUTES ONLY HERE

import { Router } from "express";

// body checks for fields on the req.body
import { body, oneOf } from "express-validator";
import {
  getProducts,
  getOneProduct,
  createProduct,
  deleteProduct,
} from "./handlers/products";
import {
  getOneUpdate,
  getAllUpdates,
  createUpdate,
  updateUpdate,
  deleteUpdate,
  getAllUpdatesByProduct,
} from "./handlers/update";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

// USAGE -> router.method('path', handler)
router.get("/007", (req, res) => res.json({ message: req.shhhhh_secret }));

/**
 * Product - CRUD
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);

router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);

router.delete("/product/:id", deleteProduct);

/**
 * Update - CRUD
 */
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  handleInputErrors,
  createUpdate
);

router.get("/update/:id", getOneUpdate);
router.get("/update/", getAllUpdates); //
router.get("/update/product/:id", getAllUpdatesByProduct); //

router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  handleInputErrors,
  updateUpdate
);

router.delete("/update/:id", deleteUpdate);

/**
 * Update Point - CRUD
 */
router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  (req, res) => {}
);

router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  handleInputErrors,
  (req, res) => {}
);

router.delete("/updatepoint/:id", (req, res) => {});

// ------------------------------ Subhandler level error handler ------------------------------
router.use((err, req, res, next) => {
  // just call top level error handler
  next(err);
});

export default router;
