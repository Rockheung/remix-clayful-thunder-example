const express = require("express");
const har = require("har-express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:8080",
  credentials: true,
  exposedHeaders: "WWW-Authenticate,Server-Authorization,content-currency,content-time-zone,clayful-product-censored",
  allowedHeaders: "Accept,Authorization,Content-Type,If-None-Match,accept-language,accept-currency,accept-time-zone,accept-debug-language,authorization-customer,recaptcha-response,clayful-sdk",
  maxAge: 86400
}));
app.use(har.getMiddleware(process.env.HAR));
app.listen(8000);
