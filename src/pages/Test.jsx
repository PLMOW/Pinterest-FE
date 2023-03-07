const Test = () => {
  const kakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_API_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_API_BASE_ROUTE}oauth/kakao&response_type=code`;
  };

  return <button onClick={kakaoLogin}>카카오 로그인 버튼</button>;
};

export default Test;
