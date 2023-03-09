import styled from 'styled-components';
import DEVICES from 'styles/mediaQuery';
import { AnimatePresence, motion } from 'framer-motion';
import Axios from 'libs/Axios';
import { useEffect, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const SavedBoard = () => {
  const api = useMemo(() => new Axios(true), []);

  const getSavedPin = async () => {
    const { data } = await api.get('api/save');
    console.log(data);
  };

  const deleteSavedPin = async (pinId) => {
    await api.put('api/save/pins', pinId);
    toast.success('핀이 저장되었습니다!', {
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    getSavedPin();
  }, []);

  return (
    <>
      <ToastContainer />
      <AnimatePresence>
        <Wrapper
          variants={overlayVariants}
          initial="from"
          animate="to"
          exit="exit"
        >
          CARDS
        </Wrapper>
      </AnimatePresence>
    </>
  );
};

export default SavedBoard;

const overlayVariants = {
  from: { opacity: 0, right: -200 },
  to: { opacity: 1, right: 10, transition: { duration: 0.15 } },
  exit: { opacity: 0, right: 100, transition: { duration: 0.35 } },
};

const Wrapper = styled(motion.div)`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: calc(100% - 200px);

  right: 20px;
  top: 88px;
  min-height: 200px;
  overflow-y: auto;
  border-radius: 20px 0 0 20px;
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
