import React from 'react';

import Getapp from '@/assets/svg/getapp.svg';
import SocialBtns from '@/assets/svg/socialbtn.svg';

const GetApp = () => {
  return (
    <div className='mx-40 my-20 flex flex-row items-start justify-between rounded-lg bg-[#dfddff] '>
      <div className='mx-10 my-10'>
        <div className='normal  mx-5 my-4 text-[32px] font-bold leading-[2.6rem] text-[#1F1B2D] '>
          Get Our App
        </div>
        <div className=' normal mx-5  text-[18px] font-normal leading-[1.6rem] text-[#666276] '>
          Download the app and explore the properties!
        </div>
        <SocialBtns className='h-28 w-96'></SocialBtns>
      </div>

      <img src='/images/getapp.png' style={{ width: '650px' }} alt='' />
      {/* <Getapp ></Getapp> */}
    </div>
  );
};

export default GetApp;
