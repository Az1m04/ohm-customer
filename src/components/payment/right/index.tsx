import { useAtom } from 'jotai';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useGetCart } from '@/hooks/cart/query';

import { cartData } from '@/store/cart';
import { currentUsers } from '@/store/users';

import { currencyFormatter } from '@/utils/apiUtils';

function RightSide({ step }) {
  const [discountCode, setDiscountCode] = useState('');
  const [amount, setAmount] = useState([]);
  const [getUser, setUser] = useAtom(currentUsers);

  const [cartItems, setCartItem] = useAtom(cartData);
  const [isDisabled, setDisabled] = useState(false);
  const cartProduct: any = useGetCart(cartItems);

  const paymentCart = cartProduct?.data?.cartData?.[0]?.items;

  const myFunction = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (discountCode.length > 0) {
      toast.success('Discount Code applied');
      setDiscountCode('');
      localStorage.setItem('discountCode', JSON.stringify(discountCode));

      setDisabled(true);
    } else {
      toast.error('discount code not found');
    }
  };

  console.log(cartProduct?.data?.cartData?.[0]?.user);

  useEffect(() => {
    setAmount(cartProduct?.data?.cartData?.[0]?.items);
  }, [cartProduct?.data?.cartData?.[0]?.items]);

  // const getPrice = (val: any) => {
  //   if (val?.retailer_price) {
  //     return val?.retailer_price;
  //   }
  //   if (val?.wholesaler_price) {
  //     return val?.wholesaler_price;
  //   }
  //   if (val?.distributor_price) {
  //     return val?.distributor_price;
  //   }
  //   if (val?.myPrice) {
  //     return val?.myPrice;
  //   }
  // };

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
  return (
    <div className='my-8  px-4 md:px-8 lg:mt-10  '>
      <div className=' w-full overflow-x-auto '>
        <table className='  w-full border text-center '>
          <thead className='border-b uppercase'>
            <tr>
              <th
                scope='col'
                className='font-strong rounded-tl-lg border-r bg-black px-6 py-4 font-sans text-[12px] font-bold text-[#ffffff]'
              >
                product
              </th>

              <th
                scope='col'
                className='font-strong border-r bg-black px-6 py-4 font-sans text-[12px] font-bold text-[#ffffff]'
              >
                Name
              </th>
              <th
                scope='col'
                className='font-strong border-r bg-black px-6 py-4 font-sans text-[12px] font-bold text-[#ffffff]'
              >
                SKU
              </th>
              <th
                scope='col'
                className='font-strong border-r bg-black px-6 py-4 font-sans text-[12px] font-bold text-[#ffffff]'
              >
                Quantity
              </th>
              <th
                scope='col'
                className='font-strong  rounded-tr-lg border-r bg-black px-6 py-4 font-sans text-[12px] font-bold text-[#ffffff] '
              >
                Price
              </th>
            </tr>
          </thead>
          {paymentCart?.length > 0 && (
            <tbody className='body'>
              {paymentCart?.map((item) => {
                return (
                  <tr className='border-b' key={item?._id}>
                    <td className='whitespace-nowrap border-r px-6 py-1 text-sm font-light text-gray-900'>
                      <Image
                        src={item?.product?.media?.[0]?.url}
                        alt={item?.product?.name}
                        height='50px'
                        width='50px'
                      />
                    </td>
                    <td className='truncate whitespace-nowrap border-r px-3 py-1 font-serif text-[13px] font-light capitalize  text-gray-900'>
                      {item?.product?.name}
                    </td>
                    <td className='truncate whitespace-nowrap border-r px-3  py-1 font-serif text-[13px] font-light text-gray-900'>
                      {item?.sku?.sku}
                    </td>
                    <td className='py-42font-serif whitespace-nowrap border-r px-1  text-[13px] font-light text-gray-900'>
                      {item?.quantity}
                    </td>

                    <td className='font-medium3text-gray-900 borde2-r whitespace-nowra1 px-3 py-4 text-sm'>
                      {currencyFormatter?.format(
                        getPrice(
                          cartProduct?.data?.cartData?.[0]?.user?.role,
                          item?.sku?.price
                        )
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>

      {/* <div className='flex items-center gap-5 border-y border-y-[#666665] py-8'>
        <input
          className=' h-[45px] w-full  rounded-xl border border-gray-300 bg-transparent  px-[10px] text-sm uppercase text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
          type='discountCode'
          name='discountCode'
          placeholder='Discount Code'
          value={discountCode}
          onChange={(event: any) => {
            setDiscountCode(event?.target?.value);
          }}
        />
        <button
          onClick={myFunction}
          disabled={isDisabled}
          // className='rounded bg-gray-400 px-[15px] py-[8px]'
          // eslint-disable-next-line react/jsx-no-duplicate-props
          className={` ${
            discountCode?.length > 0
              ? !isDisabled && 'bg-[#009E60]'
              : !isDisabled && 'bg-[#ACACAA] text-white opacity-60'
          } h-[45px]  w-[150px] rounded-xl  px-[15px]  py-[9px] text-center text-[16px] font-medium text-white`}
        >
          Apply
        </button>
        <ToastContainer />
      </div> */}
      <div className='mt-4 text-[#333333]'>
        <div className='flex items-center justify-between '>
          {' '}
          <div className=' w-[150px] text-left text-[20px]'>Subtotal</div>
          <div className='text-right text-[20px]'>
            {currencyFormatter?.format(
              amount?.reduce((sum: any, i: any) => {
                return (
                  sum +
                  getPrice(
                    cartProduct?.data?.cartData?.[0]?.user?.role,
                    i?.sku?.price
                  ) *
                    i?.quantity
                );
              }, 0)
            )}
          </div>
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <div className=' w-[150px] pb-5   text-left text-[20px]'>
            Shipping
          </div>
          <div className=' pb-5 text-right text-[20px]'>
            {step >= 1 ? 'Free' : 'calculated at next step'}
          </div>
        </div>

        <div className='flex items-center  justify-between border-t'>
          <div className=' w-[150px]  pt-5  text-left text-[20px]'>Total</div>
          <div className='   pt-5 text-right text-[20px]'>
            USD{' '}
            <span className='text-[22px] font-semibold'>
              {currencyFormatter?.format(
                amount?.reduce((sum: any, i: any) => {
                  return (
                    sum +
                    getPrice(
                      cartProduct?.data?.cartData?.[0]?.user?.role,
                      i?.sku?.price
                    ) *
                      i?.quantity
                  );
                }, 0)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSide;
