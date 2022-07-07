import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/Utils/NavBar';

const Error = () => {
  return (
    <>
      <div className='w-screen text-text h-screen flex  flex-col items-center'>
        <div className='bg-purple'>
          <NavBar />
        </div>
        <div className='flex flex-col justify-center gap-5 h-full items-center text-xl'>
          <h1>Opps! You seem to be lost, Click the link below </h1>
          <Link to={'/'} className='underline text-accent text-sm '>
            {`HomePage ->`}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
