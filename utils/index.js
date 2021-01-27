const path = require("path");
const fs = require("fs");

const getUrlParams = (search) => {
  const hashes = search.slice(search.indexOf("?") + 1).split("&");
  const params = {};

  hashes.map((hash) => {
    const [key, val] = hash.split("=");
    params[key] = val;
  });

  return params;
};

const handleError = (res, code, message) => {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: message }));
};

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);

  if (fs.existsSync(dirname)) {
    return true;
  }

  ensureDirectoryExistence(dirname);
  return fs.promises.mkdir(dirname).catch((err) => console.error(err));
};

module.exports = { getUrlParams, ensureDirectoryExistence, handleError };
