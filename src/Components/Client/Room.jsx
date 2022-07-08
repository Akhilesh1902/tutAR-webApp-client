import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PreviewCanvas from '../Admin/PreviewCanvas';
import useFetch from '../customHooks/useFetch';
import IVP from '../Utils/InlineVideoPlayer';

const Room = ({ SERVER_URL, socket }) => {
  const { id } = useParams();
  const [modelData, setModelData] = useState();
  const [blob, setBlob] = useState();

  const [data] = useFetch(SERVER_URL, id);

  useEffect(() => {
    console.log(data);
    if (data) setModelData(data[0]);
  }, [data]);

  useEffect(() => {
    if (!modelData) return;
    console.log(modelData);
    socket.emit('_get_model', { addr: modelData.fileAddr });
    //eslint-disable-next-line
  }, [modelData]);

  useEffect(() => {
    socket.off('_get_model').on('_get_model', ({ model }) => {
      console.log(model);
      const arrBuff = new Uint8Array(model);
      const blob = new Blob([arrBuff]);
      setBlob(blob);
    });
  }, [socket]);

  const handleThumbClick = (e) => {
    const name = e.target.alt;
    const m = data.find((item) => item.name === name);
    socket.emit('_get_model', { addr: m.fileAddr });
  };

  return (
    <div className='grid items-center h-screen'>
      <div className='relative h-screen overflow-hidden w-full'>
        <IVP></IVP>
        <div className='absolute h-screen w-full top-0'>
          {blob && <PreviewCanvas glbFile={blob} />}
        </div>
        <div className='absolute m-2 flex flex-col gap-2 top-0'>
          {data?.map((item) => {
            return (
              <div className=''>
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
      </div>
    </div>
  );
};

export default Room;
