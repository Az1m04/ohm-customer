import Image from 'next/image';
import React from 'react';

const Modal = ({ setAgeVerification }) => {
  return (
    <div className=' flex w-1/2  justify-center rounded-lg bg-white  p-5'>
      <div className='sm:flex sm:items-start'>
        <div className='mt-3 text-center'>
          <div>
            <Image
              src='/ageverification.jpg'
              alt='age verification'
              height='100'
              width='100'
            />
          </div>
          <div className='mt-2'>
            By entering this you are stating that you are of legal age
            <div className=' '>
              to purchase smoking products.Use at your own risk
            </div>
            <div>Please verify that you are 21 years of age older</div>
          </div>

          <div className='xxs-block  my-4 justify-center bg-gray-50 p-4  md:flex md:flex-row-reverse '>
            <div className=' w-full'>
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 xxs:my-4 xxs:text-sm sm:my-4 sm:my-0  sm:ml-3 sm:w-auto sm:text-sm'
              >
                No,I am under 21
              </button>
            </div>
            <div className='w-full flex-col items-center justify-center text-center'>
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-md border border-transparent bg-[#009e60] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={() => {
                  localStorage.setItem('verify', 'yes');
                  setAgeVerification(true);
                }}
              >
                Yes I am 21+
              </button>
            </div>
          </div>

          <br />
        </div>
      </div>
    </div>
  );
};

export default Modal;
