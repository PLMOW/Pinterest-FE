import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import Axios from 'libs/Axios';

const AUTH_ROUTE = Object.freeze(['upload', 'user']);

/**
 * @param route string;
 * @param redirectRoute : string;
 * @returns
 */

const useRouteSpy = (route, redirectRoute) => {
  const api = new Axios();
  const navigate = useNavigate();
  const cookie = new Cookies();
  const token = !!cookie.get('ACCESS_TOKEN');

  const checkAuth = async () => {
    return await api.getByParams('api/checkAuth', token);
  };
  const { data: isValid } = checkAuth();

  const routeSpy = () => {
    for (let i of AUTH_ROUTE) {
      const pathRegex = new RegExp(`[${i}]`, 'g');
      if (!!route.match(pathRegex) && !isValid) navigate(redirectRoute);
    }
  };

  return routeSpy;
};

export default useRouteSpy;
