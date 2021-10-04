import { env } from "./wx-api";

const BASE_API = {
  develop: "https://www.nshealthy.com:443/testApi",
  trial: "https://www.nshealthy.com:443/testApi",
  release: "https://www.nshealthy.com:443/testApi",
};

export const handleRequestURL = function (url) {
  if (url.startsWith("https")) return url;

  return BASE_API[env] + url;
};
