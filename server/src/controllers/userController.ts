// src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/userModel';

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export default { getUsers, createUser };