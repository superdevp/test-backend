import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from '../utils/customErrors';

const JWT_SECRET = process.env.JWT_SECRET || "helloworld!";

interface ReequestWithUser extends Request {
    user?: {
        id: string
    };
}

const verifyToken = (req: ReequestWithUser, res: Response, next: NextFunction) => {
  try {
      const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Access denied. No token provided");
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = {
        id: (decoded as any).userId,
      };

      next();
    } catch (error) {
      throw new UnauthorizedError("Invalid token");
    }
  } catch (error) {
    next(error);
  }
};

export default verifyToken;