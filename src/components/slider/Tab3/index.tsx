import React from 'react';

const cardBoxses = [
  {
    id: 1,
    img: '/images/loan.png',
    heading: 'Adani Realty',
    price: '₹ 0L - 25L',
    para: 'Experience : 31 Years',
  },
  {
    id: 2,
    img: '/images/loan.png',
    heading: 'Adani Realty',
    price: '₹ 0L - 25L',
    para: 'Experience : 31 Years',
  },
  {
    id: 3,
    img: '/images/loan.png',
    heading: 'Adani Realty',
    price: '₹ 0L - 25L',
    para: 'Experience : 31 Years',
  },
];

const Tab3 = () => {
  return (
    <div className=' flex justify-center'>
      {cardBoxses.map((items) => (
        <div
          key={items.id}
          className='mx-2 max-w-sm rounded-lg bg-white shadow-lg'
        >
          <a href='#!'>
            <img
              className='h-50 transform  rounded-lg transition duration-500 hover:scale-105'
              src='https://mdbootstrap.com/img/new/standard/nature/184.jpg'
              alt=''
            />
          </a>
          <div className='p-6'>
            <h5 className='mb-2 text-xl font-medium text-gray-900'>
              Card title
            </h5>
            <p className='mb-4 text-base text-gray-700'>
              Some quick example text to build on the card title and make up the
              bulk of the card&apos;s content.
            </p>
            <button
              type='button'
              className=' inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
            >
              Button
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tab3;
