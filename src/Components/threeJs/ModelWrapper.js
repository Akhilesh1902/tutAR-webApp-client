import { Suspense, useState, useEffect } from 'react';
import FBX from './FBX';
import Model from './Model';
import OBJModel from './OBJModel';

const ModelWrapper = ({ glbFile, modelProps, modelData, setModelData }) => {
  const [objURL, setObjURL] = useState('');

  useEffect(() => {
    const IURL = URL.createObjectURL(glbFile);
    setObjURL(IURL.split('b:')[1]);
    setObjURL(IURL);
  }, [glbFile]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight intensity={0.7} position={[1, 1, 1]} />
      <Suspense fallback={null}>
        {modelData.name.split('.')[1] === 'fbx'
          ? objURL && (
              <FBX
                modelProps={modelProps}
                Url={objURL}
                setModelData={setModelData}
              />
            )
          : modelData.name.split('.')[1] === 'obj'
          ? objURL && (
              <OBJModel
                modelProps={modelProps}
                Url={objURL}
                setModelData={setModelData}
              />
            )
          : objURL && (
              <Model
                modelProps={modelProps}
                Url={objURL}
                setModelData={setModelData}
              />
            )}
      </Suspense>
    </>
  );
};

export default ModelWrapper;
