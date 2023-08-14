import express from 'express';
import { body } from 'express-validator';
import reviewController from '../controllers/review.controller.js';
import tokenMiddleware from '../middlewares/token.middleware.js';
import requestHandler from '../handlers/request.handler.js';

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  tokenMiddleware.auth,
  reviewController.getReviewsOfUser
);

router.post(
  '/',
  tokenMiddleware.auth,
  body('comicId')
    .exists().withMessage('comicId is required')
    .isLength({ min: 1 }).withMessage('comicId can not be empty'),
  body('content')
    .exists().withMessage('content is required')
    .isLength({ min: 1 }).withMessage('content can not be empty'),
  body('comicTitle')
    .exists().withMessage('mediaTitle is required'),
  body('comicThumbnail')
    .exists().withMessage('comicThumbnail is required'),
  requestHandler.validate,
  reviewController.create
);

router.delete(
  '/:reviewId',
  tokenMiddleware.auth,
  reviewController.remove
);

export default router;