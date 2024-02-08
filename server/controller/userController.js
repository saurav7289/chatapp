import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../database/generateToken.js';

export const registration = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  try {
    if ((!name, !email, !password)) {
      res.status(400);
      throw new error('All Field are mandatory');
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      res.status(400);
      throw new error('Email is Already exists');
    }

    const userCreate = await User.create({
      name,
      email,
      password,
      pic,
    });
    if (userCreate) {
      res.status(201).json({
        _id: userCreate._id,
        name: userCreate.name,
        password: userCreate.password,
        pic: userCreate.pic,
        token: generateToken(userCreate._id),
      });
    } else {
      res.status(400);
      throw new error('Failed to created new user');
    }
  } catch (error) {
    console.log(error);
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new error('Enter email and password');
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }
});

export const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({_id: {$ne:req.user._id} });
  res.send(users);
});
