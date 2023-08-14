import axiosClient from '../axios/axios.client.js';
import comicsConfig from './comics.config.js';

const comicType = {
  trending: 'trending-comics',
  genres: 'genres',
  search: 'search',
  recommend: 'recommend-comics',
  newComics: 'new-comics',
  boy: 'boy-comics',
  girl: 'girl-comics',
  completed: 'completed-comics',
  recentUpdate: 'recent-update-comics',
  comicDetail: (comicId) => `comics/${comicId}`,
  comicChapters: (comicId) => `comics/${comicId}/chapters`,
  comicChapterDetail: (comicId, chapterId) => `comics/${comicId}/chapters/${chapterId}`,
  comicTop: (topType) => {
    if (topType === 'top-comics') return 'top';
    return `top/${topType}`;
  }
};

const comicsApi = {
  getTrending: async ({ page }) => {
    const endpoint = `${comicType.trending}`;
    const params = { page };
    return await axiosClient.get(comicsConfig.getUrl(endpoint, params));
  },
  getGenres: async () => {
    const endpoint = `${comicType.genres}`;
    return await axiosClient.get(comicsConfig.getUrl(endpoint));
  },
  getComicsByGenre: async ({ genreId }) => {
    const endpoint = `${comicType.genres}/${genreId}`;
    return await axiosClient.get(comicsConfig.getUrl(endpoint));
  },
  getSearch: async ({ q, page }) => {
    const endpoint = `${comicType.search}`;
    const params = { q, page };
    return await axiosClient.get(comicsConfig.getUrl(endpoint, params));
  },
  getRecommend: async () => {
    const endpoint = `${comicType.recommend}`;
    return await axiosClient.get(comicsConfig.getUrl(endpoint));
  },
  getNewComics: async ({ page, status }) => {
    const endpoint = `${comicType.newComics}`;
    const params = { page, status };
    return await axiosClient.get(comicsConfig.getUrl(endpoint, params));
  },
  getBoyComics: async ({ page }) => {
    const endpoint = `${comicType.boy}`;
    const params = { page };
    return await axiosClient.get(comicsConfig.getUrl(endpoint, params));
  },
  getGirlComics: async ({ page }) => {
    const endpoint = `${comicType.girl}`;
    const params = { page };
    return await axiosClient.get(comicsConfig.getUrl(endpoint, params));
  },
  getCompletedComics: async ({ page }) => {
    const endpoint = `${comicType.completed}`;
    const params = { page };
    return await axiosClient.get(comicsConfig.getUrl(endpoint, params));
  },
  getRecentUpdate: async ({ page }) => {
    const endpoint = `${comicType.recentUpdate}`;
    const params = { page };
    return await axiosClient.get(comicsConfig.getUrl(endpoint, params));
  },
  getComicDetail: async ({ comicId }) => {
    const endpoint = comicType.comicDetail(comicId);
    return await axiosClient.get(comicsConfig.getUrl(endpoint));
  },
  getComicChapters: async ({ comicId }) => {
    const endpoint = comicType.comicChapters(comicId);
    return await axiosClient.get(comicsConfig.getUrl(endpoint));
  },
  getComicChapterDetail: async ({ comicId, chapterId }) => {
    const endpoint = comicType.comicChapterDetail(comicId, chapterId);
    return await axiosClient.get(comicsConfig.getUrl(endpoint));
  },
  getTopType: async ({ topType, page, status }) => {
    const endpoint = comicType.comicTop(topType);
    const params = { page, status };
    return await axiosClient.get(comicsConfig.getUrl(endpoint, params));
  }
};


export default comicsApi;