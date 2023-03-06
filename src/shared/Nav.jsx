import styled from 'styled-components';
import Logo from 'assets/icons/Logo';
import Search from 'assets/icons/Search';
import ThemeToggle from '../components/ThemeToggle';
import Add from 'assets/icons/Add';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setSearchValue } from 'redux/modules/searchSlicer';
import Axios from 'libs/Axios';
import { useEffect } from 'react';

const Nav = () => {
  const { register, handleSubmit, watch } = useForm();
  const api = new Axios();
  const dispatch = useDispatch();

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

  useEffect(() => {
    getImages();
  }, []);

  return (
    <Wrapper>
      <LeftWrapper>
        <Logo />
        <Add></Add>
      </LeftWrapper>
      <SearchWrapper onSubmit={handleSubmit(onValid)}>
        <Search />
        <SearchInput {...register('searchKeyword')} placeholder="search" />
      </SearchWrapper>
      <RightWrapper>
        <ThemeToggle />
      </RightWrapper>
    </Wrapper>
  );
};

export default Nav;

const Wrapper = styled.div`
  padding: 4px 16px;
  position: fixed;
  z-index: 1;
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
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
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
