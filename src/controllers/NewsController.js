const StorageApi = require("../storage/StorageApi");
const News = require("../models/News");

const { getUrlParams, handleError } = require("../../utils");

const ErrorMessage = {
  QUERY: "Parameter {query} must be required",
  LIMIT: "Parameter {limit} must be a number type",
  FROM: "Parameter {from} must be a valid date time",
  SERVER: "Internal Server Error",
};

const GetNewsController = async function (req, res) {
  const { query, limit, from } = getUrlParams(req.url);
  const params = {
    q: query,
  };

  if (limit) params.pageSize = limit;

  handleValidateQueries({ query, limit, from }, res);

  try {
    const sourceData = await News.getNews(params);
    const news = await StorageApi.getNews(sourceData, from);

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(news));
  } catch (err) {
    console.error(err);
    handleError(res, 500, ErrorMessage.SERVER);
  }
};

const handleValidateQueries = ({ query, limit, fromDate }, res) => {
  const isInvalidDateFormat = !+new Date(fromDate);
  const isNotInteger = !Number.isInteger(+limit);

  if (!query) {
    handleError(res, 400, ErrorMessage.QUERY);
  }

  if (limit && isNotInteger) {
    handleError(res, 400, ErrorMessage.LIMIT);
  }

  if (fromDate && isInvalidDateFormat) {
    handleError(res, 400, ErrorMessage.FROM);
  }
};

module.exports = GetNewsController;
