import React, { Suspense, useState, useEffect } from 'react';
import Model from './Model';

const ModelWrapper = ({ glbFile }) => {
  const [objURL, setObjURL] = useState('');

  useEffect(() => {
    const IURL = URL.createObjectURL(glbFile);
    console.log(IURL.split('b:')[1]);
    setObjURL(IURL.split('b:')[1]);
    setObjURL(IURL);
  }, [glbFile]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight intensity={0.7} position={[1, 1, 1]} />
      <Suspense fallback={null}>
        <Model Url={objURL} />
      </Suspense>
    </>
  );
};

export default ModelWrapper;
