const fs = require("fs");

const { ensureDirectoryExistence } = require("../../utils");

const storePath = `${__dirname}/../../data/.`;

class StorageApi {
  saveNews = async function (response) {
    await ensureDirectoryExistence(storePath);
    const files = (await fs.promises.readdir(storePath)) || [];

    for await (let article of response.articles) {
      const isFileExist = files.includes(`${article.publishedAt}.json`);

      if (!isFileExist) {
        const pathToFile = `${__dirname}/../../data/${article.publishedAt}.json`;
        const fileData = JSON.stringify({
          content: article.content || "",
          timestamp: new Date().toISOString(),
        });

        try {
          await fs.promises.writeFile(pathToFile, fileData);
        } catch (err) {
          console.error(err);
        }
      }
    }

    const jsonReg = /\.json$/;

    return files.filter((it) => jsonReg.test(it));
  };

  getNews = async function (res, fromDate) {
    const targetFiles = res.articles.map(({ publishedAt }) => publishedAt);
    let dataNews = [];

    await this.saveNews(res);

    for await (let fileName of targetFiles) {
      const pathToFile = `${__dirname}/../../data/${fileName}.json`;

      try {
        const bufferData = await fs.promises.readFile(pathToFile);
        dataNews.push(JSON.parse(bufferData.toString()));
      } catch (err) {
        console.error(err);
      }
    }

    if (fromDate) {
      return this.filterByFrom(dataNews, fromDate);
    }

    return dataNews;
  };

  filterByFrom(news, date) {
    return news.filter((it) => new Date(it.timestamp) >= new Date(date));
  }
}

module.exports = new StorageApi();
