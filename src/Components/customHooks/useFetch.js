import React, { useState, useEffect } from 'react';

const useFetch = (SERVER_URL, Class = '') => {
  const [data, setData] = useState();

  const fetchData = async () => {
    if (Class != '') {
      const filterdData = await fetch(`${SERVER_URL}${Class}`);
      const json = await filterdData.json();
      setData(json);
      return;
    }
    const data = await fetch(`${SERVER_URL}modeldata`);
    const json = await data.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [data, fetchData];
};

export default useFetch;
