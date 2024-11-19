const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5050;
const mongoURI = process.env.SERVER_DB_ADDRESS;
const corsOptions = {
  origin: process.env.CLIENT_URL, // 쿠키때문에 클라이언트url정하지 않으면 cors발생
  credentials: true, // 쿠키 및 자격 증명 허용
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", indexRouter);

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connection");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
