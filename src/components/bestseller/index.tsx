import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Line from 'src/assets/svg/line.svg';

const imgs = [
  {
    id: '1',
    imgpath: '/images/1.jpg',
    name: 'JP Codename Hotcake',
    des: 'Mira bhayandar, Mumbai',
    line: '',
    pricedes: '61.99 Lac to 87.50 Lac',
    flatdes: '1, 2 BHK flats  |  295-416 SF (Carpet)',
    Graybutton: '',
    Bluebutton: '',
  },
  {
    id: '2',
    imgpath: '/images/8.jpg',
    name: 'Smart World Orchard',
    des: 'Sector 61, Gurgaon',
    line: '',
    pricedes: '61.99 Lac to 87.50 Lac',
    flatdes: '1, 2 BHK flats  |  295-416 SF (Carpet)',
    Graybutton: '',
    Bluebutton: '',
  },
];

const Bestsellers = () => {
  return (
    <div className=' mx-atuo container my-8 grid grid-flow-col grid-cols-2 bg-[#FFFFFF]  '>
      <div className='my-auto ml-56 items-center text-center'>
        <div className='normal my-2 text-[28px] font-semibold leading-[3rem] text-[#333338] '>
          New real estate projects in India
        </div>
      </div>
      <div className='grid grid-cols-2 gap-6  '>
        {/* <div className='w-6/12'> */}
        {imgs.map((imgs) => (
          <Link href={`/projects/${imgs.id}`} key={imgs.id}>
            <a>
              <div className='rounded-lg bg-white px-4 py-2  drop-shadow-lg'>
                {/* <SmartWorld className='h-56 w-72 rounded-md'></SmartWorld> */}
                {imgs.imgpath && (
                  <Image
                    src={imgs.imgpath}
                    alt=''
                    objectFit='cover'
                    width={300}
                    height={300}
                  />
                )}
                <div className='normal px-4 py-2 text-[20px] font-bold leading-[1.6rem] text-[#333338] '>
                  {imgs.name}
                </div>
                <div className='normal px-4 text-[14px] font-semibold leading-[1.3rem] text-[#797979] '>
                  {imgs.des}
                </div>
                <Line className='mx-2 my-2 h-2 w-full'></Line>
                <div className='normal px-4  text-[20px] font-bold leading-[1.6rem] text-[#333338] '>
                  {imgs.pricedes}
                </div>
                <div className='normal px-4 text-[14px] font-medium leading-[1.3rem] text-[#797979] '>
                  {imgs.flatdes}
                </div>
                <div className='my-5  flex flex-row items-center'>
                  <div className=' mx-1 rounded-full  bg-[#F4F4F4] px-12 py-3'>
                    <div className='font-regular text-[14px] font-semibold leading-[1.3rem] text-[#8E8B8B]'>
                      Shortlist
                    </div>
                  </div>
                  <div className='rounded-full bg-[#4F46E5] px-12 py-3 '>
                    <div className='font-regular text-[14px] font-semibold leading-[1.3rem] text-[#FFFFFF]'>
                      Details
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Bestsellers;
