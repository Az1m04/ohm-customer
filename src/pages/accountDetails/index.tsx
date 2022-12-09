import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import {
  useGetCurrentUsers,
  useUpdateDetails,
} from '@/hooks/user/useGetCurrentUser';

import Account from '@/components/account';
import AccountSideNav from '@/components/accountSideNav';

import { currentUsers } from '@/store/users';
const AccountDetails = () => {
  const [meApi] = useAtom(currentUsers);
  const [state, setState] = useState(false);
  const [newdata, setNewData] = useState<any>([]);
  const [accountDetails, setAccountDetails] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
  });
  const [_, setUsers] = useAtom(currentUsers);
  const { refetch } = useGetCurrentUsers(setUsers);
  const updateADetails = useUpdateDetails();

  const updateAccountDetails = () => {
    updateADetails
      ?.mutateAsync({
        body: accountDetails,
      })
      .then((res) => {
        console.log('res', res);
        setData(meApi);
        refetch();
        toast.success('Details updated successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const setData: any = () => {
    setAccountDetails({
      firstName: meApi?.data?.firstName,
      lastName: meApi?.data?.lastName,
      email: meApi?.data?.email,
      companyName: meApi?.data?.companyName,
    });
  };
  useEffect(() => {
    setData(meApi);
  }, [meApi, state]);

  return (
    <>
      <div className='   mt-10 px-4 md:mx-6 md:mt-56 lg:mx-8 lg:mt-36 xl:mx-[90px] xl:mt-[150px]  2xl:mx-[180px]   '>
        <Account heading='Additional Shipping Addresses' />
        <div className='mb-16 md:flex md:space-x-6'>
          <div className='mt-10  rounded border'>
            {' '}
            <AccountSideNav />
            <ToastContainer />
          </div>
          <div className=' mt-10 w-full md:ml-5'>
            <div className='grid gap-x-10 md:grid-cols-2'>
              <div className='mb-3 '>
                <label className='form-label mb-2 inline-block font-semibold text-gray-700'>
                  First Name *
                </label>
                <input
                  type='text'
                  value={accountDetails.firstName}
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='First Name *'
                  onChange={(e) => {
                    setAccountDetails({
                      ...accountDetails,
                      firstName: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='mb-3 '>
                <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                  Last Name *
                </label>
                <input
                  type='text'
                  value={accountDetails.lastName}
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='  Last Name *'
                  onChange={(e) => {
                    setAccountDetails({
                      ...accountDetails,
                      lastName: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>
            <div>
              <div className='mb-3 mt-2'>
                <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                  Email Address
                </label>
                <input
                  type='email'
                  value={accountDetails.email}
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  onChange={(e) => {
                    setAccountDetails({
                      ...accountDetails,
                      email: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>
            <div>
              <div className='mb-3 mt-4'>
                <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                  Company Name
                </label>
                <input
                  type='text'
                  value={accountDetails.companyName}
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  onChange={(e) => {
                    setAccountDetails({
                      ...accountDetails,
                      companyName: e.target.value,
                    });
                  }}
                  placeholder='company Name'
                  required
                />
              </div>
            </div>
            {/* <div className='grid gap-x-10 md:grid-cols-2'>
              <div className='mb-3 '>
                <label className='form-label mb-2 inline-block font-semibold text-gray-700'>
                  Current Password *
                </label>
                <input
                  type='text'
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='Current Password *'
                  required
                />
              </div>
              <div className='mb-3 '>
                <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                  New Password *
                </label>
                <input
                  type='text'
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='  New Password *'
                  required
                />
              </div>
            </div> */}
            <div
              onClick={() => {
                updateAccountDetails();
              }}
              className='mt-6 flex w-36 cursor-pointer justify-center rounded bg-gray-700 py-2 text-white hover:bg-[#009E60]'
            >
              Save Changes
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
