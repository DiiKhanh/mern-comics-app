import comicsApi from '../apis/comics.api.js';
import responseHandler from '../handlers/response.handler.js';
import tokenMiddleWare from '../middlewares/token.middleware.js';
import favoriteModel from '../models/favorite.model.js';
import userModel from '../models/user.model.js';
import reviewModel from '../models/review.model.js';

const getTrending = async (req, res) => {
  try {
    const { page } = req.query;
    const response = await comicsApi.getTrending({ page });
    return responseHandler.ok(res, response);
  } catch {
    return responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const response = await comicsApi.getGenres();
    return responseHandler.ok(res, response);
  } catch {
    return responseHandler.error(res);
  }
};

const getComicsByGenre = async (req, res) => {
  try {
    const { genreId } = req.params;
    const response = await comicsApi.getComicsByGenre({ genreId });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { q, page } = req.query;
    const response = await comicsApi.getSearch({ q, page });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getRecommendComics = async (req, res) => {
  try {
    const response = await comicsApi.getRecommend();
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getNewComics = async (req, res) => {
  try {
    const { page = 1, status = 'all' } = req.query;
    const response = await comicsApi.getNewComics({ page, status });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getBoyComics = async (req, res) => {
  try {
    const { page } = req.query;
    const response = await comicsApi.getBoyComics({ page });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getGirlComics = async (req, res) => {
  try {
    const { page } = req.query;
    const response = await comicsApi.getGirlComics({ page });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getCompletedComics = async (req, res) => {
  try {
    const { page } = req.query;
    const response = await comicsApi.getCompletedComics({ page });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getRecentUpdate = async (req, res) => {
  try {
    const { page } = req.query;
    const response = await comicsApi.getRecentUpdate({ page });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getComicDetail = async (req, res) => {
  try {
    const { comicId } = req.params;
    const params = { comicId };
    const comic = await comicsApi.getComicDetail(params);
    comic.recommend = await comicsApi.getRecommend();

    const tokenDecoded = tokenMiddleWare.tokenDecode(req);
    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        const isFavorite = await favoriteModel.findOne({ user: user.id, comicId });
        comic.isFavorite = isFavorite !== null;
      }
    }

    comic.reviews = await reviewModel.find({ comicId }).populate('user').sort('-createAt');

    return responseHandler.ok(res, comic);
  } catch {
    responseHandler.error(res);
  }
};

const getComicChapters = async (req, res) => {
  try {
    const { comicId } = req.params;
    const response = await comicsApi.getComicChapters({ comicId });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getComicChapterDetail = async (req, res) => {
  try {
    const { comicId, chapterId } = req.params;
    const response = await comicsApi.getComicChapterDetail({ comicId, chapterId });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getTopType = async (req, res) => {
  try {
    const { topType } = req.params;
    const { page, status } = req.query;
    const response = await comicsApi.getTopType({ topType, page, status });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

export default { getTrending, getGenres, getComicsByGenre, search, getRecommendComics, getNewComics, getBoyComics, getGirlComics, getCompletedComics, getRecentUpdate, getComicDetail, getComicChapters, getComicChapterDetail, getTopType };