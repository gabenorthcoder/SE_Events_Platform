import { Router, Request, Response } from "express";

const router = Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Root endpoint
 *     description: A simple test endpoint that returns a greeting message
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Hello, World!"
 */
router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

export default router;
