import styled from 'styled-components';

const Test = () => {
  const kakaoLogin = () => {
    console.log('click!');
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_API_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_API_BASE_ROUTE}oauth/kakao&response_type=code`;
  };

  return (
    <Wrapper>
      <Button onClick={kakaoLogin}>카카오 로그인 버튼</Button>
    </Wrapper>
  );
};

export default Test;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Button = styled.div`
  padding: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.background};
  margin-top: 20px;

  :hover {
    cursor: pointer;
  }
`;
