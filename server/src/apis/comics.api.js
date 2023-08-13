import axiosClient from '../axios/axios.client.js';
import comicsConfig from './comics.config.js';

const comicType = {
  trending: 'trending-comics',
  genres: 'genres',
  search: 'search',
  recommend: 'recommend-comics',
  newComics: 'new-comics'
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
  }
};


export default comicsApi;