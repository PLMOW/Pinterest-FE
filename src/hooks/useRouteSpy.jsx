import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const AUTH_ROUTE = Object.freeze(['upload', 'user']);

/**
 * @param route string;
 * @param redirectRoute : string;
 * @returns
 */
const useRouteSpy = (route, redirectRoute) => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const isLogin = !!cookie.get('ACCESS_TOKEN');

  const routeSpy = () => {
    for (let i of AUTH_ROUTE) {
      const pathRegex = new RegExp(`[${i}]`, 'g');
      if (!!route.match(pathRegex) && !isLogin) navigate(redirectRoute);
    }
  };

  return routeSpy;
};

export default useRouteSpy;
