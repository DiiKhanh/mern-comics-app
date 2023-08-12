import comicsApi from '../apis/comics.api.js';
import responseHandler from '../handlers/response.handler.js';

const getTrending = async (req, res) => {
  try {
    const { page } = req.query;
    const { comicType } = req.params;
    if (comicType === 'trending-comics') {
      const response = await comicsApi.getList({ comicType, page });
      return responseHandler.ok(res, response);
    } else if (comicType === 'genres') {
      const response = await comicsApi.getList({ comicType });
      return responseHandler.ok(res, response);
    }
    return responseHandler.error(res);
  } catch {
    responseHandler.error(res);
  }
};

export default { getTrending };