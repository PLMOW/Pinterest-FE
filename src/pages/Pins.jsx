import styled from 'styled-components';
import DEVICES from 'libs/style/mediaQuery';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Pins = () => {
  const [datas, setDatas] = useState();

  const URL =
    'https://api.pinterest.com/v3/pidgets/boards/vicemag/magazine/pins/';
  const TRY = 'https://www.pinterest.co.kr/pin/4011087167876434/';
  const getImages = async () => {
    const {
      data: {
        data: { pins },
      },
    } = await axios({
      method: 'GET',
      url: TRY,
      dataType: 'jsonp',
    });

    setDatas((prev) => pins);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <Container>
      <Wrapper>
        {datas
          ? [...datas].map((v, i) => {
              const { id, images } = v;
              const { url, width, height } = images['237x'];
              console.log(images['237x']);

              return (
                <Card height={height} key={id}>
                  <Image src={url} />
                </Card>
              );
            })
          : ''}
      </Wrapper>
    </Container>
  );
};

export default Pins;
const Container = styled.div``;

const Image = styled.img`
  display: inline-block;
  width: 100%;
  height: ${({ height }) => height}px;
  break-inside: avoid;
  margin-bottom: 10px;
  border-radius: 5px;
  min-width: 200px;
`;

const Card = styled.div``;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.transparentColor};
  padding: 10px;

  @media ${DEVICES.MOBILES} {
    column-count: 2;
    background: teal;
  }

  @media ${DEVICES.MOBILEM} {
    column-count: 3;
    background: tomato;
  }

  @media ${DEVICES.MOBILEL} {
    column-count: 3;
    background: white;
  }

  @media ${DEVICES.TABLET} {
    column-count: 4;
    background: bisque;
  }

  @media ${DEVICES.LAPTOP} {
    column-count: 5;
    background: teal;
  }

  @media ${DEVICES.LAPTOPL} {
    column-count: 6;
    background: teal;
  }

  @media ${DEVICES.DESKTOP} {
    column-count: 7;
    background: tomato;
  }
`;
