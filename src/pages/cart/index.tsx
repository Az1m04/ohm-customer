/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useDeleteToCart, useUpdateToCart } from '@/hooks/cart/mutation';
import { useGetCart } from '@/hooks/cart/query';

import Loading from '@/components/loading';

import { cartData } from '@/store/cart';
import { currentUsers } from '@/store/users';

import { currencyFormatter } from '@/utils/apiUtils';

import cross from '../../assets/img/cross.png';
import emptyState from '../../assets/img/emptyState.png';
import SaveCardData from '../../components/saveCardData';

const Cart = () => {
  const [cartItems, setCartItem] = useAtom(cartData);
  const cartProduct: any = useGetCart(cartItems);
  const [amount, setAmount] = useState([]);
  const [getUser] = useAtom(currentUsers);
  const [removeCartModal, setRemoveCartModal] = useState({
    show: false,
    id: '',
  });
  console.log('cartItems', cartItems);

  useEffect(() => {
    setAmount(cartProduct?.data?.cartData?.[0]?.items);
  }, [cartProduct?.data?.cartData?.[0]?.items]);

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

  const activeQuantity = amount?.every((item: any) => item.quantity > 0);

  console.log(amount, 'activeQuantity');
  return (
    <div className='cart my-[95px] mx-40 flex items-center justify-center xxs:mx-auto  xxs:mt-[20px] xs:mx-auto sm:mx-auto sm:mt-[200px] md:container md:mx-auto '>
      {cartProduct?.isLoading ? (
        <div className=' mt-[80px] h-[100vh] w-full items-center xxs:mt-0'>
          <Loading />
        </div>
      ) : (
        <div className='mx-4 mt-[130px] w-full xxs:mt-[0px]'>
          <>
            {userName && (
              <>
                {' '}
                <div className=' w-full overflow-x-auto shadow-xl '>
                  <div className='flex flex-col items-center justify-center pb-10 '>
                    <SaveCardData
                      cardDetail={amount}
                      currencyFormatter={currencyFormatter}
                      getPrice={getPrice}
                      getUser={getUser}
                      setAmount={setAmount}
                      updateCartItem={updateCartItem}
                      removeCartModal={removeCartModal}
                      deleteCart={deleteCart}
                      deleteToCart={deleteToCart}
                      setRemoveCartModal={setRemoveCartModal}
                    />
                  </div>
                  <table className='  hidden w-full rounded-md border text-center md:table '>
                    <thead className='border-b uppercase'>
                      <tr className=''>
                        <th
                          scope='col'
                          className='font-strong rounded-tl-lg border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff]'
                        >
                          Product
                        </th>

                        <th
                          scope='col'
                          className='font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff]'
                        >
                          Attribute Value
                        </th>
                        <th
                          scope='col'
                          className='font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff]'
                        >
                          Price
                        </th>

                        <th
                          scope='col'
                          className='font-strong border-r bg-black py-4  px-4 font-sans text-[16px] font-bold text-[#ffffff] md:px-6'
                        >
                          Quantity
                        </th>
                        <th
                          scope='col'
                          className='font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff]'
                        >
                          Total
                        </th>
                        <th
                          scope='col'
                          className='font-strong  rounded-tr-lg border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff] '
                        >
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

                                <td className='whitespace-nowrap border-r border-l px-6 py-4 text-left text-[15px]  font-medium  text-[#838383]'>
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
                                    value={item?.quantity}
                                    onChange={(e: any) => {
                                      if (e?.target?.value > item?.inventory) {
                                        alert(
                                          `You cannot add that amount of ${
                                            item.sku?.attributesVal
                                          } to the cart because there is not enough stock ${Math.abs(
                                            item?.inventory
                                          )}  remaining`
                                        );
                                        return false;
                                      } else if (
                                        e.target.value <= item.inventory
                                      ) {
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
                                        updateCartItem(
                                          item?._id,
                                          e.target.value
                                        );
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
                                          {deleteCart?.isLoading ? (
                                            <div className='focus:shadow-outline rounded-md border  border-[#009e60] px-3    focus:outline-none'>
                                              <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                                style={{
                                                  margin: 'auto',
                                                  background: 'white',
                                                  display: 'block',
                                                  shapeRendering: 'auto',
                                                }}
                                                width='30px'
                                                height='30px'
                                                viewBox='0 0 100 100'
                                                preserveAspectRatio='xMidYMid'
                                              >
                                                <circle
                                                  cx='50'
                                                  cy='50'
                                                  fill='none'
                                                  stroke='green'
                                                  strokeWidth='10'
                                                  r='35'
                                                  strokeDasharray='164.93361431346415 56.97787143782138'
                                                >
                                                  <animateTransform
                                                    attributeName='transform'
                                                    type='rotate'
                                                    repeatCount='indefinite'
                                                    dur='1s'
                                                    values='0 50 50;360 50 50'
                                                    keyTimes='0;1'
                                                  ></animateTransform>
                                                </circle>
                                              </svg>
                                            </div>
                                          ) : (
                                            <button
                                              className='focus:shadow-outline rounded-md border  border-[#009e60] px-3    focus:outline-none'
                                              onClick={() => {
                                                deleteToCart(item?._id);
                                              }}
                                            >
                                              Yes
                                            </button>
                                          )}

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
                  {amount?.length === 0 && (
                    <div className='flex h-[60vh] w-full justify-center'>
                      <div className='  mx-auto  max-w-[400px] rounded  text-center  '>
                        <Image
                          src={emptyState}
                          width='400px'
                          height='400px'
                          alt='no image found'
                          objectFit='contain'
                        />
                        <div className=' text-xl font-semibold text-gray-700'>
                          No products found
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className='w-full text-right '>
                  <div className='down1section w-full'>
                    {amount?.length > 0 && (
                      <h1 className='mt-4 font-sans text-2xl  font-semibold text-[#009e60]  md:text-[30px]'>
                        {' '}
                        Subtotal:&nbsp;
                        {currencyFormatter?.format(
                          amount?.reduce((sum: any, i: any) => {
                            return (
                              sum +
                              getPrice(getUser?.data?.role, i?.sku?.price) *
                                i?.quantity
                            );
                          }, 0)
                        )}
                      </h1>
                    )}

                    <div className='text-[18px] italic'>
                      Shipping, taxes, and discounts will be calculated at
                      checkout.
                    </div>
                  </div>

                  <div className='linkSection mb-[32px] flex w-full items-stretch justify-end gap-5'>
                    <div className=' mt-[16px]  rounded-xl border-[2px] border-[#009e60]  py-[9px]  px-[15px] text-center text-[16px] font-semibold text-[#009e60] '>
                      <Link href='/products' passHref>
                        <span className='cursor-pointer'>
                          Continue Shopping
                        </span>
                      </Link>
                    </div>
                    {amount?.length > 0 && (
                      <div className=' mt-[16px] rounded-xl border-[px] border-[#009e60] bg-[#009e60] py-[9px]  px-[15px] text-center text-[16px] font-semibold text-[#f9fcfa]'>
                        <Link href='/payment' passHref>
                          <span className='cursor-pointer'>Check out Cart</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default Cart;
