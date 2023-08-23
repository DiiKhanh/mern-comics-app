import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  },
  comicStatus: {
    type: String,
    required: true
  },
  comicViews: {
    type: Number,
    required: true
  },
  comicFollowers: {
    type: Number,
    required: true
  },
  comicUpdate: {
    type: String,
    required: true
  }
}, modelOptions);

const favoriteModel = mongoose.model('Favorite', favoriteSchema);
export default favoriteModel;