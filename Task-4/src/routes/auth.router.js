import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js'
import {createValidationSchema} from '../middleware/validation.js'
import validate from '../middleware/validation.middleware.js'
import { checkSchema } from 'express-validator'

const authRouter = Router();


authRouter.post(
    '/login',
     authController.loginUser
)
    
authRouter.post(
    '/register',
    checkSchema(createValidationSchema),
    validate,
    authController.createUser
)

export default authRouter;