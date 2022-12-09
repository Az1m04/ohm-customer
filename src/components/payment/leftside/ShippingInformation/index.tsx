import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { useGetCart } from '@/hooks/cart/query';
import { useAddToOrder } from '@/hooks/order/mutation';

import { cartData } from '@/store/cart';
import { orderData } from '@/store/order';
import { currentUsers, userDetail } from '@/store/users';

import { queryClient } from '@/pages/_app';

const ShippingInformation = ({ setStep, setData, data }) => {
  const router = useRouter();
  const [getUser, setUser] = useAtom(currentUsers);
  const [orderItems, setOrderItems] = useAtom(orderData);
  const [cartItems, setCartItems] = useAtom(cartData);
  const [updateShippingBillingAddress, setUpdateShippingBillingAddress] =
    useState<any>({});

  const [enable, setEnable] = useState<any>(false);
  const [orderId, setOrderId] = useState(false);
  const [checked, setChecked] = useState(false);
  const [paymentSelected, setPaymentSelected] = useState('select');

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
  console.log(paymentSelected, 'paymentSelected');

  const addOrder = useAddToOrder();

  const cartProduct: any = useGetCart(cartItems);
  const [_, setUserDetails] = useAtom(userDetail);

  useEffect(() => {
    if (data)
      setUpdateShippingBillingAddress({
        address: enable ? getUser?.data?.address : data?.address,
      });
    return () => {};
  }, [data?.address?.state, enable]);

  console.log('data', updateShippingBillingAddress, enable);

  const addToOrders = (val: any) => {
    const productData = cartProduct.data?.cartData?.[0]?.items?.map((item) => {
      const body = {
        productId: item?.productId,
        sku: item?.sku?.sku,
        price: getPrice(getUser?.data?.role, item?.sku?.price),
        quantity: item?.quantity,
        category: item?.product?.category,
        cartId: item?.cartId,
        uniqueId: item?._id,
      };

      return body;
    });

    if (paymentSelected !== 'select') {
      addOrder
        ?.mutateAsync({
          pathParams: { id: getUser?.data?._id },
          body: {
            productData,
            address: {
              address_line_1:
                updateShippingBillingAddress?.address?.address_line_1,
              state_code:
                updateShippingBillingAddress?.address?.state ||
                updateShippingBillingAddress?.address?.state_code,
              city: updateShippingBillingAddress?.address?.city,
              postal_code:
                updateShippingBillingAddress?.address?.zip?.toString() ||
                updateShippingBillingAddress?.address?.postal_code,
            },
            paymentmethod: data?.paymentMethod,
            type: 'online',
          },
        })
        .then((res: any) => {
          console.log('res1', res);
          setUserDetails(res);
          queryClient.setQueryData('', () => {
            return setOrderItems({
              ...res,
            });
          });
          setOrderId(true);
          toast.success('item ordered successfully');
          setTimeout(() => {
            setStep((prev) => prev + 1);
          }, 2000);
        })

        .catch((err) => {
          console.log('err3', err.response);
          toast.error(`${err?.response?.data?.error?.message}`);
        });
    } else {
      toast.error('Please select a payment Method');
    }
  };

  return (
    <div className='px-32'>
      {/* left */}
      <ToastContainer />

      <div className='     '>
        <div className='mt-4  w-full  justify-between rounded-md border   border-gray-300   px-[10px] text-md  text-gray-900'>
          {/* <div className='flex  justify-between border-b p-4'>
            <div className='  flex w-full items-center'>
              {' '}
              <div className=' text-left text-[16px] text-gray-500'>
                Contact
              </div>
              <div className=' ml-8 text-[16px]  '>
                {data?.phone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ||
                  data?.mobilePhone
                    ?.toString()
                    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
              </div>
            </div>
          </div> */}

          <div className='flex items-center justify-between  border-b  p-4'>
            <div className=' flex w-full items-center'>
              <div className='text-left text-[16px]'>Ship to</div>
              <div className='ml-10   text-[16px] '>
                {updateShippingBillingAddress?.address?.address_line_1},{' '}
                {updateShippingBillingAddress?.address?.city},{' '}
                {updateShippingBillingAddress?.address?.state_code ||
                  updateShippingBillingAddress?.address?.state}
                ,{' '}
                {updateShippingBillingAddress?.address?.zip ||
                  updateShippingBillingAddress?.address?.postal_code}
                , USA
              </div>
            </div>
          </div>
          <div className='flex  justify-between   p-4'>
            <div className='flex w-full items-center'>
              {' '}
              <div className='  text-[16px] text-gray-500'>Method</div>
              <div className=' ml-10 text-[16px]  '>Standard</div>
            </div>
            <div></div>
          </div>
        </div>
        <div className='mt-4 h-12 '>
          <p>Payment</p>
          <p className='text-gray-500'>
            All transactions are secure and encrypted
          </p>
        </div>
        <div className=' mt-2'>
          <div className=' w-full'>
            <select
              className='mt-[5px] h-[50px] w-full rounded-xl border border-green-600 bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
              id='pack'
              name='paymentMethod'
              placeholder='select pack'
              onChange={(e) => {
                setPaymentSelected(e.target.value);
                setData({ ...data, paymentMethod: e.target.value });
              }}
            >
              <option value='Select'>Select payment method</option>
              <option value='Credit card on phone'>Credit card on phone</option>
              <option value='Pay by phone'>Pay by phone</option>
            </select>
          </div>
        </div>
        <div className='mt-4 h-12 '>
          <p>Billing address</p>
          <p className='text-gray-500'>
            Select the address that matches your card or payment method
          </p>
        </div>
        <div className='mt-4    w-full grid-cols-2 justify-between divide-y rounded-md border border-gray-300 bg-transparent  px-[10px] text-md  text-gray-900'>
          <div className=' flex items-center p-4 '>
            <input
              type='radio'
              checked={enable}
              onClick={() => {
                setEnable(!enable);
                // setData((prev) => ({
                //   ...prev,
                //   billAddress: data?.Address,
                // }));
              }}
            />
            <div className='  ml-2 text-[16px]'>
              Same as shipping address as billing address
            </div>
          </div>
        </div>
        <div className='mt-5'>
          {/* <button
            onClick={() => addToOrders(orderItems)}
            className=' h-[60px]  w-[200px] rounded-xl  bg-[#009E60] px-[15px]  py-[9px] text-center text-[16px] font-medium text-white'
          >
            {addOrder?.isLoading ? (
              <>
                <div className=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    style={{
                      margin: 'auto',
                      background: 'transparent',
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
                      stroke='white'
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
              </>
            ) : (
              <>Complete Order</>
            )}
          </button> */}

          {/* <button
            className=' mt-2 ml-4 cursor-pointer text-[#009E64]'
            onClick={() => setStep((prev) => prev - 1)}
          >
            Return to shipping
          </button> */}

          <div className='mt-6 flex items-center'>
            <button
              onClick={() => addToOrders(orderItems)}
              className='mr-4 flex w-36 cursor-pointer justify-center rounded bg-[#009E60] py-2 text-white hover:bg-gray-700'
            >
              {addOrder?.isLoading ? (
                <>
                  <div className=''>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      style={{
                        margin: 'auto',
                        background: 'transparent',
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
                        stroke='white'
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
                </>
              ) : (
                <>Complete Order</>
              )}
            </button>
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className=' flex w-36 cursor-pointer justify-center rounded bg-gray-700 py-2 text-white hover:bg-[#009E60]'
            >
              Return to shipping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInformation;
