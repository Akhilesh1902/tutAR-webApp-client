import { Canvas } from '@react-three/fiber';
import ModelWrapper from '../threeJs/ModelWrapper';
import { OrbitControls } from '@react-three/drei';

const PreviewCanvas = ({ glbFile, modelProps }) => {
  return (
    <Canvas>
      <OrbitControls />
      {glbFile && <ModelWrapper modelProps={modelProps} glbFile={glbFile} />}
    </Canvas>
  );
};

export default PreviewCanvas;
