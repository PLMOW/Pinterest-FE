import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import Axios from 'libs/Axios';
import { COOKIE } from 'constants/cookie';
import { useEffect, useState } from 'react';

const AUTH_ROUTE = Object.freeze(['/upload']);

/**
 * @param route string;
 * @param redirectRoute : string;
 * @returns
 */

const useRouteSpy = (route, redirectRoute) => {
  const [isValid, setIsValid] = useState(false);
  const api = new Axios(true);
  const navigate = useNavigate();

  const routeSpy = async () => {
    const cookie = new Cookies();
    const hasToken = cookie.get(COOKIE.KEY.ACCESS_TOKEN);
    if (!hasToken) return navigate(redirectRoute);
    const token = hasToken.split(' ')[1];
    const {
      data: { ok: isValid },
    } = await api.post('api/checkAuth', { token });

    if (isValid) setIsValid((prev) => true);

    for (let i of AUTH_ROUTE) {
      const pathRegex = new RegExp(`[${i}]`, 'g');
      if (!!route.match(pathRegex) && !isValid) return navigate(redirectRoute);
    }
  };

  return routeSpy;
};

export default useRouteSpy;
