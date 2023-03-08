import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ReactHookInput from 'components/form/ReactHookInput';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'libs/Axios';
import { useMemo } from 'react';
import SocialLogin from 'components/SocialLogin';
import { Cookies } from 'react-cookie';
import { KEY, EXPIRE } from 'constants/cookie';

const Login = () => {
  const [_, setCookie] = useCookies();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const api = useMemo(() => new Axios(), []);

  const getLogin = async ({ email, password }) => {
    return await api.post('api/login', { email, password });
  };

  const { mutate, data, isLoading } = useMutation(getLogin, {
    onSuccess: (res) => {
      const {
        data: { userId, token },
      } = res;

      const cookie = new Cookies();
      const validUntil = new Date();
      validUntil.setTime(new Date().getTime() + EXPIRE.ACCESS_TOKEN);
      cookie.set(KEY.ACCESS_TOKEN, token, {
        path: '/',
        expires: validUntil,
      });

      localStorage.setItem('userInfo', JSON.stringify({ userId }));
      toast.success('로그인 성공!', {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    },
    onError: (err) => {
      toast.error('ID 또는 PW가 잘못되었습니다!', {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const onValid = async (data) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <TopWrapper>
          <Title>Log in</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <ReactHookInput
              type="Email"
              register={register}
              errorMessage={errors.email?.message}
            />
            <ReactHookInput
              type="Password"
              register={register}
              errorMessage={errors.password?.message}
            />
            <Submit>Login</Submit>
          </Form>
        </TopWrapper>
        <BottomWrapper>
          <SocialLogin />
          <SocialText>If you already have account?</SocialText>
          <a href="/signin">Sign in</a>
        </BottomWrapper>
      </Container>
    </>
  );
};

export default Login;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 5px;
  gap: 5px;
  align-items: center;
  height: 100px;
  width: 100%;
`;

const SocialText = styled.div`
  margin-bottom: 5px;
  font-weight: 500;
  opacity: 0.7;
`;

const TopWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Container = styled(motion.div)`
  position: absolute;
  width: 400px;
  height: 700px;
  border-radius: 5px;
  left: calc(50% - 250px);
  top: calc(50% - 400px);
  color: ${({ theme }) => theme.color};
  box-shadow: 0px 0px 5px ${({ theme }) => theme.transparentColor};
  backdrop-filter: blur(3px);
  background: ${({ theme }) => theme.transparentBackground};
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: ${({ theme }) => theme.transitionOption};
  margin-top: 45px;
`;

const Title = styled.div`
  font-size: 30px;
  width: 100%;
  text-align: center;
  font-weight: 600;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const Submit = styled.button`
  margin: 30px 0 30px 0;
  padding: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border: 2px solid ${({ theme }) => theme.color};
  font-size: 20px;
  transition: ${({ theme }) => theme.transitionOption};
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.background};
  }
`;
