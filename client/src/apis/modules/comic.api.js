import privateClient from '../client/private.client';
import publicClient from '../client/public.client';

const comicEndpoints = {
  type: (comicType) => `comic/${comicType}`,
  detail: (comicId) => `comic/detail/${comicId}`
};

const comicApi = {
  getType: async ({ comicType, page }) => {
    try {
      const response = await publicClient.get(
        comicEndpoints.type(comicType)+`?page=${page}`
      );
      return { response };
    } catch (err) { return { err }; }
  },
  getPopular:  async ({ comicType }) => {
    try {
      const response = await publicClient.get(
        comicEndpoints.type(comicType)
      );
      return { response };
    } catch (err) { return { err }; }
  },
  getComicDetail: async ({ comicId }) => {
    try {
      const response = await privateClient.get(comicEndpoints.detail(comicId));
      return { response };
    } catch (err) { return { err }; }
  }
};

export default comicApi;