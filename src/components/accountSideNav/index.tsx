import { useRouter } from 'next/router';
import React from 'react';

const AccountSideNav = () => {
  const router = useRouter();
  return (
    <>
      <div className='mb-16 md:flex'>
        <div className='mx-4  mt-2 grid h-auto grid-cols-1   divide-y text-[#009E60] md:w-[200px] xl:w-[350px] 2xl:w-[180px]'>
          {/* <div
            onClick={() => router.push('./orders')}
            className='cursor-pointer py-2 hover:text-red-300'
          >
            Orders
          </div> */}
          <div
            onClick={() => router.push('./address')}
            className='cursor-pointer py-2 hover:text-red-300'
          >
            Addresses
          </div>
          <div
            onClick={() => router.push('./accountDetails')}
            className='cursor-pointer py-2 hover:text-red-300'
          >
            Account Details
          </div>
          {/* <div
            onClick={() => router.push('./subAccount')}
            className='cursor-pointer py-2 hover:text-red-300'
          >
            Subaccounts
          </div> */}
          {/* <div
            onClick={() => router.push('./saveCart')}
            className='cursor-pointer py-2 hover:text-red-300'
          >
            Saved Cart
          </div> */}

          <div
            onClick={() => router.push('./paymentHistory')}
            className='cursor-pointer py-2 hover:text-red-300'
          >
            Payment History
          </div>
          <div
            onClick={() => router.push('./resetPassword')}
            className='cursor-pointer py-2 hover:text-red-300'
          >
            Reset Password
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSideNav;
