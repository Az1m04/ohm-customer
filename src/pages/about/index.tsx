import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import gummies from '../../assets/img/Gummies-1.jpg';
import product2 from '../../assets/img/product2.jpg';
import cardImage from '../../assets/img/team.png';
import truck from '../../assets/img/truck.jpg';
function About() {
  const informationCard = [
    {
      id: 1,
      img: truck,
      title: 'Free Shipping',
      description:
        '  We are delivering products all over the US with free shipping',
    },
    {
      id: 2,
      img: product2,
      title: 'Our Products',
      description:
        '  Despite having no distinct shape, Absolut made its bottle the most recognizable bottle in the world. Its campaign, which featured print ads showing bottles "in the wild,"  ',
    },
    {
      id: 3,
      img: cardImage,
      title: 'How We Works',
      description:
        '  Traditionally, most agencies have four main functions — client servicing, media planning and buying, creative, and account planning. ',
    },
  ];

  return (
    <div className='about container my-[95px] mx-auto'>
      <div className='body md:mx-[58px]'>
        <div className='   items-center justify-center  md:flex'>
          <div className=' flex w-full justify-center '>
            <div className=''>
              <Image
                src={gummies}
                objectFit='contain'
                width='400px'
                height='400px'
                alt='logo'
              />
            </div>
          </div>

          <div className='w-full'>
            {/* <h3 className=' text-[20px]'>Welcome to OHM</h3> */}
            <h1 className='text-[38px] text-[#009e60]'>Welcome to OHM</h1>

            <p className='mt-3 w-full  text-justify  text-[16px] text-[#333333] '>
              Serving since 2017 To smoke shop ,vape shop ,head shop . We carry
              products such as vape , hookah , smoking accessories, lighter ,
              etc . We ship products directly from our Connecticut Wharehouse
              and strive to provide.We are a Wholesale distributor serving, etc.
              We carry products such as ashtrays, cigarette cases, incense &
              candles, lighters etc. We ship products directly from our
              warehouse in Bristol , CT and Strive to provide our customers with
              the best possible service & price. We accept most major credit
              cards (some restrictions apply).
            </p>
            <div className=' mt-[16px] w-[150px] rounded-xl border-[3px] border-[#009e60] py-[9px] px-[15px]  text-center text-[18px] font-semibold text-[#009e60] '>
              <Link href='/products'>
                <a href='all-products.html' className=''>
                  Shop Now
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div
          className='relative mt-10  hidden w-full text-center  md:block md:h-[35vh]  lg:block lg:h-[33vh] xl:block xl:h-[35vh]'
          style={{
            backgroundImage: 'url(/images/aboutBg.png) ',
            backgroundSize: 'cover',
            backgroundAttachment: `fixed`,
            backgroundPosition: `center`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className=' flex h-full w-full flex-col items-center justify-center'>
            <h1 className='text-center text-[50px] text-white'>
              OHM Wholesale
            </h1>
            <p className=' max-w-[600px] text-center text-[16px] text-white'>
              Serving since 2017 To smoke shop ,vape shop ,head shop . We carry
              products such as vape , hookah , smoking accessories, lighter ,
              etc. We ship products directly from our warehouse in Bristol, CT
              and Strive to provide our customers with the best possible service
              & price. We accept most major credit cards (some restrictions
              apply).
            </p>
            <div className='border-white-500 my-4 h-[50] w-[160px] cursor-pointer items-center rounded-xl border-2 px-[15px] py-[9px] text-[16px] font-semibold text-white hover:bg-transparent hover:bg-[#333]'>
              <Link href='/products'>
                <a href='all-products.html' className=''>
                  Shop Now
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className='mt-20'>
          <div className='md:w-34 container mx-auto mb-[50px] grid grid-cols-1 justify-center gap-10  md:grid-cols-3'>
            {informationCard.map((item) => {
              return (
                <>
                  <div className='sm:cover  max-w-sm overflow-hidden rounded bg-[#009e60] p-[35px] shadow-lg xs:max-w-full sm:mx-auto sm:mb-3.5 sm:max-w-full md:mb-3.5 lg:h-[430px] lg:w-[380px] '>
                    <div className='flex w-full justify-center'>
                      <Image
                        className='w-full rounded-full'
                        src={item.img}
                        alt={item.title}
                        height='220px'
                        width='220px'
                      />
                    </div>
                    <div className='px-6 py-4'>
                      <h1 className='mb-2 text-center text-[30px] font-bold text-white'>
                        {item.title}
                      </h1>
                      <p className='text-center text-[14px] text-white '>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
