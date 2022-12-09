import { useRouter } from 'next/router';
import React from 'react';
import { RiAddLine } from 'react-icons/ri';

import Account from '@/components/account';
import AccountSideNav from '@/components/accountSideNav';
const data = [
  // {
  //   order: '260952',
  //   date: 'Jun 20, 2022',
  //   business: 'ohm wholesaleWaterbury, CT',
  //   status: 'Completed',
  //   total: '$ 4,350.00',
  //   action: [{ action1: 'View' }, { action1: 'Print' }],
  // },
  // {
  //   order: '260953',
  //   date: 'Jun 20, 2022',
  //   business: 'ohm wholesaleWaterbury, CT',
  //   status: 'Completed',
  //   total: '$ 4,350.00',
  //   action: [{ action1: 'View' }, { action1: 'Print' }],
  // },
  // {
  //   order: '260954',
  //   date: 'Jun 20, 2022',
  //   business: 'ohm wholesaleWaterbury, CT',
  //   status: 'Completed',
  //   total: '$ 4,350.00',
  //   action: [{ action1: 'View' }, { action1: 'Print' }],
  // },
];

const SubAccount = () => {
  const router = useRouter();
  return (
    <>
      <div className='   mt-10 px-4 md:mx-6 md:mt-56 lg:mx-8 lg:mt-36 xl:mx-[90px] xl:mt-[150px]  2xl:mx-[180px]   '>
        <Account heading='Subaccounts' />
        <div className='mb-16 md:flex lg:space-x-6'>
          <div className='mt-10  rounded border'>
            {' '}
            <AccountSideNav />
          </div>
          <div className='mt-10 w-full '>
            <div className='mb-10 flex md:ml-10 lg:ml-0 lg:justify-end'>
              <div
                onClick={() => router.push('./addSubAccount')}
                className='flex w-60 cursor-pointer justify-center rounded bg-gray-400 py-2 px-4 text-[20px] font-semibold text-white hover:bg-[#009E60]'
              >
                Add Subaccount <RiAddLine className='ml-2 mt-1 text-[22px]' />
              </div>
            </div>
            {data.length > 0 ? (
              <div className='   overflow-x-auto rounded-md '>
                <table className='min-w-full rounded-md'>
                  <thead className='border-b bg-gray-800 font-bold text-white'>
                    <tr>
                      <th scope='col' className=' px-4 py-4 text-left   '>
                        ID #
                      </th>
                      <th scope='col' className='px-6 py-4 text-left  '>
                        User Name
                      </th>
                      <th scope='col' className='px-6 py-4 text-left   '>
                        Job Title
                      </th>
                      <th scope='col' className='px-6 py-4 text-left  '>
                        Phone
                      </th>
                      <th scope='col' className='px-6 py-4 text-left   '>
                        Status
                      </th>
                      <th scope='col' className='px-6 py-4 text-left  '>
                        Actions
                      </th>
                    </tr>
                  </thead>

                  {data?.map((item: any, index) => {
                    // return (
                    <tbody key={item?.order}>
                      <tr
                        className={
                          index % 2 === 0
                            ? `border-b bg-gray-100`
                            : `border-b bg-white`
                        }
                      >
                        <td className='cursor-pointer whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 hover:text-[#009E60]'>
                          {item?.order}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                          {item?.date}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                          {item?.business}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                          {item?.status}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                          {item?.total}
                        </td>
                        <td className='grid grid-cols-2 gap-x-2  whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900'>
                          {item?.action}
                        </td>
                      </tr>
                    </tbody>;
                    // );
                  })}
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
                          User Name
                        </th>
                        <th scope='col' className='px-6 py-4 text-left   '>
                          Job Title
                        </th>
                        <th scope='col' className='px-6 py-4 text-left  '>
                          Phone
                        </th>
                        <th scope='col' className='px-6 py-4 text-left   '>
                          Status
                        </th>
                        <th scope='col' className='px-6 py-4 text-left  '>
                          Actions
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className='ml-10 flex  justify-center rounded-b-md bg-gray-500 font-semibold text-white md:w-[360px] lg:ml-0 lg:w-full'>
                  <div className='p-10'>
                    No subaccount added. You can create a new subaccount that
                    allows login to this account to place new orders or view
                    past orders. To create a new subaccount, simply click the
                    button on the top right of this page.{' '}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubAccount;
