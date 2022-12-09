import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

import { useGetSingleOrder } from '@/hooks/order/query';

import Account from '@/components/account';
import AccountSideNav from '@/components/accountSideNav';

import InvoicePrint from '../invoicePrint';
const data = [
  {
    id: 1,
    product: 'Black By OPMS - 5ct x 100',
    total: '	$2,175.00',
    tax: '	$0.00',
    status: 'Completed',
    line: '$2,175.00',
  },
  {
    id: 2,
    product: 'Black By OPMS - 5ct x 100',
    total: '	$2,175.00',
    tax: '	$0.00',
    status: 'Completed',
    line: '$2,175.00',
  },
  {
    id: 3,
    product: 'Black By OPMS - 5ct x 100',
    total: '	$2,175.00',
    tax: '	$0.00',
    status: 'Completed',
    line: '$2,175.00',
  },
  {
    id: 4,
    product: 'Black By OPMS - 5ct x 100',
    total: '	$2,175.00',
    tax: '	$0.00',
    status: 'Completed',
    line: '$2,175.00',
  },
];

const OrdersDetails = () => {
  const [orderData, setOrderData] = useState<any>([]);
  const id = localStorage.getItem('productId');
  const singleOrder = useGetSingleOrder();
  console.log('id :>> ', id);
  // const userOrder: any = useGetUserSingleOrderItems({
  //   pathParams: {
  //     id: id,
  //   },
  // });
  const getSingleShippingAddress = () => {
    singleOrder
      .mutateAsync({
        pathParams: {
          id,
        },
      })
      .then((res: any) => {
        console.log('res', res);
        setOrderData(res?.order);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log('orderData :>> ', orderData);
  useEffect(() => {
    getSingleShippingAddress();
  }, []);
  const componentRef: any = useRef();

  const router = useRouter();
  return (
    <>
      <div className='   mt-10 px-4 md:mx-2 md:mt-56 lg:mx-8 lg:mt-36 xl:mx-[90px] xl:mt-[150px]  2xl:mx-[180px]   '>
        <Account heading='Orders Details' />
        <div className='mb-20 md:flex  lg:space-x-6'>
          <div className='mt-10  rounded border'>
            {' '}
            <AccountSideNav />
          </div>

          <div className=' w-full md:ml-4 lg:mt-0'>
            <div className='mt-10 grid w-full gap-y-5 md:grid-cols-2 md:gap-x-8'>
              <div className=''>
                <div className='rounded-t bg-[#222222] px-2 py-1 text-[18px] font-semibold text-white'>
                  Shipping Address
                </div>
                <div className='ml-2'>
                  <div className='mt-4'>
                    <div> {orderData?.user?.companyName},</div>
                    {orderData?.address?.address_line_1},
                  </div>
                  <div>{orderData?.address?.city}</div>
                  <div>
                    {orderData?.address?.state_code},{' '}
                    <span>{orderData?.address?.postal_code}</span>
                  </div>
                </div>
              </div>
              <div className=''>
                <div className='rounded-t bg-[#222222] px-2 py-1 text-[18px] font-semibold text-white'>
                  Billing Address
                </div>
                <div className='ml-2'>
                  <div className='mt-4'>
                    <div> {orderData?.user?.companyName},</div>
                    {orderData?.user?.address?.address_line_1},
                  </div>
                  <div>{orderData?.user?.address?.city}</div>
                  <div>
                    {orderData?.user?.address?.state_code},{' '}
                    <span>{orderData?.user?.address?.postal_code}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='ml-2 mt-5 text-3xl'>
              Order #{orderData?.orderId}
            </div>
            <div className='ml-2 mt-2 '>
              Order #{orderData?.orderId} was placed on{' '}
              {orderData?.updatedAt?.slice(0, 10)} and is currently{' '}
              {orderData?.status}.
            </div>
            <div className='ml-2 mt-5 text-3xl'>Order Note</div>
            <div className='mt-2 ml-2 border border-l-4 border-l-red-500 p-4'>
              {orderData?.paymentDetails?.notes || 'N/A'}
            </div>
            <div className='ml-2 mt-10 text-3xl'>Order Details</div>
            <div className='  mt-10 w-full overflow-x-auto rounded-t-md'>
              <table className='min-w-full rounded-md'>
                <thead className='border-b bg-white'>
                  <tr className='bg-[#222222] pl-4 font-bold text-white'>
                    <th
                      scope='col'
                      className=' py-4 pl-6 text-left text-sm font-medium '
                    >
                      S.no
                    </th>
                    <th
                      scope='col'
                      className=' py-4 pl-6 text-left text-sm font-medium '
                    >
                      Items
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-left text-sm font-medium '
                    >
                      Qty
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-left text-sm font-medium '
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-left text-sm font-medium '
                    >
                      Tax
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-left text-sm font-medium '
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                {orderData?.productData?.map((item, index) => {
                  return (
                    <tbody key={item.id}>
                      <tr
                        className={
                          index % 2 === 0
                            ? `border-b bg-gray-100 hover:bg-gray-300`
                            : `border-b bg-white hover:bg-gray-300`
                        }
                      >
                        <td className='cursor-pointer whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 '>
                          {index + 1}
                        </td>
                        <td className='cursor-pointer whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 '>
                          {item?.sku}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                          {item?.quantity}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                          ${item?.price}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                          $
                          {orderData?.address?.state_code === 'Connecticut'
                            ? (
                                (item?.product?.category.tax / 100) *
                                item?.price
                              ).toFixed(2)
                            : 0}
                        </td>

                        <td className='grid grid-cols-2 gap-x-2  whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900'>
                          $
                          {(item?.product?.category.tax / 100) * item?.price +
                            item?.price}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <div className='mt-7 flex flex-row justify-end'>
                <div className='ml-1 text-lg font-medium'>Total: </div>
                <div className='ml-1 text-lg font-medium'>
                  {' '}
                  ${orderData?.total}
                </div>
              </div>
            </div>
            {orderData?.paymentDetails ? (
              <div>
                <div className=' flex w-full justify-center bg-gray-100 py-4 font-bold hover:bg-gray-300'>
                  <span>Items Subtotal:</span>{' '}
                  <span> &nbsp; &nbsp; ${orderData?.subTotal}</span>
                </div>
                <div className=' flex  justify-center py-4 font-bold hover:bg-gray-300'>
                  <span>Total CT Vape Tax:</span>{' '}
                  <span> &nbsp; &nbsp; ${orderData?.tax.toFixed(2)}</span>
                </div>
                <div className=' flex  justify-center bg-green-100 py-4 font-bold hover:bg-gray-400'>
                  <span>Amount Left:</span>{' '}
                  <span>
                    {' '}
                    &nbsp; &nbsp; $
                    {orderData?.paymentDetails?.payableAmount?.toFixed(2)}
                  </span>
                </div>
                {/* <div className=' flex justify-center bg-gray-100 py-4 font-bold hover:bg-gray-300'>
                  <span>Shipping:</span>{' '}
                </div> */}
                <div className=' flex justify-center  py-4 font-bold hover:bg-gray-300'>
                  <span>Payment method: </span>{' '}
                  <span> &nbsp; &nbsp;{orderData?.type}</span>
                </div>
                <div className=' flex justify-center bg-[#F2E7C3] py-4 font-bold hover:bg-gray-300'>
                  <span>Total: </span>{' '}
                  <span> &nbsp; &nbsp; ${orderData?.total}</span>
                </div>
              </div>
            ) : (
              <div className='my-10 flex justify-center text-[20px] font-semibold'>
                {' '}
                <div>No pament details! </div>
              </div>
            )}
            <ReactToPrint
              trigger={() => (
                <div className='mt-4 flex w-28 cursor-pointer justify-center rounded bg-gray-500 py-2 font-semibold text-white hover:bg-[#009E60]'>
                  Print Invoice
                </div>
              )}
              content={() => componentRef.current}
              pageStyle='60px'
            />
            <div style={{ display: 'none' }}>
              <InvoicePrint ref={componentRef} orderData={orderData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersDetails;
