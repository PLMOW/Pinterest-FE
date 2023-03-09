import styled from 'styled-components';
import Logo from 'assets/icons/Logo';
import Search from 'assets/icons/Search';
import ThemeToggle from '../components/ThemeToggle';
import Add from 'assets/icons/Add';
import { useForm } from 'react-hook-form';
import { setSearchValue } from 'redux/modules/searchSlicer';
import Axios from 'libs/Axios';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { setLogin } from 'redux/modules/loginSlicer';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { KEY } from 'constants/cookie';
import { ToastContainer, toast } from 'react-toastify';

const Nav = () => {
  const [cookies, , removeCookie] = useCookies();
  const { register, handleSubmit } = useForm();
  const api = useMemo(() => new Axios(), []);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.loginSlicer);
  const navigate = useNavigate();
  const checkLogin = () => {
    const hasToken = !!cookies[KEY.ACCESS_TOKEN];
    if (hasToken) dispatch(setLogin(true));
  };
  const onValid = (data) => {
    const { searchKeyword } = data;
    getImages(searchKeyword);
  };

  const getImages = async (searchKeyword) => {
    const {
      data: { pins },
    } = await api.getByQuery('api/pins', {
      keyword: searchKeyword,
    });

    const shuffledPins = pins.sort(() => Math.random() - 0.5);
    dispatch(setSearchValue(shuffledPins));
  };

  const logout = () => {
    dispatch(setLogin(false));
    removeCookie(KEY.ACCESS_TOKEN);
    localStorage.removeItem('userInfo');
    toast.success('로그아웃 성공!', {
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  useEffect(() => {
    getImages();
    checkLogin();
  }, []);

  return (
    <>
      <ToastContainer />
      <Wrapper>
        <LeftWrapper>
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/upload">
            <Add />
          </Link>
        </LeftWrapper>
        <SearchWrapper onSubmit={handleSubmit(onValid)}>
          <Search />
          <SearchInput {...register('searchKeyword')} placeholder="search" />
        </SearchWrapper>
        <RightWrapper>
          <ThemeToggle />
          {isLogin ? (
            <Svg
              onClick={logout}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </Svg>
          ) : (
            <Link to="/login">
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </Svg>
            </Link>
          )}
        </RightWrapper>
      </Wrapper>
    </>
  );
};

export default Nav;

const Wrapper = styled.div`
  padding: 4px 16px;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0%;
  width: 100%;
  display: flex;
  height: 80px;
  align-items: center;
  gap: 10px;
  min-width: 400px;
  background: ${({ theme }) => theme.background};
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
`;

const SearchWrapper = styled.form`
  width: calc(100% - 210px);
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
`;

const SearchInput = styled.input`
  color: ${({ theme }) => theme.background};
  background: ${({ theme }) => theme.transparentColor};
  transition: ${({ theme }) => theme.transitionOption};
  border: none;
  outline: none;
  padding: 12px 10px 12px 50px;
  font-size: 18px;
  border-radius: 50px;
  width: 100%;
  opacity: 0.6;
  :focus {
    opacity: 1;
  }
`;

const Svg = styled.svg`
  margin-right: 30px;
  margin-left: 10px;
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  transition: ${({ theme }) => theme.transitionOption};
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.transparentColor};
    color: ${({ theme }) => theme.background};
  }
`;
