import styled from 'styled-components';
import DEVICES from 'libs/style/mediaQuery';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ShuffleIcon from 'assets/icons/Shuffle';
import useSound from 'use-sound';
import downSFX from 'assets/audio/down.mp3';
import upLightSFX from 'assets/audio/upLight.mp3';

const Pins = () => {
  const [datas, setDatas] = useState();
  const URL = `${process.env.REACT_APP_API_PINTEREST_API}`;
  const [shuffleDown] = useSound(downSFX);
  const [shuffleUp] = useSound(upLightSFX);

  const getImages = async () => {
    const {
      data: {
        data: { pins },
      },
    } = await axios({
      method: 'GET',
      url: URL,
      dataType: 'jsonp',
    });

    const shuffledPins = pins.sort(() => Math.random() - 0.5);

    setDatas((prev) => shuffledPins);
  };

  const shuffle = () => {
    shuffleUp();
    setDatas((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <Wrapper>
      <Shuffle onMouseDown={shuffleDown} onClick={shuffle}>
        <ShuffleIcon />
      </Shuffle>
      {datas
        ? [...datas]
            .sort(() => Math.random - 0.5)
            .map((v, i) => {
              const { id, images } = v;
              const { url, height } = images['237x'];
              return (
                <Card height={height} key={id}>
                  <Image src={url} />
                </Card>
              );
            })
        : ''}
    </Wrapper>
  );
};

export default Pins;

const Image = styled.img`
  opacity: 0.85;
  display: inline-block;
  width: 100%;
  height: ${({ height }) => height}px;
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

const Shuffle = styled.div`
  width: calc(100% - 20px);
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
