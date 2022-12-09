/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Lottie from 'react-lottie';

import Style from './index.module.css';

import { useGetCart } from '@/hooks/cart/query';
import { useGetProducts } from '@/hooks/products/query';
import { useGetWishlist } from '@/hooks/wishlist/query';

import Card from '@/components/Card/Card';
import Card2 from '@/components/Card2/Card2';
import Carousel from '@/components/carousel';
import Loading from '@/components/loading';
import ServicesCard from '@/components/servicesCard';

import { cartData } from '@/store/cart';
import { categoryDetails } from '@/store/category';
import { productDetails } from '@/store/products';
import { wishListData } from '@/store/wishList';

import BestSelling from './BestSelling';
import NewArrivals from './NewArrivals';
import OhmCollections from './OhmCollections';
import animationData1 from '../../assets/Json/offer.json';
import animationData from '../../assets/Json/sale.json';
function Home() {
  const [getProduct, setProduct] = useAtom(productDetails);
  const { isLoading, data }: any = useGetProducts(setProduct);
  const [isBestSelling, setBestSelling] = useState('newarrival');
  const [cartItems, setCartItems] = useAtom(cartData);
  const [wishlistItems, setWishlistItems] = useAtom(wishListData);
  const cart: any = useGetCart(cartItems);
  const wishlist: any = useGetWishlist(wishlistItems);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,

    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: animationData1,

    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const productIdArr = cart?.data?.cartData?.[0]?.items?.map(
    (item) => item?.productId
  );

  const wishlistArray =
    wishlist?.data?.wishlistData?.[0]?.data?.[0]?.items?.map(
      (item) => item?.productId
    );

  const [getCategory, setCategory] = useAtom(categoryDetails);

  const categoryData = getCategory?.categoryData;
  return (
    <div
      className={`${
        categoryData?.length > 7 ? 'mt-[100px]' : ''
      } scroll-smooth`}
    >
      {isLoading ? (
        <div className='mt-[60px] h-[100vh] w-full items-center'>
          <Loading />
        </div>
      ) : (
        <div>
          <div className='container mx-auto mt-16   '>
            <div className='flex flex-col items-center justify-center gap-4 pt-5 md:flex-col lg:flex-col xl:flex-row'>
              <Carousel />

              <div className=' flex flex-col items-center  justify-between md:mt-6 md:flex-row lg:mt-0 lg:flex-col xl:mt-0 xl:flex-col'>
                <Card />

                <div className='mt-6 md:ml-6 md:mt-0 lg:ml-0 lg:mt-6 xl:ml-0 xl:mt-6'>
                  <Card2 />
                </div>
              </div>
            </div>
            <div className=' hidden flex-wrap justify-center py-16 md:flex '>
              {data?.productData
                ?.filter((item) => item.variants.length > 0)
                ?.slice(0, 12)
                ?.map((item: any) => {
                  if (item?.isActive === true) {
                    return (
                      <Link
                        href={`/products/viewproduct?productId=${item?._id}`}
                        key={item?._id}
                      >
                        <div
                          className={`m-[20px]   cursor-pointer  px-[40px] md:h-[250px] md:w-[250px] lg:h-[250px] lg:w-[250px] xl:h-[180px] xl:w-[180px] ${Style.circle}`}
                        >
                          <div className='mt-8 text-center xl:mt-4 xl:ml-0'>
                            <Image
                              objectPosition='center'
                              src={item?.media?.[0]?.url}
                              height='100px'
                              width='100px'
                              alt={item?.name}
                              objectFit='cover'
                            />
                            <div className='mt-2 w-[150x] truncate text-[14px]'>
                              {item?.name}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
            </div>
          </div>
          <div className='m-1 grid justify-center gap-4 py-[20px] lg:flex xl:flex   '>
            <button
              className={`h-[64px] cursor-pointer rounded-lg ${
                isBestSelling === 'newarrival'
                  ? 'bg-[#009E60] text-white'
                  : 'border-[#009E60]'
              } border px-[30px] py-[9px]  text-[18px] `}
              onClick={() => setBestSelling('newarrival')}
            >
              New Arrivals
            </button>{' '}
            <button
              className={`h-[64px] cursor-pointer rounded-lg border ${
                isBestSelling === 'bestselling'
                  ? 'bg-[#009E60] text-white'
                  : 'border-[#009E60]'
              } px-[30px] py-[9px] text-[18px]`}
              onClick={() => setBestSelling('bestselling')}
            >
              Best Selling Products
            </button>
          </div>
          {isLoading ? (
            <div className='mt-[60px] h-[100vh] w-full items-center'>
              <Loading />
            </div>
          ) : (
            <>
              {isBestSelling === 'newarrival' && (
                <div className='flex flex-wrap justify-center '>
                  <NewArrivals productDetails={data?.productData} />
                </div>
              )}
            </>
          )}
          {isLoading ? (
            <div className='mt-[60px] h-[100vh] w-full items-center'>
              <Loading />
            </div>
          ) : (
            <>
              {isBestSelling === 'bestselling' && (
                <div className='flex flex-wrap justify-center '>
                  <BestSelling productDetails={data?.productData} />
                </div>
              )}
            </>
          )}
          <div
            className='relative mt-10  hidden w-full justify-end pt-[40px] md:block md:h-[35vh]  lg:block lg:h-[33vh] xl:block xl:h-[30vh]'
            style={{
              backgroundImage: 'url(/images/bg.jpg) ',
              backgroundSize: 'cover',
              backgroundAttachment: `fixed`,
              backgroundPosition: `center`,
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className='  container absolute left-[50%] top-[28%] h-[250px] max-w-4xl  translate-x-[-50%] transform  rounded-[30px] border-r-[10px] border-l-[10px]  border-t-[10px]  border-[#fff] px-[40px]  py-16 text-[38px] font-bold text-white  '>
              <div className='absolute top-[-35%] right-0 hidden md:block '>
                <Lottie
                  className='object-cover '
                  height='250px'
                  width='250px'
                  options={defaultOptions}
                  isClickToPauseDisabled={true}
                />
              </div>
              Free Shipping <br /> For Order Over $ 700
            </div>
          </div>
          <div className=''>
            <div className=' w-full bg-[#EDFFF8] pt-[60px] '>
              <div className='text-center'>
                <div className='mt-[10px] text-[16px] text-[#009E60]'>
                  Awesome Shop
                </div>
                <h1 className='mt-[10px] text-[38px] text-[#494949]'>
                  OHM Collection
                </h1>
              </div>
              <div className=' mt-10 mb-20 flex w-full flex-col justify-center  gap-5   xl:container xl:mx-auto xl:flex-row'>
                <div className='flex w-full cursor-pointer  justify-center xl:justify-end'>
                  <Link
                    href={`/products/viewproduct?productId=${data?.productData?.[0]?._id}`}
                  >
                    <div
                      className={`${Style.container} max-h-[630px] max-w-[630px] cursor-pointer rounded-xl bg-white p-10`}
                    >
                      <div className='absolute left-0 top-0 z-10 mx-3  mt-3 rounded-full bg-[#2e2e2e] px-4 text-center text-white'>
                        Sale
                      </div>
                      <div className='absolute top-0 right-0 z-10  '>
                        <Lottie
                          className='object-cover '
                          height='100px'
                          width='100px'
                          options={defaultOptions1}
                          isClickToPauseDisabled={true}
                        />
                      </div>
                      <div className='relative h-[250px] w-[250px] md:h-[500px] md:w-[500px]'>
                        <Image
                          objectFit='contain'
                          layout='fill'
                          alt='product'
                          src={
                            data?.productData?.[0]?.media
                              ? data?.productData?.[0]?.media?.[0]?.url
                              : '/images/emptyState.png'
                          }
                          height='100%'
                          width='100%'
                          className={`${Style.image} transform transition   duration-500 hover:scale-110`}
                        />
                      </div>
                      <div className={`${Style.overlay} rounded-b-xl `}>
                        <div className={`${Style.text} uppercase`}>
                          {data?.productData?.[0]?.name}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='flex w-full'>
                  <div className='flex w-full cursor-pointer flex-wrap justify-center gap-5  xl:justify-start'>
                    {data?.productData
                      ?.filter((item) => item.variants.length > 0)

                      ?.slice(1, 4)
                      .map((item: any) => {
                        if (item?.isActive === true) {
                          return (
                            <OhmCollections
                              imag={
                                item?.media
                                  ? item.media?.[0]?.url
                                  : '/images/emptyState.png'
                              }
                              title={item?.name}
                              id={item?._id}
                              key={item?._id}
                            />
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
              <div className='flex w-full bg-white'>
                <div className='container mx-auto mt-16'>
                  <ServicesCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
