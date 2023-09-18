const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const secret = process.env.SECRET || "not-so-secret";
let APP_URL = process.env.APP_URL || "http://localhost:8081";
let apiURL = process.env.API_URL || "http://localhost:8080";

module.exports = { MONGO_URL, PORT, secret, APP_URL, apiURL };
