import React from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import DashBoard from '../Components/Admin/DashBoard';
import NewModel from '../Components/Admin/NewModel';

const Admin = ({ socket }) => {
  const { subpath } = useParams();
  return (
    <div className='overflow-hidden main bg-slate text-gray h-screen flex flex-col'>
      <nav className='flex justify-between py-3 items-center px-5 bg-purple'>
        <Link to='/' className='font-bold text-accent'>
          <img src='/logo3.png' className='w-16 ml-4' alt='Tutar Logo' />
        </Link>
        <button
          className='bg-mid rounded p-1 px-3 text-sm text-dark'
          onClick={() => {}}>
          Log-Out
        </button>
      </nav>
      <div className='flex  h-full'>
        <section
          className='text-accent left-section bg-purple py-4 px-2
         text-text h-full font-bold w-1/5 flex flex-col gap-4 items-center justify-start '>
          <NavLink to={'/admin'} className='!text-accent mb-4'>
            Dash
          </NavLink>
          <NavLink to={'/admin/newModel'} className='text-accent'>
            Add New Model
          </NavLink>
        </section>
        <section className='right-section bg-dark p-4 h-full w-full'>
          {subpath === undefined && <DashBoard socket={socket} />}
          {subpath === 'newModel' && <NewModel socket={socket} />}
        </section>
      </div>
    </div>
  );
};

export default Admin;
