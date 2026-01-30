import 'dotenv/config';
import { User} from '../models/user.model.js';
import { hashPassword, comparePassword } from '../middleware/helper.js';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (user) => {
      return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
}

export const createUser = async (data) => {
    try{
        data.password = hashPassword(data.password);
        const newUser = await User.create(data);
          const userObj = newUser.toObject();
            delete userObj.password;
            return userObj;
    }catch (err) {
    if (err.code === 11000) {
      throw new Error('Email already registered');
    }
    throw err;
  }
}


export const loginUser = async (data) => {
  const user = await User.findOne({ email: data.email })
  if (!user) throw new Error("User not registered");

  const isMatch = comparePassword(data.password, user.password);
  if (!isMatch) throw new Error("Password not matched");

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};
