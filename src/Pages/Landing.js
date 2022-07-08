import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/Utils/NavBar';

const Landing = () => {
  return (
    <div className='text-accent w-screen min-h-screen flex flex-col items-center'>
      <div className='bg-purple flex justify-center w-full'>
        <NavBar />
      </div>
      <div className='container w-full h-full flex-1 text-2xl flex flex-col justify-center items-center max-w-4xl'>
        <h1>Page Under Construction </h1>
        <p>If you are admin redirect to /admin or click the link below</p>
        <Link to={`/admin`} className='text-text mt-6 underline'>
          {`To Admin >`}
        </Link>
        <p className='mt-4'>If you want to explore Classes</p>
        <Link to={`/class`} className='text-text mt-6 underline'>
          {`To Class >`}
        </Link>
      </div>
    </div>
  );
};

export default Landing;
