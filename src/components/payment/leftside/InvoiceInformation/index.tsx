import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { orderData } from '@/store/order';
import { currentUsers } from '@/store/users';

const InvoiceInformation = ({ setStep, setData, data }) => {
  const [getUser, setUser] = useAtom(currentUsers);
  const [orderItems, setOrderItems] = useAtom(orderData);
  const router = useRouter();

  console.log(data, 'data');

  return (
    <div className='lg:mx-[31%]'>
      <div>
        <div className='mt-4 flex'>
          <Image
            src='https://cdn-icons-png.flaticon.com/512/463/463574.png'
            width={50}
            height={50}
            alt=''
          />
          <div className='mx-2'>
            <p className='text-sm text-gray-500'>
              Order #{orderItems?.order?.orderId}
            </p>
            <p className='text-lg text-gray-600 '>
              Thank you {getUser?.data?.firstName} {getUser?.data?.lastName}
            </p>
          </div>
        </div>
      </div>
      <div className='mt-4  w-full    justify-between rounded-md  border border-gray-300 bg-transparent   text-md  text-gray-900'>
        <div className='mx-4 mt-4 text-gray-500  '>
          <p>Your order is confirmed</p>
          <p className=' text-xs text-gray-600  '>
            You will receive a confirmation email with your order number shortly
          </p>
        </div>

        {/* <div className='mb-2 flex'>
          <input
            type='checkbox'
            className='... mx-4 mt-5 mr-2 default:ring-2'
          />
          <p className='mt-4 text-center text-sm text-gray-500'>
            Email me with news and offers
          </p>
        </div> */}
      </div>

      {/* <div className='mt-4 w-full items-center  justify-between rounded-md  border  border-gray-300 bg-transparent p-4  px-[10px] text-md  text-gray-900'>
        <p className='mx-2 text-sm text-gray-500'>
          Thank You! your order is delivered by 7-8 business days
        </p>
      </div> */}
      <div className='mt-4   w-full  rounded-md    border border-gray-300 bg-transparent  p-[10px] text-md  text-gray-900'>
        <div className='mx-4 text-xl'>Customer information</div>
        <div className='mx-4 mt-2 grid grid-cols-2 text-sm text-gray-900 xxs:block'>
          {/* <p>Customer information</p> */}
          <p className='text-gray-500'>
            Payment method :<span> {data?.paymentMethod}</span>
          </p>
          <div className='text-sm text-gray-500   '>
            Email : {orderItems?.user?.email}
          </div>
          <p className='text-sm text-gray-500 '>
            Total : ${orderItems?.order?.total}
          </p>
        </div>
        <div className='mx-4 mt-2 grid grid-cols-2 text-sm text-gray-900'>
          {/* <div>
            <p>Billing address</p>
            <p className='mt-2 text-sm leading-5 text-gray-500'>
              OHM WHOLESALE 846 WOLCOTT ST WATERBURY CT 06705
            </p>
          </div> */}
          <div>
            <p>Shipping address</p>
            <p className='mt-2 text-sm uppercase leading-5 text-gray-500'>
              {orderItems?.order?.address?.address_line_1},{' '}
              {orderItems?.order?.address?.city},{' '}
              {orderItems?.order?.address?.state_code}
            </p>
          </div>
          <div>
            <p>Phone Number</p>
            <p className='mt-2 text-sm uppercase leading-5 text-gray-500'>
              +
              {getUser?.data?.phone?.replace(
                /(\d{3})(\d{3})(\d{4})/,
                '($1) $2-$3'
              ) ||
                data?.mobilePhone
                  ?.toString()
                  ?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
            </p>
          </div>

          {/* <p className='text-gray-gray-500 mt-2 text-sm text-gray-500'>
            <span>
              +{data.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
            </span>
          </p> */}
          {/* <div className='mt-2'>
            <p>Shipping Method</p>
            <p className='text-sm text-gray-500'></p>
          </div> */}
        </div>
      </div>

      <div className='my-4 flex xxs:ml-2 '>
        <div className='flex items-center justify-center gap-4'>
          <Link href='/products' passHref>
            <button
              type='button'
              className=' h-[60px]  w-[200px] rounded-md  bg-[#009E60] px-[15px]  py-[9px] text-center text-[16px] font-medium text-white'
            >
              Continue Shopping
            </button>
          </Link>
          <div className='my-2  flex text-center'>
            <p>Need Help?</p>
            <p
              className='ml-1 cursor-pointer text-[#009E64]'
              onClick={() => {
                router.push('./contact');
              }}
            >
              Contact us
            </p>
          </div>
        </div>
      </div>
      <div className=' flex  w-full cursor-pointer gap-3 py-4 text-sm text-[#009E64] xxs:ml-2 xxs:items-center xxs:justify-center'>
        <div
          className='mr-5 cursor-pointer'
          onClick={() => {
            router.push('./term');
          }}
        >
          Refund policy
        </div>
        <div
          className='cursor-pointer'
          onClick={() => {
            router.push('./policy');
          }}
        >
          Privacy policy
        </div>
        {/* <p>Privacy policy</p>
        <p>Terms of service</p> */}
      </div>
    </div>
  );
};

export default InvoiceInformation;
