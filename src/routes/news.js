const url = require("url");

const GetNewsController = require("../controllers/NewsController");
const { handleError } = require("../../utils");

const getNews = (req, res) => {
  const { pathname } = url.parse(req.url);

  if (req.method !== "GET" && pathname === "/search") {
    handleError(res, 405, "Method Not Allowed");
  }

  if (req.method === "GET" && pathname === "/search") {
    GetNewsController(req, res);
  } else {
    handleError(res, 404, "Route is not found");
  }
};

module.exports = { getNews };
