import { Router } from 'express';
import { login, loginInfo } from '../controllers/authController.js';

const router = Router();

router.get('/login', loginInfo); // For basic API info / health
router.post('/login', login);

export default router;

