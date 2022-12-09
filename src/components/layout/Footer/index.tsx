/* eslint-disable @next/next/link-passhref */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import emailIcon from 'src/assets/img/email.png';
import FB from 'src/assets/img/facebook.png';
import Instagram from 'src/assets/img/insta.png';
import locationIcon from 'src/assets/img/location.png';
import phoneIcon from 'src/assets/img/phone.png';
import Twitter from 'src/assets/img/twitter.png';
import Youtube from 'src/assets/img/youtube.png';

import BottomFooter from './BottomFooter';
import logoWhite from '../../../assets/img/logo_white.png';

/**
 * 
 * @returns   <div className='flex gap-5 p-[20px] text-[16px] text-gray-600'>
              <div>
                <Link href='/'>
                  <a>
                    <div className='p-[20px]'>Home</div>
                  </a>
                </Link>

                <Link href='/'>
                  <a>
                    <div className='p-[20px]'>Products</div>
                  </a>
                </Link>

                <Link href='/'>
                  <a>
                    <div className='p-[20px]'>About</div>
                  </a>
                </Link>

                <Link href='/'>
                  <a>
                    <div className='p-[20px]'>Contact</div>
                  </a>
                </Link>
              </div>
            </div>
 */
const Footer = () => {
  return (
    <div className='w-full overflow-hidden bg-[#009E60]'>
      <div className='  mx-auto flex  justify-center  px-[20px] py-[40px]  lg:container xl:container'>
        <div className='  w-full justify-between gap-6 md:flex lg:container lg:flex lg:px-[40px]  xl:container xl:flex xl:px-[40px] 2xl:flex'>
          <div className=' max-w-[384px]'>
            <Link href='/'>
              <div className=' cursor-pointer '>
                <Image
                  src={logoWhite}
                  height='80px'
                  width='192px'
                  className='  object-contain  sm:mx-auto md:mx-0 lg:mx-0'
                  alt='logo'
                />
              </div>
            </Link>
            <div className='m-[10px]  text-justify text-[16px] leading-[25px] text-white'>
              OHM WholeSale – We are an authorized wholesale distributor of
              Youcan, Afghan Hemp and Honey Dew based in Connecticut.
            </div>
            <div className='flex cursor-pointer gap-5 py-[10px]'>
              <Image
                src={FB}
                height='25px'
                width='25px'
                alt='Facebook'
                className=' object-contain sm:mx-auto '
              />
              <Image
                src={Instagram}
                height='25px'
                width='25px'
                alt='Instagram'
                className='  object-contain '
              />
              <Image
                src={Twitter}
                height='25px'
                width='25px'
                alt='Twitter'
                className='  object-contain '
              />
              <Image
                src={Youtube}
                height='25px'
                width='25px'
                alt='Youtube'
                className='  object-contain '
              />
            </div>
          </div>

          <div className='mt-10 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0'>
            <div className=' mb-5  text-[21px]   leading-[1.3rem] text-white '>
              Information
            </div>
            <ul className=' font-regular cursor-pointer px-0  text-[16px] leading-[1.3rem] text-white'>
              <Link href='/'>
                <div className='py-1'>Home</div>
              </Link>
              <Link href='/about'>
                <div className='py-1'>About</div>
              </Link>
              <Link href='/products'>
                <div className='py-1'>Products</div>
              </Link>
              <Link href='/contact'>
                <div className='py-1'>Contact</div>
              </Link>
            </ul>
          </div>

          <div className=' mt-10 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0 '>
            <div className=' mb-5  text-[21px]   leading-[1.3rem] text-white '>
              Quick links
            </div>
            <ul className=' font-regular cursor-pointer px-0  text-[16px] leading-[1.3rem] text-white'>
              <Link href='/products'>
                <div className='py-1'>All Products</div>
              </Link>
            </ul>
          </div>
          <div className=' mt-10 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0 '>
            <div className=' mb-5  text-[21px]   leading-[1.3rem] text-white '>
              Policy
            </div>
            <ul className=' font-regular cursor-pointer px-0  text-[16px] leading-[1.3rem] text-white'>
              <Link href='/terms'>
                <div className='py-1'>Terms Of Use</div>
              </Link>
            </ul>
            <ul className=' font-regular cursor-pointer px-0  text-[16px] leading-[1.3rem] text-white'>
              <Link href='/policy'>
                <div className='py-1'>Privacy Policy</div>
              </Link>
            </ul>
          </div>

          <div className='mt-10 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0 '>
            <div className=' mb-5   text-[21px]   leading-[1.3rem] text-white '>
              Address
            </div>
            <ul className=' font-regular -mt-4 px-0  text-[16px] leading-[1.3rem] text-white '>
              <li className='flex items-center gap-2 py-2'>
                <div className='h-[35px] w-[35px] rounded-full border border-white p-1'>
                  <Image src={locationIcon} alt='location' />
                </div>
                <span className='mt-5'>
                  846 Wolcott, Waterbury,
                  <br /> 06705 Connecticut
                </span>
              </li>
              <li className='flex items-center gap-2 py-2'>
                <div className='h-[35px] w-[35px] rounded-full border border-white p-1'>
                  <Image src={emailIcon} alt='email' />
                </div>
                <span className=' text-[17px]'> ohmwholesales@gmail.com</span>
              </li>
              <li className='flex items-center gap-2 py-2'>
                <div className='h-[35px] w-[35px] rounded-full border border-white p-1'>
                  <Image src={phoneIcon} alt='phone' />
                </div>
                <span>+1 (203) 725-5206 / +1 (203) 217-6815</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <BottomFooter />
    </div>
  );
};

export default Footer;
