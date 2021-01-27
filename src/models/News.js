const NewsAPI = require("newsapi");
const newsApi = new NewsAPI("56ebe961104d4ef4a60e4586250e11b7");

class News {
  getNews(queries) {
    return newsApi.v2.everything(queries);
  }
}

module.exports = new News();
