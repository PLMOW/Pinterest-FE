import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ReactHookInput from 'components/form/ReactHookInput';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Axios from 'libs/Axios';
import { ToastContainer, toast } from 'react-toastify';

const Signin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const api = new Axios();

  const getSignIn = async (data) => {
    return await api.post('api/signup', { ...data });
  };

  const { mutate, data, isLoading } = useMutation(getSignIn, {
    onSuccess: () => {
      toast.success('회원가입 성공!', {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    },
    onError: (err) => {
      toast.error('이미 존재하는 아이디입니다!', {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const onValid = async (data) => {
    const { email, nickname, password } = data;
    mutate({ email, nickname, password });
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <TopWrapper>
          <Title>Sign in</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <ReactHookInput
              type="Email"
              register={register}
              errorMessage={errors.email?.message}
            />
            <ReactHookInput
              type="Nickname"
              register={register}
              errorMessage={errors.nickname?.message}
            />
            <ReactHookInput
              type="Password"
              register={register}
              errorMessage={errors.password?.message}
            />
            <Submit>create</Submit>
          </Form>
        </TopWrapper>
        <BottomWrapper>
          <SocialText>Or Sign Up Using</SocialText>
          <a href="/login">login</a>
        </BottomWrapper>
      </Container>
    </>
  );
};

export default Signin;

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
  margin-bottom: 10px;
  font-weight: 600;
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
