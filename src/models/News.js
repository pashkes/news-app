const NewsAPI = require("newsapi");
const newsApi = new NewsAPI("4a8fe73adfdf42b08c42464a591a7f9b");

class News {
  getNews(queries) {
    try {
      return newsApi.v2.everything(queries);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new News();
