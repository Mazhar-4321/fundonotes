import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { LoginValidator } from '../validators/user.validator';

const router = express.Router();

//route to get all users

router.post('/registration', newUserValidator, userController.registerUser);
router.post('/login',LoginValidator, userController.signInUser);



export default router;
