import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import { useGetUserOrderItems } from '@/hooks/order/query';

import Account from '@/components/account';
import AccountSideNav from '@/components/accountSideNav';

import { currencyFormatter } from '@/utils/apiUtils';

const Orders = () => {
  // const [orderItems,setOrderitems] = useAtom(orderData);

  // const order: any = useGetOrder(orderItems);

  const userOrder: any = useGetUserOrderItems({});
  const orderedItems = userOrder?.data?.usersOrder;
  const router = useRouter();
  console.log('userOrder', orderedItems);
  return (
    <>
      <div className='   mt-10 px-4 md:mx-6 md:mt-56 lg:mx-8 lg:mt-36 xl:mx-[90px] xl:mt-[150px]  2xl:mx-[180px]   '>
        <Account heading='My Orders' />
        <div className='mb-16 space-x-6 md:flex'>
          <div className='mt-10  rounded border'>
            {' '}
            <AccountSideNav />
          </div>
          <div className='  mt-10 w-full overflow-x-auto rounded-md'>
            <table className='min-w-full rounded-md'>
              <thead className='border-b bg-white'>
                <tr>
                  <th
                    scope='col'
                    className=' w-28 px-4 py-4 text-left text-sm font-medium text-gray-900'
                  >
                    #Order ID
                  </th>

                  <th
                    scope='col'
                    className='w-40 px-6 py-4 text-left text-sm font-medium text-gray-900'
                  >
                    Business Name
                  </th>

                  <th
                    scope='col'
                    className='w-40 px-6 py-4 text-left text-sm font-medium text-gray-900'
                  >
                    Order Status
                  </th>
                  <th
                    scope='col'
                    className='w-40 px-6 py-4 text-left text-sm font-medium text-gray-900'
                  >
                    Date
                  </th>
                  <th
                    scope='col'
                    className='w-30 px-6 py-4 text-left text-sm font-medium text-gray-900'
                  >
                    Sub Total
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                  >
                    Tax
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                  >
                    Total Price
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              {orderedItems
                // ?.filter((items: any) => items?.status !== 'delivered')
                ?.map((item: any, index) => {
                  console.log(item, 'item');
                  return (
                    <tr
                      className={
                        index % 2 === 0
                          ? `border-b bg-gray-100`
                          : `border-b bg-white`
                      }
                      key={item?.id}
                    >
                      <td className='  px-6     text-sm font-light text-gray-900'>
                        {item.orderId}
                      </td>

                      <td className='   px-6     font-serif text-[16px] font-light text-gray-900'>
                        <div className=''>
                          <div
                            className='cursor-pointer py-[15px] font-sans capitalize text-green-600'
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

                      <td className='  px-6     font-serif  text-[16px] font-light text-gray-900 '>
                        <div className=''>
                          <div
                            className='py-[15px] font-sans capitalize text-black'
                            key={item?._id}
                          >
                            {item?.status}
                          </div>
                        </div>
                      </td>

                      <td className='whitespace-nowrap    px-6     text-[16px] font-medium capitalize text-gray-900'>
                        {dayjs(item?.createdAt).format('YYYY-MM-DD')}
                      </td>
                      <td className='whitespace-nowrap    px-6     text-[16px] font-medium capitalize text-gray-900'>
                        {currencyFormatter?.format(item.subTotal)}
                      </td>
                      <td className='whitespace-nowrap    px-6     text-[16px] font-medium capitalize text-gray-900'>
                        {currencyFormatter?.format(item.tax)}
                      </td>
                      <td className='whitespace-nowrap    px-6     text-[16px] font-medium capitalize text-gray-900'>
                        {currencyFormatter?.format(item.total)}
                      </td>
                      <td className=' mt-2  flex place-items-center  items-center   whitespace-nowrap px-6    text-sm font-light text-gray-900'>
                        <button
                          onClick={() => {
                            router.push('/orderDetails');
                            localStorage.setItem('productId', item?._id);
                          }}
                          className=' mr-4 flex w-16 cursor-pointer justify-center rounded bg-black py-2 text-[15px] font-semibold text-white'
                        >
                          View
                        </button>
                        <button className='flex w-16 cursor-pointer justify-center rounded bg-[#009E60] py-2 text-[15px] font-semibold  text-white hover:bg-[#178559]'>
                          Print
                        </button>
                        {/* {action.action1} */}
                      </td>
                    </tr>
                  );
                })}
            </table>
            {orderedItems?.length === 0 ? (
              <div className='ml-10 flex  justify-center rounded-b-md bg-gray-300 font-semibold text-black md:w-[360px] lg:ml-0 lg:w-full'>
                <div className='p-10'>No cart data found.</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
