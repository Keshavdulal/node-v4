import { Router } from "express";

const router = Router();

// USAGE -> router.method('path', handler)
router.get("/007", (req, res) => res.json({ message: req.shhhhh_secret }));

/**
 * Product
 */
router.get("/product", (req, res) => {});
router.get("/product/:id", () => {});
router.put("/product/:id", () => {});
router.post("/product", () => {});
router.delete("/product", () => {});

/**
 * Update
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.delete("/update", () => {});

/**
 * Update Point
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put("/updatepoint/:id", () => {});
router.post("/updatepoint", () => {});
router.delete("/updatepoint", () => {});

export default router;
