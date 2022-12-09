import React from 'react';

import NextImage from '../NextImage';

const cards = [
  {
    id: 1,
    img: '/images/loan.png',
    heading: 'Home Loan',
    para: 'This is some text inside of a div block.',
  },
  {
    id: 2,
    img: '/images/loan.png',
    heading: 'Home Interior',
    para: 'Designs you admire at price you love',
  },
  {
    id: 3,
    img: '/images/loan.png',
    heading: 'Property Management',
    para: 'The simplest way to manage your home',
  },
  {
    id: 4,
    img: '/images/loan.png',
    heading: 'Property Legal Services',
    para: 'End to end legal assistance in property related matters',
  },
  {
    id: 5,
    img: '/images/loan.png',
    heading: 'Pay Rent',
    para: 'Earn rewards by paying rent online',
  },
  {
    id: 6,
    img: '/images/loan.png',
    heading: 'Online Rent Agreement',
    para: 'Get an e-stamped rent agreement in your mail instantly',
  },
  {
    id: 7,
    img: '/images/loan.png',
    heading: 'Property Valuation',
    para: 'Establish "Right & Accurate" pricing for your property',
  },
  {
    id: 8,
    img: '/images/loan.png',
    heading: 'Escrow Services',
    para: 'Transact Smarter & Safer. Protect your deals from frauds',
  },
];

const OnePlace = () => {
  return (
    <div className=' '>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='font-regular my-12 text-3xl leading-8 tracking-tight text-gray-900 sm:text-4xl lg:text-center'>
          Everything you Need at One Place
        </div>

        <div className='space-y-10 md:grid md:grid-cols-4 md:gap-x-8 md:gap-y-10 md:space-y-0'>
          {cards.map((items) => (
            <div className='w-full' key={items.id}>
              <div
                style={{ boxShadow: '1px 0 20px -8px rgb(0 0 0 / 18%)' }}
                className='block items-center justify-between bg-white pt-5 pb-2 pl-5 no-underline'
              >
                <div className='bg-white-500  flex h-12 w-12 items-center justify-center rounded-md text-white'>
                  <NextImage
                    useSkeleton
                    className=''
                    src={items.img}
                    width='50'
                    height='50'
                    alt='Icon'
                  />
                </div>

                <div className=' text-[16px] font-semibold capitalize leading-9 '>
                  {items.heading}
                  <span className='text-[20px] font-semibold leading-9'>
                    -&gt;
                  </span>
                </div>
                <div className='mt-2  text-base text-[#464242]'>
                  {items.para}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnePlace;
