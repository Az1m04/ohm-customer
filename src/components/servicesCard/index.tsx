import React from 'react';

function ServicesCard() {
  const serviceList = [
    {
      id: 1,
      title: 'Save Money',
      img: '/images/services/1.png',
    },
    {
      id: 2,
      title: 'Save Time',
      img: '/images/services/2.png',
    },
    {
      id: 3,
      title: '24/7 Customer Service',
      img: '/images/services/3.png',
    },
    {
      id: 4,
      title: 'Minimum Shipping',
      img: '/images/services/4.png',
    },
  ];
  return (
    <div className='my-10 flex flex-wrap justify-center gap-5'>
      {serviceList.map((item: any) => (
        <div
          key={item?.id}
          className='relative mx-2 mt-10 h-[142px] w-full  rounded-xl border-[2px]  border-[#8a8a8a] pt-[60px] sm:w-1/2 md:w-1/3 lg:mt-0 lg:w-1/5 xl:mt-0 xl:w-1/5'
        >
          <div className='absolute -top-[50px] left-[50%] max-h-[100px] max-w-[100px]  translate-x-[-50%] transform rounded-full  bg-[#009E60] p-5 '>
            <img src={item?.img} height='100px' width='100px' />
          </div>
          <div className=' text-center  '>
            <div className='mt-5 text-[20px] text-[#333333]'>{item?.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServicesCard;
