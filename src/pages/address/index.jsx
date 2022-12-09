import { useRouter } from 'next/router';
import React from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { RiAddLine } from 'react-icons/ri';

import Account from '@/components/account';
import AccountSideNav from '@/components/accountSideNav';
import Loading from '@/components/loading';

import { useDeleteAddress, useGetAddress } from '../../hooks/address/query';

const data = [
  {
    id: 1,
    name: 'Default Billing Address',
    address: 'suraj luthra 846 Wolcott St Waterbury, CT 06705 (203) 217-6815',
  },
];

const Address = () => {
  const userAddress = useGetAddress();

  const deleteShippingAddress = useDeleteAddress();

  const deleteAddress = (v) => {
    deleteShippingAddress
      .mutateAsync({
        pathParams: {
          id: v,
        },
      })
      .then((res) => {
        userAddress.refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const router = useRouter();
  return (
    <>
      <div className='   mt-10 px-4 md:mx-6 md:mt-56 lg:mx-8 lg:mt-36 xl:mx-[90px] xl:mt-[150px]  2xl:mx-[180px]   '>
        <Account
          heading='My Shipping Addresses
'
        />
        <div className='mb-16 md:flex md:space-x-6'>
          <div className='mt-10  rounded border'>
            {' '}
            <AccountSideNav />
          </div>
          <div className=' mt-10 w-full md:ml-5'>
            {!userAddress?.isFetching ? (
              <div className='grid gap-x-10 gap-y-5 md:grid-cols-2'>
                {userAddress?.data?.address.map((item) => {
                  return (
                    <div key={item?._id} className='rounded bg-gray-100 p-4'>
                      <div className='flex justify-between'>
                        <div className='font-semibold'>
                          {item?.legalBusinessName}
                        </div>
                        <div className='flex space-x-2'>
                          <div
                            onClick={() => {
                              router.push('./editAddress');
                              localStorage.setItem('addressId', item?._id);
                            }}
                            className='flex h-8  w-8 cursor-pointer justify-center rounded-full bg-white pt-2 hover:text-[19px]'
                          >
                            <FiEdit3 className='' />
                          </div>
                          <div
                            onClick={() => {
                              deleteAddress(item?._id);
                            }}
                            className='flex h-8  w-8 cursor-pointer justify-center rounded-full  pt-1 hover:text-[19px]'
                          >
                            <MdDeleteOutline className=' text-[20px] text-red-500 hover:text-[22px]' />
                          </div>
                          <div className='pl-4'></div>
                        </div>
                      </div>
                      <div className='w-28 text-gray-600'>
                        {item?.address?.address_line_1},
                      </div>
                      <div className='text-gray-600'>
                        {item?.address?.state}, {item?.address?.city},
                      </div>
                      <div className='w-3/4 text-gray-600'>USA</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className=' w-full items-center'>
                <Loading />
              </div>
            )}

            <div
              onClick={() => router.push('./addAddress')}
              className='mt-10 flex cursor-pointer justify-center rounded bg-[#009E60] px-4 py-2 text-[20px] text-white hover:bg-[#157750] md:px-0 '
            >
              Add New Shipping Address{' '}
              <RiAddLine className=' ml-2 text-[28px] md:ml-4' />
            </div>
            <div className='mt-10 text-[18px]'>
              Please note that, all new shipping address will be verified before
              you can use them. If you edit a verified address, it will have to
              be verified again.
              <span className='font-semibold'>
                You cannot use an address for shipping until it has been
                verified.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
