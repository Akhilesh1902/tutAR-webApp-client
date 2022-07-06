import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import Class from './Class';
import Error from './Error';
import Landing from './Landing';

const Pages = ({ socket }) => {
  return (
    <div className='App bg-dark h-screen'>
      <Routes>
        <Route path='/' element={<Landing socket={socket} />} />
        <Route path='/admin' element={<Admin socket={socket} />} />
        <Route path='/admin/:subpath' element={<Admin socket={socket} />} />
        <Route path='/class/:id' element={<Class />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  );
};

export default Pages;
