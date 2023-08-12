import axiosClient from '../axios/axios.client.js';
import comicsConfig from './comics.config.js';

const comicsApi = {
  getList: async ({ comicType, page }) => {
    const endpoint = `${comicType}`;
    const params = { page };
    return await axiosClient.get(comicsConfig.getUrl(endpoint, params));
  }
};


export default comicsApi;