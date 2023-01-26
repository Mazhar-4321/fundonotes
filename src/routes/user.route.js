import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.post('', newUserValidator, userController.registerUser);
router.post('/login', userController.signInUser);


export default router;
