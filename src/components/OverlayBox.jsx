import styled from 'styled-components';
import DEVICES from 'styles/mediaQuery';
import { AnimatePresence, motion } from 'framer-motion';
import Axios from 'libs/Axios';
import { useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OverlayBox = ({ data }) => {
  const { title, imageUrl, description, hashtags, pinId, userId, createdAt } =
    data;
  const { userId: currUserId } = JSON.parse(localStorage.getItem('userInfo'));
  const api = useMemo(() => new Axios(true), []);

  const savePin = async () => {
    console.log('save');
  };

  const deletePin = async () => {
    await api.delete('api/pins', pinId);
    toast.success('핀이 삭제되었습니다!', {
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <ToastContainer />
      <Wrapper
        variants={overlayVariants}
        initial="from"
        animate="to"
        exit="exit"
      >
        <Img src={imageUrl} />
        <RightWrapper>
          <RightTopContainer>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <HashWrapper>
              <Hashs>#{hashtags}</Hashs>
            </HashWrapper>
          </RightTopContainer>
          <RightBottomContainer>
            <Button onClick={savePin}>저장하기</Button>
            {userId === currUserId ? (
              <Button onClick={deletePin}>삭제하기</Button>
            ) : (
              ''
            )}
          </RightBottomContainer>
        </RightWrapper>
      </Wrapper>
    </AnimatePresence>
  );
};

export default OverlayBox;

const overlayVariants = {
  from: { opacity: 0 },
  to: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.35 } },
};

/* FormLeft */
const Img = styled.img`
  object-fit: cover;
  background: white;
  border-radius: 10px;
  height: 100%;
`;

const Wrapper = styled(motion.div)`
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 60%;
  max-width: 1000px;
  min-width: 400px;
  min-height: 460px;
  border-radius: 20px 5px 5px 20px;
  gap: 10px;
  justify-content: space-between;
  background: ${({ theme }) => theme.transparentColor};
  transition: ${({ theme }) => theme.transitionOption};
  backdrop-filter: blur(1px);
  padding: 10px 10px 0px 10px;
  overflow-y: auto;
  overflow-x: hidden;

  @media ${DEVICES.MOBILES} {
  }

  @media ${DEVICES.MOBILEM} {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px;
  }
`;

/* FormRight */
const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.background};
  border-radius: 10px;
  width: 100%;
  height: calc(100% - 40px);
  padding: 20px;
`;

/* Right-Top */

const RightTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  padding: 15px;
  font-weight: 600;
  border: none;
  outline: none;
  background: transparent;
  border-bottom: solid 2px lightgray;
  font-size: 30px;
`;

const Description = styled.div`
  padding: 10px;
  font-size: 15px;
  border: none;
  outline: none;
  border: solid 2px lightgray;
  border-radius: 5px;
  min-height: 200px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${({ theme }) => theme.transparentColor};
  color: ${({ theme }) => theme.transparentBackground};
`;

/* Right-Bottom */

const RightBottomContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  font-size: 20px;
  color: white;
  border: none;
  background: ${({ theme }) => theme.pointColor};
  transition: ${({ theme }) => theme.transitionOption};
  :hover {
    background: #111;
    cursor: pointer;
  }
`;

const HashWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Hashs = styled.div`
  padding: 10px;
  font-weight: 500;
  border: none;
  outline: none;
  background: transparent;
  background: rgba(0, 0, 0, 0.3);
  color: whitesmoke;
  font-weight: 600;
  margin-bottom: 15px;
  border-radius: 5px;
`;
