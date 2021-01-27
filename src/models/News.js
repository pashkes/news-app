const NewsAPI = require("newsapi");
const newsApi = new NewsAPI("4a8fe73adfdf42b08c42464a591a7f9b");

class News {
  getNews(queries) {
    return newsApi.v2.everything(queries);
  }
}

module.exports = new News();
