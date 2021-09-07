import { env } from "./wx-api";

const BASE_API = {
  develop: "https://test.joinhealth.cn/api/v2",
  trial: "https://test.joinhealth.cn/api/v2",
  release: "https://www.lanniuh.com/api/v2",
};

/**
 * 疾病百科
 */
const WEB_BIN = {
  develop: "https://www.lanniuh.com",
  trial: "https://www.lanniuh.com",
  release: "https://www.lanniuh.com",
};

/**
 * 数疗
 */
const DIGITAL_THERAPY = {
  develop: "http://192.168.3.20:7008",
  trial: "http://192.168.3.20:7008",
  release: "https://entrance.lanniuh.com/api/v2/celina-health",
};

export const handleRequestURL = function (url) {
  if (url.startsWith("https")) return url;

  if (url.startsWith("/digital-medical")) return BASE_API[env] + url;

  if (url.startsWith("/celina-question")) return BASE_API[env] + url;

  if (url.startsWith("/paas-user2")) return BASE_API[env] + url;

  /* 数疗 */
  if (url.startsWith("/several-treatment")) return DIGITAL_THERAPY[env] + url;

  /* 埋点 */
  if (url.startsWith("/event-track")) return BASE_API[env] + url;

  if (url.startsWith("/web-bin")) return WEB_BIN[env] + url;

  return BASE_API[env] + url;
};
