import React from 'react';

const ExplorePrice = () => {
  return (
    <div className='bg-[#dad7ff] '>
      <div className=' container mx-auto   sm:grid sm:grid-flow-row sm:grid-cols-1 md:grid md:grid-flow-row md:grid-cols-2 lg:grid lg:grid-flow-row lg:grid-cols-8 '>
        <div className='col-span-4'>
          <div className='text-2xl font-bold leading-9 text-[#000] xs:py-4 sm:my-4 md:my-4 lg:mx-10 lg:my-6 '>
            Check price history of recent transactions in any real estate
            project or locality
          </div>
          <div className=' my-4  w-max rounded-md bg-white px-6 py-4 text-center text-[18px]  font-medium lg:mx-12	 	'>
            Explore Now -&gt;
          </div>
        </div>
        <div className='col-span-4 mt-12'>
          <img src='/images/home-price-history-banner-new.svg' />
        </div>
      </div>
    </div>
  );
};

export default ExplorePrice;
