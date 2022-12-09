/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { useAtom } from 'jotai';
import Link from 'next/link';
import React from 'react';

import Style from './index.module.css';

import { useGetProducts } from '@/hooks/products/query';

import { productDetails } from '@/store/products';
import { currentUsers } from '@/store/users';

import { currencyFormatter } from '@/utils/apiUtils';

function ProductCard({ imag, title, price, discount, id }: any) {
  const [getUser, setUser] = useAtom(currentUsers);
  const [getProduct, setProduct] = useAtom(productDetails);
  useGetProducts(setProduct);

  const getPrice = (role: any) => {
    switch (role) {
      case 'admin':
        return price.myPrice;

      case 'wholesaler':
        return price?.wholesaler_price;
      case 'retailer':
        return price.retailer_price;
      case 'distributor':
        return price.distributor_price;
    }
  };

  return (
    <Link href={`/products/viewproduct?productId=${id}`}>
      <div
        className={`${Style.products} flex h-[400px]  cursor-pointer flex-col items-center justify-center shadow-xl transition  delay-150 duration-300 ease-in-out sm:m-2 `}
        key={id}
        style={{ width: '48%', maxWidth: '300px' }}
      >
        {discount && (
          <div className='absolute mx-3 mt-3 rounded-full bg-[#2e2e2e] px-4 text-center text-white'>
            {discount}
          </div>
        )}

        <div
          className={`${Style.container}  flex h-[279px] w-[16rem] justify-center  p-10`}
        >
          {/* <div
            className={`${Style.options} absolute z-40  mt-5  ml-[120px] flex gap-2`}
          ></div> */}
          <img src={imag?.[0]?.url} alt={title} className={`${Style.image}`} />
          <div className={`${Style.overlay} `}>
            <div
              className={`${Style.text}  flex h-[279px] w-[16rem] justify-center p-10  `}
            >
              {imag?.[1]?.url && <img src={imag?.[1]?.url} alt={title} />}
            </div>
          </div>
        </div>

        <div className='mx-[5px] my-[20px] text-center'>
          <h2 className='overflow-hidden text-ellipsis text-[1rem] uppercase  text-[#000000]'>
            {title}
          </h2>

          {getUser?.data?._id ? (
            <div className='text-[16px] font-medium text-[#009E60]'>
              {getUser?.data?.userName
                ? currencyFormatter.format(getPrice(getUser?.data?.role))
                : 'Login to see the price'}
            </div>
          ) : (
            <div className='text-[16px] font-medium text-[#009E60]'>
              <Link href='/auth/login'>Login to see the price</Link>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
