import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

const useSessionStorage = ({ key, initialValue }) => {
  const [storedValue, setStoredValue] = useState(() => {
    const jsonValue = window.sessionStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === 'function') return initialValue();
    else return initialValue;
  });

  useEffect(() => {
    if (storedValue === undefined) return window.sessionStorage.removeItem(key);
    window.sessionStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  const remove = useCallback(() => {
    setStoredValue(undefined);
  }, []);
  return <div>useSessionStorage</div>;
};

export default useSessionStorage;
