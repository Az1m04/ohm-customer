import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Lottie from 'react-lottie';

import Style from './index.module.css';

import animationData2 from '../../../assets/Json/surprise.json';

function OhmCollections({ imag, title, discount, id }: any) {
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,

    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Link href={`/products/viewproduct?productId=${id}`} passHref>
      <div
        className={`${Style.container} max-h-[290px] max-w-[290px] rounded-xl bg-white p-10 `}
      >
        {discount && (
          <div className='absolute left-0 top-0 z-10 mx-3  mt-3 rounded-full bg-[#2e2e2e] px-4 text-center text-white'>
            Sale
          </div>
        )}
        <div className='absolute top-0 right-0 z-10  '>
          <Lottie
            className='object-cover '
            height='70px'
            width='70px'
            options={defaultOptions2}
            isClickToPauseDisabled={true}
          />
        </div>
        <Image
          alt=''
          src={imag}
          height='300px'
          width='300px'
          className={`${Style.image} transform transition   duration-500 hover:scale-110`}
        />
        <div className={`${Style.overlay} rounded-b-xl `}>
          <div className={`${Style.text} truncate px-1`}>{title}</div>
        </div>
      </div>
    </Link>
  );
}

export default OhmCollections;
