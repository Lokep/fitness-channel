const express = require("express");
const Mock = require("mockjs");
const bodyParser = require("body-parser");
const app = express();

const { SUCCESS_RESPONSE, FAIL_RESPONSE } = require("../mock/index");

app.use(bodyParser.json());

// 允许跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  // 此处根据前端请求携带的请求头进行配置
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

for (let key in SUCCESS_RESPONSE) {
  app.get(key, (req, res, next) => {
    res.send(SUCCESS_RESPONSE[key] || FAIL_RESPONSE);
    next();
  });
  app.post(key, (req, res, next) => {
    res.send(SUCCESS_RESPONSE[key] || FAIL_RESPONSE);
    next();
  });
}

app.listen("3000", () => {
  console.log("监听端口 3000");
});
