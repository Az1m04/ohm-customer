import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

import { useGetOrder, useGetUserOrderItems } from '@/hooks/order/query';

import Loading from '@/components/loading';

import { orderData } from '@/store/order';

import { currencyFormatter } from '@/utils/apiUtils';

import InvoicePrint from '../invoicePrint';

const Order = () => {
  const [orderItems] = useAtom(orderData);

  const order: any = useGetOrder(orderItems);

  const userOrder: any = useGetUserOrderItems({});
  const orderedItems = userOrder?.data?.usersOrder;
  const componentRef: any = useRef();

  const router = useRouter();

  return (
    <div className='cart container mx-auto my-[95px] mt-[200px] max-w-screen-xl'>
      {order?.isLoading ? (
        <div className='mt-[80px] h-[100vh] w-full items-center'>
          <Loading />
        </div>
      ) : (
        <div className='mb-[60px  mt-[60px]'>
          {' '}
          <div className=' w-full overflow-x-auto shadow-xl '>
            <div className='inline-block  w-full py-2  '>
              <table className='  w-full border text-center '>
                <thead className='border-b uppercase'>
                  <tr>
                    <th
                      scope='col'
                      className='font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff]'
                    >
                      Order ID
                    </th>
                    <th
                      scope='col'
                      className='font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff]'
                    >
                      Company Name
                    </th>
                    {/* 
                    <th
                      scope='col'
                      className='font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff]'
                    >
                      Product Price
                    </th>
                    <th
                      scope='col'
                      className='font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff]'
                    >
                      Product Quantity
                    </th> */}

                    <th
                      scope='col'
                      className='font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff]'
                    >
                      Order Status
                    </th>

                    <th
                      scope='col'
                      className='  font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff] '
                    >
                      Order Created at
                    </th>
                    <th
                      scope='col'
                      className='  font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff] '
                    >
                      Sub Total
                    </th>
                    <th
                      scope='col'
                      className='  font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff] '
                    >
                      Tax
                    </th>
                    <th
                      scope='col'
                      className='  font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff] '
                    >
                      Total Price
                    </th>
                    <th
                      scope='col'
                      className='  font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff] '
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                {orderedItems
                  // ?.filter((items: any) => items?.status !== 'delivered')
                  ?.map((item: any) => {
                    return (
                      <tr className='border-b' key={item?.id}>
                        <td className=' border-r px-6 py-4 text-sm font-light text-gray-900'>
                          {item?.orderId}
                        </td>

                        <td className='  border-r px-6 py-4 font-serif text-[16px] font-light text-gray-900'>
                          <div className=''>
                            <div
                              className='cursor-pointer py-[15px] font-sans capitalize text-green-800'
                              key={item?._id}
                              // onClick={() => {
                              //   router.push(
                              //     `/products/viewproduct?productId=${item?.productData?.product?._id}`
                              //   );
                              // }}
                            >
                              {item?.user?.companyName}
                            </div>
                          </div>
                        </td>

                        {/* <td className=' border-r px-6 py-4 font-serif  text-[16px] font-light text-gray-900 '>
                          <div className=''>
                            <div
                              className='py-[15px] font-sans capitalize text-black'
                              key={item?._id}
                            >
                              {currencyFormatter?.format(
                                item?.productData?.price
                              )}
                            </div>
                          </div>
                        </td>
                        <td className='whitespace-nowrap border-r px-6 py-4 text-[16px] font-medium capitalize text-gray-900'>
                          {item?.productData?.quantity}
                        </td> */}

                        <td className='whitespace-nowrap border-r px-6 py-4 text-[16px] font-medium capitalize text-gray-900'>
                          {item.status}
                        </td>

                        <td>{dayjs(item?.createdAt).format('YYYY-MM-DD')}</td>
                        <td className='whitespace-nowrap border-l px-6 py-4 text-[16px] font-medium capitalize text-gray-900'>
                          {currencyFormatter?.format(item.subTotal)}
                        </td>
                        <td className='whitespace-nowrap border-l px-6 py-4 text-[16px] font-medium capitalize text-gray-900'>
                          {currencyFormatter?.format(item.tax)}
                        </td>
                        <td className='whitespace-nowrap border-l px-6 py-4 text-[16px] font-medium capitalize text-gray-900'>
                          {currencyFormatter?.format(item.total)}
                        </td>
                        <td className='flex whitespace-nowrap border-l px-6 py-4 text-[16px] font-medium capitalize text-gray-900'>
                          <button
                            onClick={() => {
                              router.push('/orderDetails');
                              localStorage.setItem('productId', item?._id);
                            }}
                            className='mr-5 flex w-16 cursor-pointer justify-center rounded bg-black py-2 text-[15px] font-semibold text-white'
                          >
                            View
                          </button>
                          <ReactToPrint
                            trigger={() => (
                              <button className='flex w-16 cursor-pointer justify-center rounded bg-[#009E60] py-2 text-[15px] font-semibold  text-white hover:bg-[#178559]'>
                                Print
                              </button>
                            )}
                            content={() => componentRef.current}
                            pageStyle='60px'
                          />
                          <div style={{ display: 'none' }}>
                            <InvoicePrint ref={componentRef} orderData={item} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </table>
              {orderedItems?.length === 0 && (
                <div className='flex h-[60vh] w-full justify-center'>
                  <div className='  mx-auto  max-w-[400px] rounded  text-center  '>
                    <Image
                      src='/images/emptyState.png'
                      width='400px'
                      height='400px'
                      alt='no image found'
                      objectFit='contain'
                    />
                    <div className=' text-xl font-semibold text-gray-700'>
                      No Orders are placed yet
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
