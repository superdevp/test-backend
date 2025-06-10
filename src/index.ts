import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

connectDB();

dotenv.config({ path: '.env' });
const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Let\'s go!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
