import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Banner1 from '../../assets/img/banner11.jpg';
import Banner2 from '../../assets/img/banner22.jpg';
import podJuice from '../../assets/img/podJuiceSmall.jpg';
import Tincan from '../../assets/img/TIN-CAN.jpg';

const Card2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardData = [
    {
      id: 1,
      media: Tincan,

      name: '',
    },

    {
      id: 2,
      media: podJuice,

      title: '',
    },

    {
      id: 3,
      media: Banner2,

      title: '',
    },

    {
      id: 4,
      media: Banner1,

      title: '',
    },

    // {
    //   id: 3,
    //   media: lighterleash,
    //   title: 'LIGHTER LEASH',
    // },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeIndex < cardData?.length) {
        setActiveIndex((pre) => pre + 1);
      }
      if (activeIndex === cardData?.length - 1) {
        setActiveIndex(0);
      }
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [activeIndex, cardData?.length]);

  return (
    <div className='  h-[310px] w-[302px] cursor-pointer items-center rounded-xl  '>
      {cardData
        ?.filter((item: any) => {
          return item?.id === cardData?.[activeIndex]?.id;
        })
        .map((item: any) => {
          return (
            <Link
              href={`/products/viewproduct?productId=${item?.id}`}
              passHref
              key={item?.id}
            >
              <div className='mb-[30px] grid max-h-[100px] w-full grid-cols-1 items-center rounded-md text-center  text-[#333333]'>
                <div>
                  <h1 className='truncate text-[25px]'> {item?.title}</h1>
                </div>
                <div className=' mt-5 flex w-full justify-center'>
                  <div className='h-auto w-auto '>
                    {item?.media && (
                      <Image
                        src={item?.media}
                        alt={item?.title}
                        objectFit='contain'
                      />
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Card2;
