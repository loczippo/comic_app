const axios = require('axios').default;
class MangaService {
  comicReader = async (id, index) => {
    try {
      const data = (await axios.get(`https://cdn.apitruyen.tk/doctruyen/${id}/${index}`)).data;
      return data;
    } catch {
      return [];
    }
  };
  latestUpdateComic = async () => {
    try {
      const data = (await axios.get('https://cdn.apitruyen.tk/mobile/gettruyen')).data;
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