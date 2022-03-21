import { Router } from 'express';
import { AuthUserController } from './modules/users/services/AuthController';

const router = Router();

const authUserController = new AuthUserController();

router.post('/auth', authUserController.create);

export { router };