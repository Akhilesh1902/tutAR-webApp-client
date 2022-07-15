import React, { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const OBJModel = ({ Url, modelProps }) => {
  console.log(Url);

  //   const [result] = useFBXModels(URL);
  const result = useLoader(OBJLoader, Url);
  const { rotation: rot } = modelProps;

  useEffect(() => {
    console.log(result);
  }, [result]);

  const { scale } = modelProps;

  return (
    <>
      {Url && result && (
        <primitive
          object={result}
          scale={[scale, scale, scale]}
          rotation={[rot.x, rot.y, rot.z]}
        />
      )}
    </>
  );
};

export default OBJModel;
