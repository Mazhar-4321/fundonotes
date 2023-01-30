import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { LoginValidator } from '../validators/user.validator';
const router = express.Router();
router.post('/', newUserValidator, userController.registerUser);
router.post('/login', userController.signInUser);
export default router;
