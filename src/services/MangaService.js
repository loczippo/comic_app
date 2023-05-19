const axios = require('axios').default;
class MangaService {
  randomManga = async () => {
    try {
      const data = (await axios.get('https://cdn.apitruyen.tk/randomtruyen?limit=3')).data;
      return data;
    } catch {
      return [];
    }
  };
};
export default new MangaService();