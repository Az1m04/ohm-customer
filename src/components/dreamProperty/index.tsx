//import Mumbari from 'src/assets/svg/mumbai.svg';
import React from 'react';

const imgs = [
  {
    id: '1',
    imgpath: '/images/1.jpg',
    name: 'Mumbai',
  },
  {
    id: '2',
    imgpath: '/images/2.jpg',
    name: 'Delhi',
  },
  {
    id: '3',
    imgpath: '/images/8.jpg',
    name: 'Nodia',
  },
  {
    id: '4',
    imgpath: '/images/6.jpg',
    name: 'Gurgaon',
  },
  {
    id: '5',
    imgpath: '/images/4.jpg',
    name: 'Pune',
  },
  {
    id: '6',
    imgpath: '/images/2.jpg',
    name: 'Banglore',
  },
  {
    id: '7',
    imgpath: '/images/3.jpg',
    name: 'Hyderabad',
  },
  {
    id: '8',
    imgpath: '/images/4.jpg',
    name: 'Lucknow',
  },
  {
    id: '9',
    imgpath: '/images/5.jpg',
    name: 'Vizag',
  },
  {
    id: '10',
    imgpath: '/images/6.jpg',
    name: 'Kolkata',
  },
  {
    id: '11',
    imgpath: '/images/7.jpg',
    name: 'Chennai',
  },
  {
    id: '12',
    imgpath: '/images/8.jpg',
    name: 'kochi',
  },
];

const DreamCity = () => {
  return (
    <div className='my-4 flex flex-col items-center justify-center bg-[#FAF8FF] py-10 '>
      <div className='normal my-10 text-[28px] font-semibold leading-[2.6rem] text-[#333338] '>
        Find your dream property in your preferred city
      </div>
      <div className='grid w-6/12 grid-cols-6 gap-6'>
        {/* <div className='w-6/12'> */}
        {imgs.map((imgs) => (
          <div className='w-fit' key={imgs.id}>
            {/* <Mumbari
              width='180px'
              height='180px'
              className='drop-shadow-md'
            ></Mumbari> */}
            {/* <NextImage
              src={imgs.imgpath}
              // layout='fill'
              width={180}
              height={180}
              alt='Property Yard logo'
              className='rounded-md		'
            ></NextImage> */}
            <img src={imgs.imgpath} alt='' className='rounded-md' />
            {/* <NextImage
              useSkeleton
              className='w-32 md:w-40'
              src='/favicon/apple-icon-180x180.png'
              width='180'
              height='180'
              alt='Icon'
            /> */}
            <div className='normal text-center text-[18px] font-semibold leading-[2.6rem] text-[#666276] '>
              {imgs.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DreamCity;
