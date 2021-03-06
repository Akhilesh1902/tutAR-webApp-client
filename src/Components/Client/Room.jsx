import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PreviewCanvas from '../threeJs/PreviewCanvas';
// import useFetch from '../customHooks/useFetch';
import IVP from '../Utils/InlineVideoPlayer';
import { BiZoomIn, BiZoomOut, BiCamera, BiCameraOff } from 'react-icons/bi';
import { TbFlipVertical } from 'react-icons/tb';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdFlipCameraIos } from 'react-icons/md';
import { VscRecord } from 'react-icons/vsc';

const Room = ({ SERVER_URL, socket }) => {
  const { id } = useParams();
  const [modelData, setModelData] = useState();
  const [blob, setBlob] = useState();
  const [modelProps, setModelProps] = useState({
    rotation: { x: 0, y: 0, z: 0 },
    autoRotate: false,
    scale: 1,
    orbitControls: false,
    curAnimIndex: 0,
  });
  const [UIProps, setUIProps] = useState({
    showUI: true,
    camera: true,
    backCamera: true,
    cameraFlip: false,
    hideThumbnails: true,
  });

  // const [data, setData, singleData, setSingleDat] = useFetch(SERVER_URL, id);

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (id !== '') {
        const filterdData = await fetch(`${SERVER_URL}${id}`);
        const json = await filterdData.json();
        setData(json);
        setModelData(json[0]);
        socket.emit('_get_model', { addr: json[0].fileAddr });
        return;
      }
      const data = await fetch(`${SERVER_URL}modeldata`);
      const json = await data.json();
      setData(json);
      // setSingleData(json[0]);
    };

    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const buttonStyle = `bg-mid rounded w-full font-bold text-text text-center p-2 ${
    UIProps.showUI ? '' : 'hidden'
  }`;

  useEffect(() => {
    socket.off('_get_model').on('_get_model', ({ model }) => {
      const arrBuff = new Uint8Array(model);
      const blob = new Blob([arrBuff]);
      setBlob(blob);
      setModelData((md) => ({ ...md, file: blob }));
    });
  });

  const handleThumbClick = (e) => {
    const name = e.target.alt;
    if (modelData.name === name) return;
    const m = data.find((item) => item.name === name);
    socket.emit('_get_model', { addr: m.fileAddr });

    setModelData(m);
  };

  return (
    <div className='grid items-center  select-none  h-screen w-screen'>
      <div className='relative h-screen overflow-hidden w-screen grid items-center'>
        <IVP flip={UIProps.cameraFlip} active={UIProps.camera}></IVP>
        <div className='absolute z-50 h-screen w-full top-0'>
          {blob && (
            <PreviewCanvas
              modelProps={modelProps}
              glbFile={blob}
              orbitControls={modelProps.orbitControls}
              modelData={modelData}
              setModelData={setModelData}
            />
          )}
        </div>
        <div className='absolute p-5 flex w-screen h-screen  justify-between gap-2 top-0'>
          <div className='flex z-50 gap-3 h-full'>
            <div className={`flex h-full justify-btween flex-col gap-3 `}>
              <div className='flex flex-col gap-2'></div>
              {UIProps.hideThumbnails ? null : (
                <div className='flex flex-col gap-3'>
                  {data?.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className={` w-fit ${UIProps.showUI ? '' : 'hidden'}`}>
                        <img
                          className='w-20'
                          src={`data:image/jpeg;base64,` + item.thumb}
                          alt={item.name}
                          onClick={handleThumbClick}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className='text-3xl flex flex-col items-center gap-3'>
              <Link
                to={'/class'}
                className={`${buttonStyle} text-xs !w-full`}>{`< Back`}</Link>
              <button
                className={`${buttonStyle} text-xs`}
                onClick={() => {
                  setUIProps((up) => ({
                    ...up,
                    hideThumbnails: !up.hideThumbnails,
                  }));
                }}>
                {UIProps.hideThumbnails ? 'Show Thumb' : 'Hide Thumb'}
              </button>
              <button
                className={buttonStyle}
                onClick={() => {
                  setUIProps((up) => ({ ...up, camera: !up.camera }));
                }}>
                {UIProps.camera ? <BiCameraOff /> : <BiCamera />}
              </button>
              <button className={buttonStyle}>
                <MdFlipCameraIos
                  onClick={() => {
                    setUIProps((up) => ({ ...up, backCamera: !up.backCamera }));
                  }}
                />
              </button>
              <button className={buttonStyle}>
                <TbFlipVertical
                  onClick={() =>
                    setUIProps((up) => ({ ...up, cameraFlip: !up.cameraFlip }))
                  }></TbFlipVertical>
              </button>
              <button
                className={`${buttonStyle} bg-text w-fit rounded-full text-mid`}>
                <VscRecord />
              </button>
              {modelData?.animations?.length ? (
                <div className='flex flex-col  text-accent text-center gap-2'>
                  <p className={`text-text ${UIProps.showUI ? '' : 'hidden'} `}>
                    Anim
                  </p>
                  <div className='flex gap-2'>
                    <button
                      className={'text-xs w-fit ' + buttonStyle}
                      type='button'
                      onClick={() => {
                        // console.log(modelData);
                        console.log(modelProps);
                        setModelProps((mp) => ({
                          ...mp,
                          curAnimIndex:
                            mp.curAnimIndex === 0
                              ? modelData.animations.length - 1
                              : mp.curAnimIndex - 1,
                        }));
                      }}>
                      -
                    </button>
                    <p
                      className={`text-text ${UIProps.showUI ? '' : 'hidden'}`}>
                      {modelProps.curAnimIndex}
                    </p>
                    <button
                      className={'text-xs w-fit ' + buttonStyle}
                      type='button'
                      onClick={() => {
                        setModelProps((mp) => ({
                          ...mp,
                          curAnimIndex:
                            mp.curAnimIndex === modelData.animations.length - 1
                              ? 0
                              : mp.curAnimIndex + 1,
                        }));
                      }}>
                      +
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className='text-3xl z-50 justify-self-end items-center flex flex-col gap-4 '>
            <button
              className={` !block ${buttonStyle}`}
              onClick={() => {
                setUIProps((up) => ({ ...up, showUI: !up.showUI }));
              }}>
              {UIProps.showUI ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            {UIProps.showUI && (
              <div className='flex flex-col gap-2'>
                <div className='flex text-text text-xs  gap-1'>
                  <button
                    className={buttonStyle + 'p-0'}
                    onClick={() =>
                      setModelProps((p) => ({ ...p, scale: (p.scale += 0.1) }))
                    }>
                    <BiZoomIn />
                  </button>
                  <p>Zoom</p>
                  <button
                    className={buttonStyle + 'p-0'}
                    onClick={() =>
                      setModelProps((p) => ({ ...p, scale: (p.scale -= 0.1) }))
                    }>
                    <BiZoomOut />
                  </button>
                </div>
                <div className='flex text-text gap-1'>
                  <button
                    className={buttonStyle + 'text-xs p-0'}
                    onClick={() => {
                      setModelProps((mp) => ({
                        ...mp,
                        rotation: { ...mp.rotation, x: mp.rotation.x - 0.1 },
                      }));
                    }}>
                    -
                  </button>
                  <p className='text-xs '>RotateX</p>
                  <button
                    className={buttonStyle + 'text-xs p-0'}
                    onClick={() => {
                      setModelProps((mp) => ({
                        ...mp,
                        rotation: { ...mp.rotation, x: mp.rotation.x + 0.1 },
                      }));
                    }}>
                    +
                  </button>
                </div>
                <div className='flex text-text gap-1'>
                  <button
                    className={buttonStyle + 'text-xs p-0'}
                    onClick={() => {
                      setModelProps((mp) => ({
                        ...mp,
                        rotation: { ...mp.rotation, y: mp.rotation.y - 0.1 },
                      }));
                    }}>
                    -
                  </button>
                  <p className='text-xs '>RotateY</p>
                  <button
                    className={buttonStyle + 'text-xs p-0'}
                    onClick={() => {
                      setModelProps((mp) => ({
                        ...mp,
                        rotation: { ...mp.rotation, y: mp.rotation.y + 0.1 },
                      }));
                    }}>
                    +
                  </button>
                </div>
                <div className='flex text-text gap-1'>
                  <button
                    className={buttonStyle + 'text-xs p-0'}
                    onClick={() => {
                      setModelProps((mp) => ({
                        ...mp,
                        rotation: { ...mp.rotation, z: mp.rotation.z - 0.1 },
                      }));
                    }}>
                    -
                  </button>
                  <p className='text-xs '>RotateZ</p>
                  <button
                    className={buttonStyle + 'text-xs p-0'}
                    onClick={() => {
                      setModelProps((mp) => ({
                        ...mp,
                        rotation: { ...mp.rotation, z: mp.rotation.z + 0.1 },
                      }));
                    }}>
                    +
                  </button>
                </div>
                <button
                  className={buttonStyle + 'text-xs '}
                  onClick={() => {
                    setModelProps((mp) => ({
                      ...mp,
                      rotation: { x: 0, y: 0, z: 0 },
                    }));
                  }}>
                  Reset Rotation
                </button>
                <button
                  className={buttonStyle + 'text-xs '}
                  onClick={() => {
                    setModelProps((mp) => ({
                      ...mp,
                      orbitControls: !mp.orbitControls,
                    }));
                  }}>
                  {modelProps.orbitControls ? 'Off Orb Ctrls' : 'On Orb Ctrls'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
