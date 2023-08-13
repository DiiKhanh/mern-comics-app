import comicsApi from '../apis/comics.api.js';
import responseHandler from '../handlers/response.handler.js';

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
    const { page=1, status='all' } = req.query;
    const response = await comicsApi.getNewComics({ page, status });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

export default { getTrending, getGenres, getComicsByGenre, search, getRecommendComics, getNewComics };