import styled from 'styled-components';
import DEVICES from 'styles/mediaQuery';
import { useLayoutEffect } from 'react';
import ShuffleIcon from 'assets/icons/Shuffle';
import useSound from 'use-sound';
import downSFX from 'assets/audio/down.mp3';
import upLightSFX from 'assets/audio/upLight.mp3';
import cardMount from 'libs/animations/cardMount';
import GSAP from 'constants/gsap';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from 'redux/modules/searchSlicer';
import { overlayToggle } from 'redux/modules/overlayToggle';
import OverlayBox from 'components/OverlayBox';

const Home = () => {
  const [overlayBoxData, setOverlayBoxData] = useState();
  const [shuffleDown] = useSound(downSFX);
  const [shuffleUp] = useSound(upLightSFX);
  const pins = useSelector((state) => state.searchSlicer);
  const overlayToggleState = useSelector((state) => state.overlaySlicer);
  const dispatch = useDispatch();

  const shuffle = () => {
    shuffleUp();
    if (!pins) return;
    dispatch(setSearchValue([...pins].sort(() => Math.random() - 0.5)));
  };

  useLayoutEffect(() => {
    if (!pins[0]) return;
    cardMount();
  }, [pins]);

  const cardOpenHandler = (v) => {
    dispatch(overlayToggle());
    setOverlayBoxData((prev) => v);
  };

  const cardCloseHandler = (v) => {
    dispatch(overlayToggle());
  };

  console.log(1111, overlayBoxData, overlayToggleState);

  return (
    <Container>
      {overlayToggleState && (
        <Overlay onClick={cardCloseHandler}>
          <OverlayBox />
        </Overlay>
      )}

      <ShuffleWrapper onMouseDown={shuffleDown} onClick={shuffle}>
        <ShuffleIcon />
      </ShuffleWrapper>
      <Wrapper>
        {pins
          ? [...pins].map((v, i) => {
              const { pinId, imageUrl } = v;
              return (
                <Card
                  onClick={() => {
                    cardOpenHandler(v);
                  }}
                  data={v}
                  className={GSAP.CARD.CARD_CLASSNAME}
                  key={pinId}
                >
                  <Image src={imageUrl} />
                </Card>
              );
            })
          : ''}
      </Wrapper>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  position: relative;
  display: flex;
  background: tomato;
  height: 100vh;
  overflow: auto;
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
`;

const Image = styled.img`
  opacity: 0.85;
  display: inline-block;
  width: 100%;
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  break-inside: avoid;
  margin-bottom: 10px;
  min-width: 200px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.35);
  transition: ${({ theme }) => theme.transitionOption};

  :hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.55);
    transform: scale(1.02);
    opacity: 1;
    cursor: pointer;
  }
`;

const Card = styled.div``;

const Wrapper = styled.div`
  position: relative;
  margin-top: 88px;
  padding: 10px;
  overflow: auto;

  @media ${DEVICES.MOBILES} {
    column-count: 2;
  }

  @media ${DEVICES.MOBILEM} {
    column-count: 3;
  }

  @media ${DEVICES.MOBILEL} {
    column-count: 3;
  }

  @media ${DEVICES.TABLET} {
    column-count: 4;
  }

  @media ${DEVICES.LAPTOP} {
    column-count: 5;
  }

  @media ${DEVICES.LAPTOPL} {
    column-count: 6;
  }

  @media ${DEVICES.DESKTOP} {
    column-count: 7;
  }
`;

const ShuffleWrapper = styled.div`
  position: fixed;
  left: 10px;
  bottom: 10px;
  z-index: 1;
  background: white;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  transition: ${({ theme }) => theme.transitionOption};

  background: ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.background};
  :hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.55);
    transform: scale(1.02);
    opacity: 1;
    cursor: pointer;
  }
`;
