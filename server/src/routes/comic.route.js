import express from 'express';
import comicController from '../controllers/comic.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/trending', comicController.getTrending);
router.get('/genres', comicController.getGenres);
router.get('/genres/:genreId', comicController.getComicsByGenre);
router.get('/search', comicController.search);
router.get('/recommend', comicController.getRecommendComics);
router.get('/new', comicController.getNewComics);

export default router;