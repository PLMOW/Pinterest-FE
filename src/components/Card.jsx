import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { overlayToggle } from 'redux/modules/overlayToggle';
import { setBoxData } from 'redux/modules/boxDataSlicer';
import { savedToggle } from 'redux/modules/savedToggleSlicer';

const Card = ({ pinData }) => {
  const { title, imageUrl } = pinData;
  const dispatch = useDispatch();

  const cardOpenHandler = (v) => {
    dispatch(overlayToggle());
    dispatch(setBoxData(v));
    dispatch(SaveToggle());
  };

  const SaveToggle = () => {
    dispatch(savedToggle());
  };

  return (
    <Wrapper
      onClick={() => {
        cardOpenHandler(pinData);
      }}
    >
      <Image src={imageUrl} />
      <InfoWrapper>
        <Title>{title}</Title>
      </InfoWrapper>
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  display: flex;
  background: ${({ theme }) => theme.transparentBackground};
  padding: 10px;
  border-radius: 5px;
  gap: 10px;
  transition: ${({ theme }) => theme.transitionOption};
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color};
  }
`;

const Image = styled.img`
  width: 150px;
  border-radius: 5px;
`;

const InfoWrapper = styled.div`
  display: flex;
  width: calc(100% - 170px);
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 20px;
  background: ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.background};
  padding: 5px;
  border-radius: 5px;
  width: 100%;
`;
