import {User} from '../models/user.model.js';

export const createUser = async (data) => {
  try {
    return await User.create(data);
  } catch (err) {
    if (err.code === 11000) {
      throw new Error('Email already registered');
    }
    throw err;
  }
};

export const getAllUsers = async () => {
  return await User.find();
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
