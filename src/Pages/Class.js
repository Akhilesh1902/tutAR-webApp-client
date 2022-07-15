import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../customHooks/useFetch';
import NavBar from '../Components/Utils/NavBar';

const Class = ({ SERVER_URL }) => {
  const [classes, setClasses] = useState({ status: true, value: [] });

  const [data] = useFetch(SERVER_URL);

  useEffect(() => {
    if (!data) return;
    const allClasses = new Set(data.map((i) => i.Class));
    setClasses((classes) => ({ ...classes, value: [...allClasses] }));
  }, [data]);

  return (
    <div className='flex flex-col h-full justify-center relative items-center'>
      <div className='bg-purple w-screen '>
        <NavBar />
      </div>
      <div className='text-text flex flex-col m-4 justify-start items-center w-full h-full md:max-w-5xl'>
        <h1 className='text-2xl'>Selct Class</h1>
        <div className='grid grid-cols-2 gap-2 m-auto '>
          {classes.value.length
            ? classes.value.map((item, i) => (
                <div key={i}>
                  <Link
                    className='bg-accent w-24 text-dark p-2 capitalize '
                    to={`${item}`}>
                    {item}
                  </Link>
                  {/* <button
                  className='bg-accent w-24 text-dark p-2 capitalize '
                  onClick={handleClassSelection}>
                  {item}
                </button> */}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Class;
