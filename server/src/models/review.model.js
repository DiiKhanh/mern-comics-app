import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comicId: {
    type: String,
    required: true
  },
  comicTitle: {
    type: String,
    required: true
  },
  comicThumbnail: {
    type: String,
    required: true
  }
}, modelOptions);

const reviewModel = mongoose.model('Review', reviewSchema);
export default reviewModel;