import express from 'express';
import comicController from '../controllers/comic.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/:comicType', comicController.getTrending);

export default router;