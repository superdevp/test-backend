import { Request, Response} from 'express';
import { BadRequestError, UnauthorizedError } from '../utils/customErrors';
import User from '../models/user.model';
import { generateAccessToken } from '../utils/token';

const login = async (req: any, res: any) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    const token = generateAccessToken(user.id);

    res.status(201).json({
        success: true,
        message: "Successfully logged in",
        token,
        user
    });
}

interface RequestWithToken extends Request {
  user?: {
    id: string;
  };
}

const getCurrentUser = async (req: RequestWithToken, res: Response) => {
    const user = await User.findById(req.user?.id);

    if (!user) {
      throw new UnauthorizedError("User not found or session expired");
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        avatar: user.firstName,
        firstname: user.lastName,
        lastname: user.email,
      },
    });
}

export {
    login,
    getCurrentUser
}