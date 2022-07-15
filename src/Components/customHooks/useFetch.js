import { useState, useEffect } from 'react';

const useFetch = (SERVER_URL, Class = '') => {
  const [data, setData] = useState();
  const [singleData, setSingleData] = useState();

  const fetchData = async () => {
    if (Class !== '') {
      const filterdData = await fetch(`${SERVER_URL}${Class}`);
      const json = await filterdData.json();
      setData(json);
      return;
    }
    const data = await fetch(`${SERVER_URL}modeldata`);
    const json = await data.json();
    setData(json);
    setSingleData(json[0]);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return [data, fetchData, setData, setSingleData, singleData];
};

export default useFetch;
