import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const EndData = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  console.log(inView);

  return <Wrapper ref={ref}>{inView.toString()}</Wrapper>;
};

export default EndData;

const Wrapper = styled.div``;
