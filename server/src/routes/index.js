import express from 'express';
import comicRoute from './comic.route.js';
import userRoute from './user.route.js';

const router = express.Router();

router.use('/comic', comicRoute);
router.use('/user', userRoute);

export default router;