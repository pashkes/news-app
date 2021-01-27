const http = require("http");
const port = "8000";
const news = require("./src/routes/news");

const server = http.createServer((req, res) => {
  news.getNews(req, res);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
