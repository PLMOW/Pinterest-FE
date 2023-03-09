import { useInView } from 'react-intersection-observer';
import Axios from 'libs/Axios';
import { useEffect, useState, useMemo } from 'react';
import { setSearchValue } from 'redux/modules/searchSlicer';
import { setObserve } from 'redux/modules/observeSlicer';
import { useDispatch, useSelector } from 'react-redux';

const useInfiniteScroll = () => {
  const { ref, inView } = useInView({
    threshold: 1,
  });
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const pins = useSelector((state) => state.searchSlicer);
  const api = useMemo(() => new Axios(), []);

  const getData = async () => {
    setIsLoading((prev) => true);
    const {
      data: { pins: data },
    } = await api.getByQuery('api/pins', { index });

    if (data.length !== 30) dispatch(setObserve(false));
    dispatch(setSearchValue([...pins, ...data]));
    setIsLoading((prev) => false);
  };
  useEffect(() => {
    if (inView) {
      getData();
      setIndex((prev) => (prev += 1));
    }
  }, [inView]);

  return [ref, isLoading];
};

export default useInfiniteScroll;
