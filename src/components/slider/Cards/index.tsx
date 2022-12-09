import Link from 'next/link';
import React from 'react';

const cardBoxses = [
  {
    id: 1,
    img: '/images/loan.png',
    heading: 'Budget friendly homes',
    price: '₹ 0L - 25L',
    para: '302 Foster Ave',
  },
  {
    id: 2,
    img: '/images/loan.png',
    heading: '2 BHK apartments',
    price: '₹ 0L - 25L',
    para: '302 Foster Ave',
  },
  {
    id: 3,
    img: '/images/loan.png',
    heading: 'Independent homes',
    price: '₹ 0L - 25L',
    para: '302 Foster Ave',
  },
];

const Cards = () => {
  return (
    <div className='grid grid-flow-row'>
      <div className='md:auto-rows-row container mx-auto grid h-fit w-fit sm:grid-flow-row sm:auto-rows-max md:grid-flow-row lg:auto-cols-max lg:grid-flow-col'>
        {cardBoxses.map((items) => (
          <Link key={items.id} href={`/projects/${items.id}`}>
            <a>
              <div className=' my-4 mx-2 h-fit max-w-sm rounded-lg bg-white shadow-lg'>
                <a href='#!'>
                  <img
                    className='h-50 transform  rounded-lg transition duration-500 hover:scale-105'
                    src='https://mdbootstrap.com/img/new/standard/nature/184.jpg'
                    alt=''
                  />
                </a>
                <div className='p-6'>
                  <h5 className='mb-2 text-xl font-medium text-gray-900'>
                    {items.heading}
                  </h5>
                  <h2 className='mb-2 text-xl font-medium text-gray-900'>
                    {items.price}
                  </h2>
                  <p className='mb-4 text-base text-gray-700'>{items.para}</p>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;
