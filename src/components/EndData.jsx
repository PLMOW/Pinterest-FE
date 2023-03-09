import styled from 'styled-components';
import useInfiniteScroll from 'hooks/useInfiniteScroll';

const EndData = () => {
  const [ref, isLoading] = useInfiniteScroll();

  return <>{isLoading ? <></> : <Wrapper ref={ref}></Wrapper>}</>;
};

export default EndData;

const Wrapper = styled.div``;
