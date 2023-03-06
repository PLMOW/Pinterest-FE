import styled from 'styled-components';
import DEVICES from 'styles/mediaQuery';
import { useEffect, useState, useLayoutEffect } from 'react';
import axios from 'axios';
import ShuffleIcon from 'assets/icons/Shuffle';
import useSound from 'use-sound';
import downSFX from 'assets/audio/down.mp3';
import upLightSFX from 'assets/audio/upLight.mp3';
import cardMount from 'libs/animations/cardMount';
import GSAP from 'constants/gsap';
import Axios from 'libs/Axios';

const Home = () => {
  const [datas, setDatas] = useState();
  const [shuffleDown] = useSound(downSFX);
  const [shuffleUp] = useSound(upLightSFX);
  const api = new Axios(true);

  const getImages = async () => {
    const {
      data: { pins },
    } = await api.getByQuery('api/pins', {
      q: '',
    });

    const shuffledPins = pins.sort(() => Math.random() - 0.5);

    setDatas((prev) => shuffledPins);
  };

  const shuffle = () => {
    shuffleUp();
    if (!datas) return;
    setDatas((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    getImages();
  }, []);

  useLayoutEffect(() => {
    if (!datas) return;
    cardMount();
  }, [datas]);

  return (
    <Wrapper>
      <ShuffleWrapper onMouseDown={shuffleDown} onClick={shuffle}>
        <ShuffleIcon />
      </ShuffleWrapper>
      {datas
        ? [...datas].map((v, i) => {
            const { pinId, imageUrl } = v;
            return (
              <Card className={GSAP.CARD.CARD_CLASSNAME} key={pinId}>
                <Image src={imageUrl} />
              </Card>
            );
          })
        : ''}
    </Wrapper>
  );
};

export default Home;

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

const Wrapper = styled.div`
  margin-top: 88px;
  padding: 10px;

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
