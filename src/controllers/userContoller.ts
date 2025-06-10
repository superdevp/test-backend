import { Request, Response } from 'express';
import User from '../models/user.model';
import {
    BadRequestError
} from '../utils/customErrors'

const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("User already exists with that email");
    }

    const user = new User({
        firstName,
        lastName,
        email,
        password
    })
    user.save().then((user) => {
        res.status(201).json(user)
    }).catch((err) => {
        res.status(400).json(err)
    })
}

const getAllUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json(users);
}

export {
    createUser,
    getAllUsers
}