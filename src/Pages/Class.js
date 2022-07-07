import React from 'react';
import PreviewCanvas from '../Components/Admin/PreviewCanvas';
import ModelGrid from '../Components/Client/ModelGrid';
import InlineVideoPlayer from '../Components/Utils/InlineVideoPlayer';
import NavBar from '../Components/Utils/NavBar';

const Class = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='bg-purple w-screen '>
        <NavBar />
      </div>
      <div className='w-full  p-3 max-w-5xl'>
        <div className='w-1/2 relative'>
          <InlineVideoPlayer />
          <div className='absolute top-0 w-full h-full'>
            <PreviewCanvas />
          </div>
        </div>
        <div className='text-text'>
          <h1>All the model</h1>
          <ModelGrid />
        </div>
      </div>
    </div>
  );
};

export default Class;
