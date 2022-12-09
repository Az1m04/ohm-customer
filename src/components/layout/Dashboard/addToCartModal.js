import React from 'react';

const AddToCartModal = ({ setAddToCartModal }) => {
  return (
    <div
      className=' flex  items-center justify-center rounded-lg '
      style={{
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div
        className='flex  items-center justify-center '
        style={{ height: '40vh', width: '40vw' }}
      >
        <button
          className='h-20 cursor-pointer bg-green-500'
          onClick={() => setAddToCartModal(false)}
        >
          lasdsdasd
        </button>
      </div>
    </div>
  );
};

export default AddToCartModal;
