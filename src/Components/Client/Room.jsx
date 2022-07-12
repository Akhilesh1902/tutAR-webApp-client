import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PreviewCanvas from '../Admin/PreviewCanvas';
import useFetch from '../customHooks/useFetch';
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
  });
  const [UIProps, setUIProps] = useState({
    showUI: true,
    camera: true,
    backCamera: true,
    cameraFlip: false,
    hideThumbnails: true,
  });

  const [data] = useFetch(SERVER_URL, id);

  const buttonStyle = `bg-mid rounded w-full font-bold text-text text-center p-2 ${
    UIProps.showUI ? '' : 'hidden'
  }`;

  useEffect(() => {
    // console.log(data);
    if (data) setModelData(data[0]);
  }, [data]);

  useEffect(() => {
    if (!modelData) return;
    // console.log(modelData);
    socket.emit('_get_model', { addr: modelData.fileAddr });
    //eslint-disable-next-line
  }, [modelData]);

  // const BLob = useMemo(() => , [second])

  useEffect(() => {
    socket.off('_get_model').on('_get_model', ({ model }) => {
      const arrBuff = new Uint8Array(model);
      const blob = new Blob([arrBuff]);
      setBlob(blob);
      // console.log(blob);
    });
  });

  const handleThumbClick = (e) => {
    const name = e.target.alt;
    if (modelData.name === name) return;
    const m = data.find((item) => item.name === name);
    setModelData(m);
  };

  return (
    <div className='grid items-center  select-none  h-screen w-screen'>
      <div className='relative h-screen overflow-hidden w-screen grid items-center'>
        <IVP flip={UIProps.cameraFlip}></IVP>
        <div className='absolute z-50 h-screen w-full top-0'>
          {blob && (
            <PreviewCanvas
              modelProps={modelProps}
              glbFile={blob}
              orbitControls={modelProps.orbitControls}
            />
          )}
        </div>
        <div className='absolute p-5 flex w-screen h-screen  justify-between gap-2 top-0'>
          <div className='flex z-50 gap-3 h-full'>
            <div className={`flex h-full justify-btween flex-col gap-3 `}>
              <div className='flex flex-col gap-2'>
                {UIProps.hideThumbnails ? null : (
                  <Link
                    to={'/calss'}
                    className={`${buttonStyle} text-xs !w-full`}>{`< Back`}</Link>
                )}
              </div>
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
                <MdFlipCameraIos />
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
            <button
              className={buttonStyle}
              onClick={() =>
                setModelProps((p) => ({ ...p, scale: (p.scale += 0.1) }))
              }>
              <BiZoomIn />
            </button>
            <button
              className={buttonStyle}
              onClick={() =>
                setModelProps((p) => ({ ...p, scale: (p.scale -= 0.1) }))
              }>
              <BiZoomOut />
            </button>

            <button
              className={buttonStyle + 'text-sm'}
              onClick={() => {
                setModelProps((mp) => ({
                  ...mp,
                  rotation: { ...mp.rotation, x: mp.rotation.x + 0.1 },
                }));
              }}>
              Rotate X
            </button>
            <button
              className={buttonStyle + 'text-sm'}
              onClick={() => {
                setModelProps((mp) => ({
                  ...mp,
                  rotation: { ...mp.rotation, y: mp.rotation.y + 0.1 },
                }));
              }}>
              Rotate Y
            </button>
            <button
              className={buttonStyle + 'text-sm'}
              onClick={() => {
                setModelProps((mp) => ({
                  ...mp,
                  rotation: { ...mp.rotation, z: mp.rotation.z + 0.1 },
                }));
              }}>
              Rotate Z
            </button>
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
        </div>
      </div>
    </div>
  );
};

export default Room;
