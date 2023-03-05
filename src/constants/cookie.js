export const KEY = Object.freeze({
  ACCESS_TOKEN: 'access-token',
  REFRESH_TOKEN: 'refresh-token',
});

export const EXPIRE = Object.freeze({
  ACCESS_TOKEN: 30 * 60 * 1000,
  REFRESH_TOKEN: 14 * 24 * 60 * 60 * 1000,
});

export const COOKIE = Object.freeze({
  KEY,
  EXPIRE,
});
