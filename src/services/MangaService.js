const axios = require('axios').default;
class MangaService {
  randomManga = async () => {
    try {
      const data = (await axios.get('https://cdn1.apitruyen.tk/gettruyen')).data;
      return data;
    } catch {
      return [];
    }
  };
  randomManga1 = async () => {
    try {
      const data = (await axios.get('https://cdn.apitruyen.tk/randomtruyen?limit=3')).data;
      return data;
    } catch {
      return [];
    }
  };
  infoManga = async(id) => {
    try {
      const data = (await axios.get(`https://cdn.apitruyen.tk/info/${id}`)).data;
      return data;
    } catch {
      return [];
    }
  }
};
export default new MangaService();