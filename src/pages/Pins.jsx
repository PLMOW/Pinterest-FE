import styled from 'styled-components';
import DEVICES from 'libs/style/mediaQuery';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Pins = () => {
  const [datas, setDatas] = useState();
  const URL = `${process.env.REACT_APP_API_PINTEREST_ROUTE}/stanber42/milac/pins/`;

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

    setDatas((prev) => pins);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <Wrapper>
      {datas
        ? datas.map((v, i) => {
            const { id, images } = v;
            const { url, width, height } = images['237x'];

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
  transition: ${({ theme }) => theme.transitionOption};
  :hover {
    transform: scale(1.02);
    opacity: 1;
    cursor: pointer;
  }
`;

const Card = styled.div``;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.transparentColor};
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
