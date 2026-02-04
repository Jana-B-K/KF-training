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
  // If matchedData is failing, it means your validation middleware 
  // doesn't "match" the fields you're sending (like role or missing password)
  const data = req.body; 

  try {
    const user = await userServices.updateUser(id, data);
    res.status(200).json({ user, msg: 'User updated' });
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



