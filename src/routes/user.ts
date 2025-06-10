import express, { Request, Response } from "express";
import { createUser, getAllUsers } from "../controllers/userContoller";

const user = express.Router();

user.get("/", (req: Request, res: Response) => getAllUsers(req, res));

user.post("/", (req: Request, res: Response) => createUser(req, res));

export default user;