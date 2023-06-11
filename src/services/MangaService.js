const axios = require('axios').default;

import config from '../config';
class MangaService {
  comicReader = async (id, index) => {
    try {
      return (await axios.get(`${config.API_URL}/doctruyen/${id}/${index}`)).data;
    } catch {
      return [];
    }
  };
  latestUpdateComic = async (currentPage = 1, limit = 5) => {
    try {
      return (await axios.get(`${config.API_URL}/mobile/gettruyen?page=${currentPage}&limit=${limit}`)).data;
    } catch {
      return [];
    }
  };
  randomManga1 = async () => {
    try {
      return (await axios.get(`${config.API_URL}/randomtruyen?limit=3`)).data;
    } catch {
      return [];
    }
  };
  comicInfo = async (id) => {
    try {
      return (await axios.get(`${config.API_URL}/info/${id}`)).data;
    } catch {
      return [];
    }
  }
  comicComments = async (id) => {
    try {
      return (await axios.get(`${config.API_URL}/comment/${id}`)).data;
    } catch {
      return null;
    }
  }
  comicLikeComment = async (id) => {
    try {
      return (await axios.patch(`${config.API_URL}/like/${id}`)).data;
    } catch {
      return null;
    }
  }
  comicLikeComment = async (id) => {
    try {
      return (await axios.patch(`${config.API_URL}/like/${id}`)).data;
    } catch {
      return null;
    }
  }
  comicSendComment = async (data) => {
    try {
      return (await axios.post(`${config.API_URL}/comment`, data)).data;
    } catch {
      return null;
    }
  }
};
export default new MangaService();