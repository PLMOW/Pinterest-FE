import styled from 'styled-components';
import DEVICES from 'styles/mediaQuery';
import { motion } from 'framer-motion';

const OverlayBox = ({ data }) => {
  console.log(data);
  return (
    <Wrapper>
      <Img />
      <RightWrapper>
        <RightTopContainer>
          <InputTitle placeholder="제목 추가"></InputTitle>
          <Description
            placeholder="핀에 대해 설명해보세요!"
            spellCheck="false"
          ></Description>
          <HashWrapper>
            <HashInput placeholder="#해시태그" />
            <HashSubmit>추가</HashSubmit>
          </HashWrapper>
        </RightTopContainer>
        <RightBottomContainer>
          <Button>핀 생성</Button>
        </RightBottomContainer>
      </RightWrapper>
    </Wrapper>
  );
};

export default OverlayBox;

/* FormLeft */
const Img = styled.img`
  object-fit: cover;
  background: white;
  width: 100%;
`;

///

const Wrapper = styled(motion.div)`
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  background: ${({ theme }) => theme.backgroundColor};
  width: 80%;
  height: 60%;
  max-width: 1000px;
  min-width: 400px;
  border-radius: 20px;
  gap: 20px;
  justify-content: space-between;

  @media ${DEVICES.MOBILES} {
    background: teal;
    padding: 10px;
  }

  @media ${DEVICES.MOBILEM} {
    display: flex;
    flex-direction: row;
    padding: 20px;
  }
`;

const Des = styled.div`
  background: bisque;
  width: 100%;
`;

////

/* FormRight */
const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

/* Right-Top */

const RightTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InputTitle = styled.input`
  padding: 10px;
  font-weight: 600;
  border: none;
  outline: none;
  background: transparent;
  border-bottom: solid 2px lightgray;
  font-size: 30px;
  width: 300px;
`;

const Description = styled.textarea`
  padding: 10px;
  font-size: 15px;
  border: none;
  outline: none;
  background: transparent;
  border: solid 2px lightgray;
  border-radius: 5px;
  min-width: 300px;
  max-width: 300px;
  min-height: 200px;
  max-height: 200px;
`;

/* Right-Bottom */

const RightBottomContainer = styled.div`
  display: flex;
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

const HashInput = styled.input.attrs({ type: 'text' })`
  padding: 10px;
  font-weight: 500;
  border: none;
  outline: none;
  background: transparent;
  border-bottom: solid 2px lightgray;
  width: 200px;
`;

const HashSubmit = styled.div`
  padding: 10px 20px;
  color: white;
  background: ${({ theme }) => theme.color};
  border: none;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`;
