import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator,passwordValidator,loginValidator, emailValidator } from '../validators/user.validator';
import { userAuthForReset } from '../middlewares/auth.middleware'

const router = express.Router();

router.post('/', newUserValidator, userController.registerUser);

router.post('/login',loginValidator, userController.signInUser);

router.put('/reset/:id', passwordValidator, userAuthForReset, userController.resetPassword)

router.put('/forget',emailValidator, userController.forgetPassword)

export default router;
