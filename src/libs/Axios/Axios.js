import axios from 'axios';
import { Cookies } from 'react-cookie';
import { COOKIE } from 'constants/cookie';

class Axios {
  #instance;
  #auth;
  #cookie;

  /**
   * @param {boolean} auth
   */
  constructor(auth = false) {
    this.#instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_BASE_ROUTE}`,
    });
    this.#auth = auth;
    this.#cookie = new Cookies();
    if (auth) this.#setAuth(auth);
  }

  #setAuth(auth) {
    this.#instance.interceptors.request.use(this.#reqAuthMiddleWare);
  }

  #reqAuthMiddleWare = (config) => {
    return {
      ...config,
      headers: {
        Authorization: `${this.#cookie.get(COOKIE.ACCESS_TOKEN)}`,
      },
    };
  };
}

export default Axios;
