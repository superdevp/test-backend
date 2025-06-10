import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import connectDB from "./config/db";
import user from "./routes/user";
import auth from "./routes/auth";

connectDB();

dotenv.config({ path: '.env' });
const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Let\'s go!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', auth);
app.use('/user', user);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
