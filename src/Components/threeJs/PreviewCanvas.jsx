import { Canvas } from '@react-three/fiber';
import ModelWrapper from './ModelWrapper';
import { OrbitControls } from '@react-three/drei';

const PreviewCanvas = ({
  modelProps,
  orbitControls,
  modelData,
  setModelData,
}) => {
  // console.log(modelData.file);
  return (
    <Canvas>
      {orbitControls && <OrbitControls />}
      {modelData.file && (
        <ModelWrapper
          modelProps={modelProps}
          setModelData={setModelData}
          modelData={modelData}
          glbFile={modelData.file}
        />
      )}
    </Canvas>
  );
};

export default PreviewCanvas;
