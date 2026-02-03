import * as userServices from '../services/user.service.js';
import { matchedData } from 'express-validator'

export const createUser = async (req, res, next) => {
  try {
    const data = matchedData(req);
    const user = await userServices.createUser(data);
    res.status(201).json(user);
  } catch (err) {
    next(err); // 👈 delegate error handling
  }
};

export const getAllUsers = async (req, res, next) => {
    try{
        const user = await userServices.getAllUsers();
        res.status(200).send({users: user})
    }catch(err){
        next(err);
    }
}

export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    try{
        const user = await userServices.getUserById(id);
        res.status(200).send(user);
    }catch(err){
        next(err);
    }
}

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  // Use req.body if matchedData isn't picking up fields correctly, 
  // but matchedData is better if validation is set up.
  const data = matchedData(req);

  try {
    const user = await userServices.updateUser(id, data);
    res.status(200).json({
      user, // This must be the updated user object
      msg: 'User updated'
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    await userServices.deleteUser(id);
    res.status(200).json({ msg: 'User deleted' });
  } catch (err) {
    next(err);
  }
};



