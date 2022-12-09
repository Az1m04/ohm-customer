import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Banner1 from '../../assets/img/banner1.jpg';
import Banner2 from '../../assets/img/banner2.jpg';
import podJuice from '../../assets/img/podjuice.jpg';
import Tincan from '../../assets/img/TINCAN.jpg';
const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselCard = [
    {
      id: 1,
      media: Tincan,

      name: '',
    },
    {
      id: 2,
      media: Banner1,

      title: '',
    },
    {
      id: 3,
      media: podJuice,

      title: '',
    },
    {
      id: 4,
      media: Banner2,
      title: '',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeIndex < carouselCard?.length) {
        setActiveIndex((pre) => pre + 1);
      }
      if (activeIndex === carouselCard?.length - 1) {
        setActiveIndex(0);
      }
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  }, [activeIndex, carouselCard?.length]);

  return (
    <div className=' mx-auto flex  h-auto w-full  items-center rounded-xl '>
      <div className='relative w-full'>
        {carouselCard
          ?.filter((item: any) => {
            return item?.id === carouselCard?.[activeIndex]?.id;
          })
          .map((item: any) => {
            // console.log(item?.media?.[0]?.url, 'carousel');
            return (
              <div
                key={item?.id}
                id='default-carousel'
                data-carousel='static'
                className='     '
              >
                <div className='w-full'>
                  <div className='item-start -ml-4 flex  translate-x-6 flex-col-reverse  transition duration-200 ease-in-out  xs:w-full sm:w-full sm:px-10  md:w-full md:flex-row md:items-center lg:flex-row xl:flex-row '>
                    <div className='flex items-center justify-center  md:w-full'>
                      <div className='relative h-auto w-auto rounded-md  pr-10  md:pr-0   lg:pr-0  xl:pr-0 '>
                        {item?.media && (
                          <Image
                            src={item?.media}
                            objectFit='contain'
                            className='bg-none '
                            alt='u'
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Carousel;
