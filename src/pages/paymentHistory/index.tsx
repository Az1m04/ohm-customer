import { useAtom } from 'jotai';
import React from 'react';

import { useGetOrder, useGetUserOrderItems } from '@/hooks/order/query';

import Account from '@/components/account';
import AccountSideNav from '@/components/accountSideNav';

import { orderData } from '@/store/order';
const data = [
  {
    order: '260950',
    date: 'Jun 20, 2022',
    amount: '$4350.00',
    status: 'Completed',
  },
  {
    order: '260951',
    date: 'Jun 20, 2022',
    amount: '$4350.00',
    status: 'Completed',
  },
];

const PaymentHistory = () => {
  const [orderItems] = useAtom(orderData);

  const order: any = useGetOrder(orderItems);

  const userOrder: any = useGetUserOrderItems({});
  const orderedItems = userOrder?.data?.usersOrder;
  const data = orderedItems?.some((item) => !!item.paymentDetails === true);
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
                    className=' px-4 py-4 text-left text-sm font-medium text-gray-900'
                  >
                    Order #
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                  >
                    Date
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                  >
                    Amount
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                  >
                    Status
                  </th>
                </tr>
              </thead>
              {orderedItems?.map((item, index) => {
                if (item?.paymentDetails) {
                  return (
                    <tbody key={item.order}>
                      <tr
                        className={
                          index % 2 === 0
                            ? `border-b bg-gray-100`
                            : `border-b bg-white`
                        }
                      >
                        <td className='cursor-pointer whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 hover:text-[#009E60]'>
                          #{item.orderId}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                          {item?.paymentDetails?.updatedAt.slice(0, 10)}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                          {item?.paymentDetails?.totalAmount}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                          {item?.paymentDetails?.status}
                        </td>
                      </tr>
                    </tbody>
                  );
                }
              })}
            </table>
            {data === false ? (
              <div className='text-40'>No payment history found!</div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
