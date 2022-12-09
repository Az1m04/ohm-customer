import React, { useState } from 'react';

import Account from '@/components/account';
import AccountSideNav from '@/components/accountSideNav';

const AddSubAccount = () => {
  const [placeNewOrder, setPlaceNewOrder] = useState(true);
  const [viewAllOrders, setViewAllOrders] = useState(true);
  const [addressPermissions, setAddressPermissions] = useState(true);
  return (
    <>
      <div className='   mt-10 px-4 md:mx-6 md:mt-56 lg:mx-8 lg:mt-36 xl:mx-[90px] xl:mt-[150px]  2xl:mx-[180px]   '>
        <Account heading='Additional Shipping Addresses' />
        <div className='mb-16 md:flex md:space-x-6'>
          <div className='mt-10  rounded border'>
            <AccountSideNav />
          </div>
          <div className=' mt-10 w-full md:ml-5'>
            <div className='text-[30px] font-semibold'>Subaccount</div>
            <hr className='mb-4 mt-1' />
            <div className='grid gap-x-10 md:grid-cols-2'>
              <div className='mb-3 '>
                <label className='form-label mb-2 inline-block font-semibold text-gray-700'>
                  Username *
                </label>
                <input
                  type='text'
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='Username *'
                  required
                />
              </div>
              <div className='mb-3 '>
                <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                  Email Address *
                </label>
                <input
                  type='text'
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder=' Email Address *'
                  required
                />
              </div>
            </div>
            <div>
              <div className='mb-3 mt-2'>
                <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                  Password *
                </label>
                <input
                  type='text'
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='Password *'
                  required
                />
              </div>
            </div>
            <div>
              <div className='mb-3 mt-4'>
                <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                  Name
                </label>
                <input
                  type='text'
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='Name *'
                  required
                />
              </div>
            </div>
            <div>
              <div className='mb-3 mt-4'>
                <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                  Job Title
                </label>
                <input
                  type='text'
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='Job Title *'
                  required
                />
              </div>
            </div>
            <div>
              <div className='mb-3 mt-2'>
                <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                  Phone Number
                </label>
                <input
                  type='text'
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='Town / City *'
                  required
                />
              </div>
            </div>
            <div className='mt-8 font-bold'>Subaccount Permissions:</div>
            <div className='mt-6 flex'>
              <label
                htmlFor='placeNewOrderFour'
                className='flex cursor-pointer select-none items-center'
              >
                <div className='relative'>
                  <input
                    type='checkbox'
                    id='placeNewOrderFour'
                    className='sr-only'
                  />
                  <div
                    onClick={() => {
                      setPlaceNewOrder(!placeNewOrder);
                    }}
                    className={
                      placeNewOrder
                        ? 'box block h-6 w-[45px] rounded-full bg-gray-300'
                        : 'box block h-6 w-[45px] rounded-full bg-blue-400'
                    }
                  ></div>
                  <div
                    onClick={() => {
                      setPlaceNewOrder(!placeNewOrder);
                    }}
                    className={
                      placeNewOrder
                        ? 'dot absolute  left-1 top-1 flex h-4 w-4 items-center  justify-center rounded-full bg-white transition'
                        : 'dot absolute  right-1 top-1 flex h-4 w-4 items-center  justify-center rounded-full bg-white transition'
                    }
                  ></div>
                </div>
              </label>
              <div className='ml-4 font-semibold'>Place New Order</div>
            </div>
            <div className='mt-6 flex'>
              <label
                htmlFor='placeNewOrderFour'
                className='flex cursor-pointer select-none items-center'
              >
                <div className='relative'>
                  <input
                    type='checkbox'
                    id='placeNewOrderFour'
                    className='sr-only'
                  />
                  <div
                    onClick={() => {
                      setViewAllOrders(!viewAllOrders);
                    }}
                    className={
                      viewAllOrders
                        ? 'box block h-6 w-[45px] rounded-full bg-gray-300'
                        : 'box block h-6 w-[45px] rounded-full bg-blue-400'
                    }
                  ></div>
                  <div
                    onClick={() => {
                      setViewAllOrders(!viewAllOrders);
                    }}
                    className={
                      viewAllOrders
                        ? 'dot absolute  left-1 top-1 flex h-4 w-4 items-center  justify-center rounded-full bg-white transition'
                        : 'dot absolute  right-1 top-1 flex h-4 w-4 items-center  justify-center rounded-full bg-white transition'
                    }
                  ></div>
                </div>
              </label>
              <div className='ml-4 font-semibold'>View All Orders</div>
            </div>
            <div className='mt-8 font-bold'>Address Permissions:</div>
            <div className='mt-4 flex'>
              <label
                htmlFor='placeNewOrderFour'
                className=' flex cursor-pointer select-none items-center'
              >
                <div className='relative'>
                  <input
                    type='checkbox'
                    id='placeNewOrderFour'
                    className='sr-only'
                  />
                  <div
                    onClick={() => {
                      setAddressPermissions(!addressPermissions);
                    }}
                    className={
                      addressPermissions
                        ? 'box block h-6 w-[45px] rounded-full bg-gray-300'
                        : 'box block h-6 w-[45px] rounded-full bg-blue-400'
                    }
                  ></div>
                  <div
                    onClick={() => {
                      setAddressPermissions(!addressPermissions);
                    }}
                    className={
                      addressPermissions
                        ? 'dot absolute  left-1 top-1 flex h-4 w-4 items-center  justify-center rounded-full bg-white transition'
                        : 'dot absolute  right-1 top-1 flex h-4 w-4 items-center  justify-center rounded-full bg-white transition'
                    }
                  ></div>
                </div>
              </label>
              <div className='ml-4 font-semibold'>
                ohm wholesale - 846 Wolcott St, Waterbury, CT, 06705
              </div>
            </div>
            <div className='mt-6 flex w-40 cursor-pointer justify-center rounded bg-gray-700 py-2 font-semibold text-white hover:bg-[#009E60]'>
              Create Subaccount
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubAccount;
