import { useRef, useState, useEffect } from 'react';
import Modal from '../Utils/Modal';
import PreviewCanvas from '../threeJs/PreviewCanvas';

const NewModel = ({ socket }) => {
  const image_input_ref = useRef();
  const [modal, setModal] = useState();
  const thumbRef = useRef();
  const [modelData, setModelData] = useState({
    thumbName: '',
    thumb: null,
    file: null,
    name: '',
    Class: '',
    Subject: '',
    animations: [],
  });
  const [modelProps, setModelProps] = useState({
    curAnimIndex: 0,
    rotation: { x: 0, y: 0, z: 0 },
    autoRotate: false,
    scale: 1,
    orbitControls: false,
  });

  useEffect(() => {
    console.log(modelData);
  }, [modelData]);

  const onFileCange = (e) => {
    console.log(e.target.id);
    if (e.target.id === 'thumbnail-input') {
      const file = e.target.files[0];

      const IURL = URL.createObjectURL(file);
      thumbRef.current.style.backgroundImage = `url(${IURL})`;
      const thumbName = file.name.replace(/ /g, '_');
      setModelData({ ...modelData, thumbName, thumb: file });
    } else {
      const file = e.target.files[0];
      const name = file.name.replace(/ /g, '_');
      console.log(name);
      if (name.includes('.glb')) {
        console.log(name.split('.')[1]);
        // alert('upload glb file');
        setModelData({ ...modelData, loader: name.split('.')[1] });
      }
      setModelData({ ...modelData, name, file });
      // console.log(name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(modal);
    console.log('here');
    socket.emit('_add_model', {
      modelData: { ...modelData, animations: null },
    });
    setModal(false);
  };

  return (
    <div className='flex flex-col text-text'>
      <h1 className='mt-4 font-medium'>Add More Images To Kiosk</h1>
      <div className='pt-4'>
        <form
          onSubmit={(e) => {
            console.log('here');
            e.preventDefault();
            setModal(true);
          }}
          className='image-form w-full flex flex-col gap-3 mt-4'>
          <div className='flex w-full justify-between gap-3'>
            <div className='flex  flex-col gap-3'>
              <div>
                <p>Add in Thumbnail</p>
                <div className='flex'>
                  <div
                    ref={thumbRef}
                    className='bg-accent w-20 h-20 !bg-cover mr-3 !bg-top'></div>
                  <input
                    ref={image_input_ref}
                    type='file'
                    id='thumbnail-input'
                    accept='image/jpeg, image/png,image/jpg,.mp4'
                    required
                    onChange={onFileCange}
                  />
                </div>
              </div>
              <div className='flex flex-col'>
                <p>Add in Model</p>
                <input
                  ref={image_input_ref}
                  type='file'
                  id='model-input'
                  accept='.glb'
                  required
                  onChange={onFileCange}
                />
                <span className='p-0 m-0 leading-none ml-2 text-xs  italic'>
                  max-size:12mb
                </span>
              </div>
              {/* <DraggablePreview imgData={imgData} setImgData={setImgData} /> */}
              <div className='h-full aspect-video border border-accent'>
                {modelData.file && (
                  <PreviewCanvas
                    modelProps={modelProps}
                    orbitControls
                    glbFile={modelData.file}
                    modelData={modelData}
                    setModelData={setModelData}
                  />
                )}
              </div>
            </div>
            <div className='flex w-1/3 flex-col'>
              <h1>Add Additional</h1>
              <div className=' flex flex-col gap-2'>
                <div className=' flex flex-col gap-1'>
                  <p>Class :</p>
                  <input
                    type='text'
                    value={modelData.Class}
                    required
                    onChange={(e) => {
                      setModelData({ ...modelData, Class: e.target.value });
                    }}
                    className='rounded text-dark px-2 py-1 outline-0'
                  />
                </div>
                <div className=' flex flex-col gap-1'>
                  <p>Subject :</p>
                  <input
                    type='text'
                    required
                    value={modelData.Subject}
                    onChange={(e) => {
                      setModelData({ ...modelData, Subject: e.target.value });
                    }}
                    className='rounded text-dark px-2 py-1 outline-0'
                  />
                </div>
                <div className='flex flex-col w-full gap-2'>
                  <p>Select Animations :</p>
                  <div className='flex gap-2 flex-wrap w-full'>
                    {modelData.animations.map((item, i) => {
                      return (
                        <button
                          type='button'
                          className='px-2 bg-mid text-dark'
                          onClick={(e) => {
                            setModelProps((md) => ({
                              ...md,
                              curAnimIndex: parseInt(e.target.innerText),
                            }));
                          }}>
                          {i}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type='submit' className='bg-lime w-fit px-4 py-1 rounded-md'>
            Submit
          </button>
        </form>
        {modal && (
          <Modal
            type='add New Modal'
            setModal={setModal}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default NewModel;
