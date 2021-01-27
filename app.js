const http = require("http");
const port = process.env.PORT || "8000";

const newsRoute = require("./src/routes/news");

const server = http.createServer((req, res) => {
  newsRoute.getNews(req, res);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
