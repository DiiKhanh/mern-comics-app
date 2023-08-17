import privateClient from '../client/private.client';
import publicClient from '../client/public.client';

const comicEndpoints = {
  trending: (comicType) => `comic/${comicType}`
};

const comicApi = {
  getTrending: async ({ comicType }) => {
    try {
      const response = await publicClient.get(
        comicEndpoints.trending(comicType)
      );
      return { response };
    } catch (err) { return { err }; }
  }
};

export default comicApi;