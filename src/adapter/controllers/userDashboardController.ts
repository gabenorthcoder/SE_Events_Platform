import express, { Request, Response } from "express";
const dashboard = express.Router();

dashboard.get("/dashboard", async (req: Request, res: Response) => {
  try {
    const body = req.body as unknown;
    res.status(200).json({ message: "User registration successful" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during registration" });
  }
});
export { dashboard };
