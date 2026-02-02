import {Router} from "express";
import * as userController from '../controllers/user.controller.js'
import { createValidationSchema } from '../middleware/validation.js'
import { checkSchema } from 'express-validator'
import validate  from '../middleware/validation.middleware.js'
import authenticate  from "../middleware/auth.middleware.js";
import roleBasedAuthentication from "../middleware/roleBasedAuth.middleware.js";

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.redirect('/');
})

userRouter.get('/user',
    userController.getAllUsers
);

userRouter.get(
    '/user/:id',
     userController.getUserById
)

userRouter.post(
    '/user',
    checkSchema(createValidationSchema),
    validate,
    userController.createUser
);

userRouter.put(
    '/user/:id',
    checkSchema(createValidationSchema),
    validate,
    userController.updateUser
);

userRouter.delete(
  '/user/:id',
//   roleBasedAuthentication(['Admin']),
  userController.deleteUser
);

export default userRouter;