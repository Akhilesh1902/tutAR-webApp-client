import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ Url, modelProps }) => {
  // console.log(Url);
  const result = useLoader(GLTFLoader, Url);
  const { rotation: rot } = modelProps;

  const { scale } = modelProps;

  useFrame(({ clock }) => {
    const et = clock.getElapsedTime();
    if (!modelProps.autoRotate) return;
    let rot = result.scene.rotation;
    rot.x = et / 4;
    rot.y = et;
    rot.z = et / 2;
  });

  return (
    <>
      {Url && result.scene && (
        <primitive
          object={result.scene}
          scale={[scale, scale, scale]}
          rotation={[rot.x, rot.y, rot.z]}
        />
      )}
    </>
  );
};

export default Model;
