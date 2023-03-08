import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import Axios from 'libs/Axios';
import { useEffect, useState, useMemo } from 'react';
import { setSearchValue } from 'redux/modules/searchSlicer';
import { useDispatch, useSelector } from 'react-redux';

const EndData = () => {
  const { ref, inView } = useInView({
    threshold: 1,
  });
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();
  const pins = useSelector((state) => state.searchSlicer);
  const api = useMemo(() => new Axios(), []);

  const getData = async () => {
    const { data } = await api.getByQuery('api/pins', { index });
    dispatch(setSearchValue([...pins, ...data]));
  };
  useEffect(() => {
    if (inView) {
      getData();
      setIndex((prev) => (prev += 1));
    }
  }, [inView]);
  console.log(inView);

  return <Wrapper ref={ref}>{inView.toString()}</Wrapper>;
};

export default EndData;

const Wrapper = styled.div``;
