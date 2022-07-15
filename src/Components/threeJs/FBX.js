import React, { useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

const FBX = ({ Url, modelProps, setModelData }) => {
  console.log(Url);

  //   const [result] = useFBXModels(URL);
  const result = useLoader(FBXLoader, Url);
  let mixer = null;

  const { rotation: rot } = modelProps;

  useEffect(() => {
    console.log(result);
    if (result.animations)
      setModelData((data) => ({ ...data, animations: result.animations }));
  }, [result, setModelData]);

  if (result.animations.length) {
    mixer = new THREE.AnimationMixer(result.scene);
    const action = mixer.clipAction(result.animations[modelProps.curAnimIndex]);
    action.play();
  }
  useFrame((delta) => {
    mixer?.update(delta);
  });

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

export default FBX;
