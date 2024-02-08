import express from 'express';
import { protect } from '../middleware/userMiddleware.js';
import { registration, login, allUsers } from '../controller/userController.js';

const router = express.Router();

router.post('/registration', registration);
router.post('/login', login);
router.get('/', protect, allUsers);

export default router;
