import express from 'express';
import comicRoute from './comic.route.js';

const router = express.Router();

router.use('/comic', comicRoute);

export default router;