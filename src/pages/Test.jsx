const Test = () => {
  const kakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=5d8ed25e63b7f00ff427d9b51608c030&redirect_uri=http://localhost:3009/oauth/kakao&response_type=code`;
  };

  return <button onClick={kakaoLogin}>카카오 로그인 버튼</button>;
};

export default Test;
