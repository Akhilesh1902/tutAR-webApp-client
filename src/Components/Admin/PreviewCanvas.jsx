import React from 'react';
import { Canvas } from '@react-three/fiber';
import ModelWrapper from '../threeJs/ModelWrapper';
import { OrbitControls } from '@react-three/drei';

const PreviewCanvas = ({ glbFile }) => {
  console.log(glbFile);

  return (
    <Canvas>
      <OrbitControls />
      {glbFile && <ModelWrapper glbFile={glbFile} />}
    </Canvas>
  );
};

export default PreviewCanvas;
