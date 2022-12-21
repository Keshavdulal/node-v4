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
import { handleInputErrors } from "./modules/middleware";

const router = Router();

// USAGE -> router.method('path', handler)
router.get("/007", (req, res) => res.json({ message: req.shhhhh_secret }));

/**
 * Product
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
 * Update
 */
router.get("/update", (req, res) => {});
router.get("/update/:id", (req, res) => {});
router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  // oneOf("status", [body("IN_PROGRESS"), body("SHIPPED"), body("DEPRECATED")]),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  // body("asset").optional(),
  handleInputErrors,
  (req, res) => {}
);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  handleInputErrors,
  (req, res) => {}
);

router.delete("/update/:id", (req, res) => {});

/**
 * Update Point
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

export default router;
