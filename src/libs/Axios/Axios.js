import axios from 'axios';
import { Cookies } from 'react-cookie';
import { KEY, EXPIRE } from 'constants/cookie';

class Axios {
  #instance;
  #auth;
  #cookie;

  /**
   * @param {boolean} isAuthReq
   */
  constructor(isAuthReq = false) {
    this.#instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_BASE_ROUTE}`,
    });
    this.#auth = isAuthReq;
    this.#cookie = new Cookies();
    this.#setInterceptor();
  }

  /* Incerceptor */
  #setInterceptor() {
    this.#instance.interceptors.request.use(
      this.#reqMiddleWare.bind(this),
      this.#reqOnError.bind(this)
    );
    this.#instance.interceptors.response.use(
      this.#resMiddleWare.bind(this),
      this.#resOnError.bind(this)
    );
  }

  /* Req */
  #reqMiddleWare(config) {
    let newConfig = config;
    if (this.#auth) newConfig = this.#setAuthReq(newConfig);

    return newConfig;
  }

  #setAuthReq(config) {
    const { headers } = config;
    const newConfig = {
      ...config,
      headers: {
        ...headers,
        Authorization: `${this.#cookie.get(KEY.ACCESS_TOKEN)}`,
      },
    };

    return newConfig;
  }

  #reqOnError(error) {}

  /* Res */
  #resMiddleWare(res) {
    this.#instance.interceptors.response.use();
    const { authorization, refreshtoken } = res.headers;

    if (authorization) {
      const validUntil = new Date();
      validUntil.setTime(new Date().getTime() + EXPIRE.ACCESS_TOKEN);

      this.#cookie.set(KEY.ACCESS_TOKEN, authorization, {
        path: '/',
        expires: validUntil,
      });
    }

    if (refreshtoken) {
      const validUntil = new Date();
      validUntil.setTime(new Date().getTime() + EXPIRE.REFRESH_TOKEN);

      this.#cookie.set(KEY.REFRESH_TOKEN, refreshtoken, {
        path: '/',
        expires: validUntil,
      });
    }
  }

  #resOnError(error) {}

  /**
   * @param {string} endPoint
   */
  get(endPoint) {
    this.#instance({
      url: endPoint,
    });
  }

  /**
   * @param {string} endPoint
   * @param {string} query
   */
  getByQuery(endPoint, query) {}

  /**
   * @param {string} endPoint
   * @param {string} query
   */
  getByParams(endPoint, params) {}
}

export default Axios;
