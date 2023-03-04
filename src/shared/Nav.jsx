import styled from 'styled-components';
import Logo from 'assets/icons/Logo';
import Search from 'assets/icons/Search';
import ThemeToggle from './ThemeToggle';
import Add from 'assets/icons/Add';

const Nav = () => {
  return (
    <Wrapper>
      <LeftWrapper>
        <Logo />
        <Add></Add>
      </LeftWrapper>
      <SearchWrapper>
        <Search />
        <SearchInput placeholder="search" />
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

const SearchWrapper = styled.div`
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
