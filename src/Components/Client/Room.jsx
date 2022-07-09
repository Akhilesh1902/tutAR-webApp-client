import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PreviewCanvas from '../Admin/PreviewCanvas';
import useFetch from '../customHooks/useFetch';
import IVP from '../Utils/InlineVideoPlayer';
import { BiZoomIn, BiZoomOut } from 'react-icons/bi';
import { TbRotate360 } from 'react-icons/tb';

const Room = ({ SERVER_URL, socket }) => {
  const { id } = useParams();
  const [modelData, setModelData] = useState();
  const [blob, setBlob] = useState();
  const [modelProps, setModelProps] = useState({
    rotation: 0,
    autoRotate: false,
  });
  const [flip, setFlip] = useState(false);

  const [data] = useFetch(SERVER_URL, id);

  useEffect(() => {
    console.log(data);
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
    <div className='grid items-center h-screen w-screen'>
      <div className='relative h-screen overflow-hidden w-screen flex'>
        <IVP flip={flip}></IVP>
        <div className='absolute h-screen w-full top-0'>
          {blob && <PreviewCanvas modelProps={modelProps} glbFile={blob} />}
        </div>
        <div className='absolute p-5 flex w-screen justify-between gap-2 top-0'>
          <div className='flex flex-col gap-3'>
            {data?.map((item, i) => {
              return (
                <div key={i} className=' w-fit'>
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
          <div className='text-text text-3xl items-center flex flex-col gap-4 '>
            <BiZoomIn />
            <BiZoomOut />
            <TbRotate360
              onClick={() => {
                setModelProps({
                  ...modelProps,
                  rotation: modelProps.rotation + 0.2,
                });
              }}
            />
            <button
              className='text-lg bg-mid text-dark px-1 rounded'
              onClick={() => {
                setModelProps((mp) => ({ ...mp, autoRotate: !mp.autoRotate }));
              }}>
              {modelProps.autoRotate ? 'Start Rotate' : 'Stop Rotate'}
            </button>
            <button
              className='text-lg bg-mid text-dark px-1 rounded'
              onClick={() => setFlip((f) => !f)}>
              {flip ? 'Flip On' : 'Flip Off'}{' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
