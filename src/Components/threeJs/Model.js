import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect } from 'react';
import * as THREE from 'three';

const Model = ({ Url, modelProps, setModelData }) => {
  const result = useLoader(GLTFLoader, Url);
  const { rotation: rot } = modelProps;

  let mixer = null;
  const { scale } = modelProps;

  useEffect(() => {
    if (result.animations)
      setModelData((data) => ({ ...data, animations: result.animations }));
  }, [result, setModelData]);

  if (result.animations.length) {
    mixer = new THREE.AnimationMixer(result.scene);
    const action = mixer.clipAction(result.animations[modelProps.curAnimIndex]);
    action.play();
  }

  useFrame(({ clock }, delta) => {
    const et = clock.getElapsedTime();
    mixer?.update(delta);

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
