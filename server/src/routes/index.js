import express from 'express';
import comicRoute from './comic.route.js';
import userRoute from './user.route.js';
import reviewRoute from './review.route.js';

const router = express.Router();

router.use('/comic', comicRoute);
router.use('/user', userRoute);
router.use('/review', reviewRoute);

export default router;