import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Room from '../Components/Client/Room';
import Admin from './Admin';
import Class from './Class';
import Error from './Error';
import Landing from './Landing';

const Pages = ({ SERVER_URL, socket }) => {
  return (
    <div className='App bg-dark h-screen'>
      <Routes>
        <Route path='/' element={<Landing socket={socket} />} />
        <Route path='/admin' element={<Admin socket={socket} />} />
        <Route path='/admin/:subpath' element={<Admin socket={socket} />} />
        <Route
          path='/class'
          element={<Class SERVER_URL={SERVER_URL} socket={socket} />}
        />
        <Route
          path='/class/:id'
          element={<Room SERVER_URL={SERVER_URL} socket={socket} />}
        />
        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  );
};

export default Pages;
