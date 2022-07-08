const Modal = ({ type, handleSubmit, setModal }) => {
  return (
    <div className='z-10 absolute w-fit h-fit text-accent p-5 rounded flex flex-col gap-2 items-center inset-1/2 bg-gray'>
      <h1>{type}</h1>
      <div className='flex gap-6 text-purple leading-none pt-4'>
        <button
          className='bg-mid p-2 px-3 rounded'
          onClick={() => {
            alert('you declined to submit image');
            setModal(false);
          }}>
          Decline
        </button>
        <button className='bg-accent  p-2 px-3 rounded' onClick={handleSubmit}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default Modal;
