import privateClient from '../client/private.client.js';

const reviewEndpoints = {
  list: 'reviews',
  add: 'reviews',
  remove: ({ reviewId }) => `reviews/${reviewId}`
};

const reviewApi = {
  add: async ({
    comicId,
    content,
    comicTitle,
    comicThumbnail
  }) => {
    try {
      const response = await privateClient.post(
        reviewEndpoints.add,
        {
          comicId,
          content,
          comicTitle,
          comicThumbnail
        }
      );
      return { response };
    } catch (err) { return { err }; }
  },
  remove: async ({ reviewId }) => {
    try {
      const response = await privateClient.delete(reviewEndpoints.remove({ reviewId }));
      return { response };
    } catch (err) { return { err }; }
  },
  getList: async () => {
    try {
      const response = await privateClient.get(reviewEndpoints.list);
      return { response };
    } catch (err) { return { err }; }
  }
};

export default reviewApi;