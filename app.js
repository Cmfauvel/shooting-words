/** @format */

require("dotenv").config();
const express = require("express");
const app = express();

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
const cors = require("cors");
const db = require("./models");
const api = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(process.cwd()+"/dist/generateurCitations"));

app.use(
  cors({
    origin: "*",
    credentials: true,
    // allowedHeaders: "origin",
    // methods: "GET, POST"
  })
);

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/dist/generateurCitations/index.html")
});

let port = process.env.PORT || 3005;
app.use("/api", api);

//.sync({ force: true })
db.sequelize.sync().then((req) => {
  app.listen(process.env.PORT || 3005, () => {
    console.log("server running");
  });
});