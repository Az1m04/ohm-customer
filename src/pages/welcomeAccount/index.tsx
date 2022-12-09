import { useAtom } from 'jotai';
import React from 'react';

import Account from '@/components/account';
import AccountSideNav from '@/components/accountSideNav';

import { currentUsers } from '@/store/users';

// import Order from '../orders/index';

function WelcomeAccount() {
  const [meApi] = useAtom(currentUsers);
  return (
    <>
      <div className='   mt-10 px-4 md:mx-6 md:mt-56 lg:mx-8 lg:mt-36 xl:mx-[90px] xl:mt-[150px]  2xl:mx-[180px]   '>
        <Account heading='My Account' />
        <div className='mb-16 space-x-6 md:flex'>
          <div className='mt-10  rounded border'>
            {' '}
            <AccountSideNav />
          </div>
          <div className=' mt-10 ml-5'>
            <div className='text-[27px] font-semibold'>
              Hello {meApi?.data?.displayName}
            </div>
            <div className='mt-4 text-[16px] text-gray-600'>
              Welcome to your OHM wholesale{' '}
              <span className='font-bold'>My Account</span> Dashboard. You can
              view your recent orders, manage your shipping addresses, view
              payment history, and edit your password and account details.
            </div>
            <div className='mt-5'>
              If you need assistant with any account related activities, you can
              give us a call at:
              <span className='ml-2 bg-[#FCF8E3] px-2'>
                +1 (203) 725-5206,
              </span>{' '}
              also you can also email us to:{' '}
              <span className='ml-2 bg-[#FCF8E3] px-2'>
                ohmwholesales@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomeAccount;
