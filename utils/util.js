export const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join("/")} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(":")}`;
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join("/");
};

export const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

export function throttle(fn, delay) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn();
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}

export function debounce(fn, delay) {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);

    timer = setTimeout(fn, delay);
  };
}
