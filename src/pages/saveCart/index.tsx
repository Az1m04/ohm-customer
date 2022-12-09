import { useAtom } from 'jotai';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { useDeleteToCart, useUpdateToCart } from '@/hooks/cart/mutation';
import { useGetCart } from '@/hooks/cart/query';

import Account from '@/components/account';
import AccountSideNav from '@/components/accountSideNav';

import { cartData } from '@/store/cart';
import { currentUsers } from '@/store/users';

import { currencyFormatter } from '@/utils/apiUtils';

import cross from '../../assets/img/cross.png';

const data = [];

const SavedCart = () => {
  const cartProduct: any = useGetCart([]);
  const [cartItems, setCartItem] = useAtom(cartData);
  const [amount, setAmount] = useState([]);
  const [getUser] = useAtom(currentUsers);
  const [removeCartModal, setRemoveCartModal] = useState({
    show: false,
    id: '',
  });
  useEffect(() => {
    setAmount(cartProduct?.data?.cartData?.[0]?.items);
  }, [cartProduct?.data?.cartData?.[0]?.items]);
  console.log('cartProduct?.isFetching', cartProduct?.isFetching);

  const deleteCart = useDeleteToCart();
  const deleteToCart = (val: any) => {
    deleteCart
      ?.mutateAsync({
        pathParams: { productId: val },
      })
      .then((res: any) => {
        setCartItem(amount);
      });
  };
  const getPrice = (role: any, price: any) => {
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
  const updateCart = useUpdateToCart();
  const updateCartItem = (val_id: any, val: any) => {
    updateCart
      ?.mutateAsync({
        pathParams: { productId: val_id },
        body: { quantity: val },
      })
      .then((res: any) => {
        res;
      });
  };
  const userName = getUser?.data?.userName;
  console.log('cartProduct :>> ', cartProduct);
  return (
    <>
      <div className='   mt-10 px-4 md:mx-6 md:mt-56 lg:mx-8 lg:mt-36 xl:mx-[90px] xl:mt-[150px]  2xl:mx-[180px]   '>
        <Account heading='Subaccounts' />
        <div className='mb-16 md:flex lg:space-x-6'>
          <div className='mt-10  rounded border'>
            {' '}
            <AccountSideNav />
          </div>
          <div className='mt-10 w-full md:w-[450px] lg:w-[650px] xl:w-[850px]  2xl:w-[1300px]'>
            {amount?.length > 0 ? (
              <div className='    overflow-x-auto rounded-md '>
                <table className=' rounded-md'>
                  <thead className='border-b bg-gray-800 font-bold text-white'>
                    <tr>
                      <th scope='col' className=' px-4 py-4 text-left   '>
                        Product
                      </th>

                      <th scope='col' className='px-6 py-4 text-left   '>
                        Attribute Value
                      </th>
                      <th scope='col' className='px-6 py-4 text-left  '>
                        Price
                      </th>

                      <th scope='col' className='px-6 py-4 text-left  '>
                        Quantity
                      </th>
                      <th scope='col' className='px-6 py-4 text-left  '>
                        Total
                      </th>
                      <th scope='col' className='px-6 py-4 text-left  '>
                        Remove
                      </th>
                    </tr>
                  </thead>

                  {amount?.length > 0 && (
                    <tbody>
                      {amount?.map((item: any) => {
                        // console.log(amount, 'cartProduct');
                        if (item?.product?.isActive === true) {
                          return (
                            <tr className='' key={item?._id}>
                              <td>
                                <div className='flex justify-start'>
                                  <div className='grid h-20 w-[100px] place-items-center  pl-4'>
                                    <Image
                                      src={item?.product?.media?.[0]?.url}
                                      alt=''
                                      height={105}
                                      width={105}
                                    />
                                  </div>
                                  <div className='namePrice  '>
                                    <div className='name grid h-20 place-items-center'>
                                      <h1 className=' px-5 font-sans text-[16px] text-[#009e60]'>
                                        {item?.product?.name}
                                      </h1>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className='whitespace-nowrap border-r border-l px-6 py-4 text-[15px]  font-medium  text-[#838383]'>
                                {item?.sku?.attributesVal}
                              </td>
                              <td className='whitespace-nowrap border-r px-6 py-4 text-[15px]  font-medium  text-[#838383]'>
                                {/* {currencyFormatter?.format(
                                      item?.data?.variants?.[0]?getPrice(price)
                                    )}  */}
                                {currencyFormatter?.format(
                                  getPrice(
                                    getUser?.data?.role,
                                    item?.sku?.price
                                  )
                                )}
                              </td>

                              <td className='whitespace-nowrap border-r px-2 py-4 font-serif text-[20px]  font-light text-[#838383] md:px-6'>
                                <input
                                  className='  mt-[5px] h-[50px] w-20  rounded-xl border border-gray-300  bg-transparent  text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                                  type='number'
                                  name='myText'
                                  min={1}
                                  defaultValue={item?.quantity}
                                  onChange={(e: any) => {
                                    if (e.target.value) {
                                      setAmount((prev: any) =>
                                        prev.map((data: any) =>
                                          data?._id === item?._id
                                            ? {
                                                ...data,
                                                quantity: e.target.value,
                                              }
                                            : data
                                        )
                                      );
                                      updateCartItem(item?._id, e.target.value);
                                    }
                                  }}
                                />
                              </td>
                              {amount?.length > 0 && (
                                <td className='border-r px-6 py-4 text-[15px]  font-medium  text-[#838383]'>
                                  {currencyFormatter?.format(
                                    item?.quantity *
                                      getPrice(
                                        getUser?.data?.role,
                                        item?.sku?.price
                                      )
                                  )}
                                </td>
                              )}

                              <td className='border-r px-6 py-4 font-serif  text-[16px] font-light text-gray-900'>
                                <div className='cursor-pointer'>
                                  {removeCartModal?.show &&
                                  removeCartModal?.id === item?._id ? (
                                    <div className='absolute right-8 z-10  rounded-md border bg-white px-5 shadow-lg'>
                                      <div className='flex flex-row'>
                                        <div className='text-tiny'>
                                          Are you sure you want to remove this
                                          item?
                                        </div>
                                      </div>
                                      <div className='my-2 flex flex-row'>
                                        <button
                                          className='focus:shadow-outline rounded-md border  border-[#009e60] px-3    focus:outline-none'
                                          onClick={() => {
                                            deleteToCart(item?._id);
                                          }}
                                        >
                                          Yes
                                        </button>
                                        <button
                                          className='ml-5 rounded-md border border-red-600 px-3'
                                          onClick={() => {
                                            setRemoveCartModal({
                                              ...removeCartModal,
                                              show: false,
                                            });
                                          }}
                                        >
                                          No
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <div></div>
                                  <Image
                                    src={cross}
                                    alt=''
                                    height={15}
                                    width={15}
                                    onClick={() => {
                                      setRemoveCartModal({
                                        show: true,
                                        id: item?._id,
                                      });
                                      // deleteToCart(item?._id);
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  )}
                </table>
              </div>
            ) : (
              <div>
                <div className='ml-10 overflow-x-auto rounded-t-md md:w-[360px] lg:ml-0 lg:w-full'>
                  <table className='min-w-full rounded-md'>
                    <thead className='border-b bg-gray-800 font-bold text-white'>
                      <tr>
                        <th scope='col' className=' px-4 py-4 text-left   '>
                          ID #
                        </th>
                        <th scope='col' className='px-6 py-4 text-left  '>
                          Cart Name
                        </th>
                        <th scope='col' className='px-6 py-4 text-left   '>
                          Cart Items
                        </th>
                        <th scope='col' className='px-6 py-4 text-left  '>
                          Creted On
                        </th>

                        <th scope='col' className='px-6 py-4 text-left  '>
                          Actions
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className='ml-10 flex  justify-center rounded-b-md bg-gray-500 font-semibold text-white md:w-[360px] lg:ml-0 lg:w-full'>
                  <div className='p-10'>No cart data found.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedCart;
