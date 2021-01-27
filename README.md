# News app
The app has been developed using follow version Node.js: 14.15.4 LTS
## How to run? 🚀
`npm i`
`npm start` or `npm run dev` (for Dev mode)
## Api documentation 📜
Root URL: `http://localhost:8000`
Or remote URL also available, for example: https://pavel-news-app.herokuapp.com/search?query=test

### Routes:
`/search`

With follow parameters:
1. `query` - key word for search (**required**)
2. `limit` - limit news (**optional**)
3. `from` - date when news was stored in the file (**optional**)
