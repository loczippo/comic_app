const axios = require('axios').default;
class MangaService {
  comicReader = async (id, index) => {
    try {
      const data = (await axios.get(`https://cdn.truyenxxhot.com/doctruyen/${id}/${index}`)).data;
      return data;
    } catch {
      return [];
    }
  };
  latestUpdateComic = async () => {
    try {
      const data = (await axios.get('https://cdn.truyenxxhot.com/mobile/gettruyen')).data;
      return data;
    } catch {
      return [];
    }
  };
  randomManga1 = async () => {
    try {
      const data = (await axios.get('https://cdn.truyenxxhot.com/randomtruyen?limit=3')).data;
      return data;
    } catch {
      return [];
    }
  };
  infoManga = async(id) => {
    try {
      const data = (await axios.get(`https://cdn.truyenxxhot.com/info/${id}`)).data;
      return data;
    } catch {
      return [];
    }
  }
};
export default new MangaService();