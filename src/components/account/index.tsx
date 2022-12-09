import { useRouter } from 'next/router';
import React, { useState } from 'react';
function Account({ heading }) {
  const [page, setPage] = useState('welcome');
  const router = useRouter();
  return (
    <>
      <div>
        <div></div>
        <div className='font-semibold'>
          <span
            className='cursor-pointer underline'
            onClick={() => router.push('/')}
          >
            Home
          </span>
          &#160; /&#160;{' '}
          <span
            onClick={() => router.push('/welcomeAccount')}
            className='cursor-pointer underline'
          >
            My Account
          </span>
          &#160; / &#160;
          <span className=' text-gray-500'>
            {heading === 'My Account' ? 'Welcome' : heading}
          </span>
        </div>
        <div className='mt-5  border-b border-gray-200' />
        <div className='my-4 text-[25px] font-bold text-gray-400'>
          {heading}
        </div>
        <div className=' border-b border-gray-200' />
      </div>
    </>
  );
}

export default Account;
