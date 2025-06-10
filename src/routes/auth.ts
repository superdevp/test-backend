import express, { Request, Response } from "express";
import { getCurrentUser, login } from "../controllers/authController";
import verifyToken from "../middleware/auth";

const auth = express.Router();

auth.post("/login", (req: Request, res: Response)  => login(req, res));

auth.get('/', verifyToken, getCurrentUser);

export default auth;