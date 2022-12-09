import React from 'react';

export interface BudgetProps {
  id: string;
  value: string;
}

const icons = [
  {
    id: 1,

    data: 'New Project',
  },
  {
    id: 2,

    data: 'Feature Properties',
  },
  {
    id: 3,

    data: 'Commercial Properties',
  },
  {
    id: 4,

    data: 'Plot & Land',
  },
  {
    id: 5,

    data: 'Rental Properties',
  },
  {
    id: 6,

    data: 'Find Agents',
  },
];

const minvalue = [
  '₹ 0',
  '₹ 10 L',
  '₹ 20 L',
  '₹ 30 L',
  '₹ 40 L',
  '₹ 50 L',
  '₹ 60 L',
  '₹ 70 L',
  '₹ 80 L',
  '₹ 90 L',
  '₹ 90 L',
  '₹ 1 Cr',
  '₹ 1.1 Cr',
  '₹ 1.2 Cr',
  '₹ 1.3 Cr',
  '₹ 1.4 Cr',
  '₹ 1.5 Cr',
  '₹ 1.75 Cr',
  '₹ 2 Cr',
  '₹ 2.25 Cr',
  '₹ 2.5 Cr',
  '₹ 3 Cr',
  '₹ 3.5 Cr',
  '₹ 4 Cr',
  '₹ 4.5 Cr',
  '₹ 5 Cr',
  '₹ 6 Cr',
  '₹ 7 Cr',
  '₹ 8 Cr',
  '₹ 9 Cr',
  '₹ 10 Cr',
  '₹ 20 Cr',
  '₹ 30 Cr',
  '₹ 40 Cr',
  '₹ 50 Cr',
];

const maxvalue = [
  '₹ 0',
  '₹ 10 L',
  '₹ 20 L',
  '₹ 30 L',
  '₹ 40 L',
  '₹ 50 L',
  '₹ 60 L',
  '₹ 70 L',
  '₹ 80 L',
  '₹ 90 L',
  '₹ 90 L',
  '₹ 1 Cr',
  '₹ 1.1 Cr',
  '₹ 1.2 Cr',
  '₹ 1.3 Cr',
  '₹ 1.4 Cr',
  '₹ 1.5 Cr',
  '₹ 1.75 Cr',
  '₹ 2 Cr',
  '₹ 2.25 Cr',
  '₹ 2.5 Cr',
  '₹ 3 Cr',
  '₹ 3.5 Cr',
  '₹ 4 Cr',
  '₹ 4.5 Cr',
  '₹ 5 Cr',
  '₹ 6 Cr',
  '₹ 7 Cr',
  '₹ 8 Cr',
  '₹ 9 Cr',
  '₹ 10 Cr',
  '₹ 20 Cr',
  '₹ 30 Cr',
  '₹ 40 Cr',
  '₹ 50 Cr',
];
const budget: BudgetProps[] = minvalue.map((item) => ({
  id: item,
  value: item,
}));

const Banner = () => {
  return (
    <div>
      <video
        autoPlay
        muted
        loop
        className='h-fit w-full backdrop-brightness-50'
        style={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <source
          src='./images/banner-video.mp4'
          className='backdrop-brightness-200'
          type='video/mp4'
        />
      </video>

      <div className='container absolute left-[50vh] right-[50vh] top-[20vh] mx-auto w-fit'>
        <div className='leading-40 text-center text-[28px] font-semibold text-white '>
          Dubai
        </div>
        <div className='leading-36 text-center text-[32px]	font-medium text-white	 '>
          Real Estate Made Real Easy
        </div>

        <div className='my-4 grid grid-cols-6 bg-white'>
          {icons.map((items) => (
            <div key={items.id} className='col-span-1 mx-auto'>
              <div className='absolute top-10 rounded-full border-2 border-white bg-white'></div>
              <div className='text-center text-sm font-bold'>{items.data}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
