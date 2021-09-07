const { home } = require("./home");

const SUCCESS_RESPONSE = {
  "/mock": {
    res: 0,
    data: {},
    msg: "success",
  },
  ...home,
};

const FAIL_RESPONSE = {
  res: 99999,
  msg: "mock系统异常",
  data: {},
};

const FAKE_RESPONSE = (url) => SUCCESS_RESPONSE[url] || FAIL_RESPONSE;

module.exports = {
  SUCCESS_RESPONSE,
  FAIL_RESPONSE,
  FAKE_RESPONSE,
};
