import express from 'express';
import userController from '../controllers/user.controller.js';
import requestHandler from '../handlers/request.handler.js';
import tokenMiddleware from '../middlewares/token.middleware.js';
import { body } from 'express-validator';
import userModel from '../models/user.model.js';

const router = express.Router({ mergeParams: true });

router.post('/signup',
  body('username').exists().withMessage('Username is required').isLength({ min: 6 }).withMessage('Username minium 6 characters').custom(async value => {
    const user = await userModel.findOne({ username: value });
    if (user) return Promise.reject('Username already used');
  }), body('email').exists().withMessage('Email is required').isEmail().withMessage('Email not valid'), body('password')
    .exists().withMessage('password is required')
    .isLength({ min: 6 }).withMessage('password minimum 6 characters'),
  body('confirmPassword')
    .exists().withMessage('confirmPassword is required')
    .isLength({ min: 6 }).withMessage('confirmPassword minimum 6 characters')
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('confirmPassword not match');
      return true;
    }),
  body('displayName')
    .exists().withMessage('displayName is required')
    .isLength({ min: 6 }).withMessage('displayName minimum 6 characters'),
  requestHandler.validate,
  userController.signup);

router.post('/signin',
  body('username')
    .exists().withMessage('username is required')
    .isLength({ min: 6 }).withMessage('username minimum 6 characters'),
  body('password')
    .exists().withMessage('password is required')
    .isLength({ min: 6 }).withMessage('password minimum 6 characters'),
  requestHandler.validate,
  userController.signin);

router.put('/update-password', tokenMiddleware.auth,
  body('password')
    .exists().withMessage('password is required')
    .isLength({ min: 8 }).withMessage('password minimum 8 characters'),
  body('newPassword')
    .exists().withMessage('newPassword is required')
    .isLength({ min: 8 }).withMessage('newPassword minimum 8 characters'),
  body('confirmNewPassword')
    .exists().withMessage('confirmNewPassword is required')
    .isLength({ min: 8 }).withMessage('confirmNewPassword minimum 8 characters')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) throw new Error('confirmNewPassword not match');
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword);

router.get('/info', tokenMiddleware.auth, userController.getInfo );

router.get('/favorites');
router.post('/favorites');
router.delete('/favorites/:favoriteId');

export default router;