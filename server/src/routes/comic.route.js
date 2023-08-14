import express from 'express';
import comicController from '../controllers/comic.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/trending', comicController.getTrending);
router.get('/genres', comicController.getGenres);
router.get('/genres/:genreId', comicController.getComicsByGenre);
router.get('/search', comicController.search);
router.get('/recommend', comicController.getRecommendComics);
router.get('/new', comicController.getNewComics);
router.get('/boy', comicController.getBoyComics);
router.get('/girl', comicController.getGirlComics);
router.get('/completed', comicController.getCompletedComics);
router.get('/recent', comicController.getRecentUpdate);
router.get('/detail/:comicId', comicController.getComicDetail);
router.get('/chapters/:comicId', comicController.getComicChapters);
router.get('/chapters/:comicId/:chapterId', comicController.getComicChapterDetail);
router.get('/top/:topType', comicController.getTopType);

export default router;