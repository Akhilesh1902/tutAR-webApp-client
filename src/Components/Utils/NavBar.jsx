import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='flex justify-between py-3 items-center px-5 mx-auto max-w-5xl w-screen '>
      <Link to='/' className='font-bold text-accent'>
        <img src='/logo3.png' className='w-16 ml-4' alt='Tutar Logo' />
      </Link>
      <button
        className='bg-mid rounded p-1 px-3 text-sm text-dark'
        onClick={() => {}}>
        Log-Out
      </button>
    </nav>
  );
};

export default NavBar;
