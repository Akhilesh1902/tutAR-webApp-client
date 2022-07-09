import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ Url, modelProps }) => {
  const result = useLoader(GLTFLoader, Url);

  useFrame(({ clock }) => {
    const et = clock.getElapsedTime();
    if (!modelProps.autoRotate) return;
    let rot = result.scene.rotation;
    rot.x = et / 4;
    rot.y = et;
    rot.z = et / 2;
  });

  return (
    <primitive object={result.scene} rotation={[0, modelProps.rotation, 0]} />
  );
};

export default Model;
