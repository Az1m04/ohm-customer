import { State } from 'country-state-city';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Account from '@/components/account';
import AccountSideNav from '@/components/accountSideNav';

import { useAddAddress } from '../../hooks/address/addAddress';

const AddAddress = () => {
  const addAddress = useAddAddress();
  const router = useRouter();

  const addShippingAddress = (val: any) => {
    addAddress
      ?.mutateAsync({
        body: val,
      })
      .then((res: any) => {
        router.push('/address');

        setShippingAddress({
          address: {
            address_line_1: '',
            city: '',
            state: '',
            zip: '',
          },

          legalBusinessName: '',
        });
        console.log('res', res);
      })

      .catch((err) => {
        console.error(err);
      });
  };

  const [shippingAddress, setShippingAddress] = useState<any>({
    address: {
      address_line_1: '',
      city: '',
      state: '',
      zip: '',
    },

    legalBusinessName: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    addShippingAddress(shippingAddress);
  };

  return (
    <>
      <div className='   mt-10 px-4 md:mx-6 md:mt-56 lg:mx-8 lg:mt-36 xl:mx-[90px] xl:mt-[150px]  2xl:mx-[180px]   '>
        <ToastContainer />
        <Account heading='Additional Shipping Addresses' />
        <div className='mb-16 md:flex md:space-x-6'>
          <div className='mt-10  rounded border'>
            {' '}
            <AccountSideNav />
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className='w-full'
          >
            <div className=' mt-10 w-full md:ml-5'>
              <div>
                <div className='mb-3 mt-2'>
                  <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                    Legal Business Name *
                  </label>
                  <input
                    type='text'
                    className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                    placeholder='    Legal Business Name *'
                    value={shippingAddress.legalBusinessName}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        legalBusinessName: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className='mb-3 mt-4'>
                  <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                    Street address *
                  </label>
                  <input
                    type='text'
                    className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                    placeholder='Address Line 1*'
                    value={shippingAddress?.address?.address_line_1}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        address: {
                          ...shippingAddress.address,
                          address_line_1: e.target.value,
                        },
                      });
                    }}
                    required
                  />
                  {/* <input
                    type='text'
                    className='form-control m-0 mt-2 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                    placeholder='Address Line 2'
                    value={shippingAddress?.address?.address_line_2}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        address: {
                          ...shippingAddress.address,
                          address_line_2: e.target.value,
                        },
                      });
                    }}
                  /> */}
                </div>
              </div>
              <div>
                <div className='mb-3 mt-2'>
                  <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                    Town / City *
                  </label>
                  <input
                    type='text'
                    className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                    placeholder='Town / City *'
                    value={shippingAddress?.address?.city}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        address: {
                          ...shippingAddress.address,
                          city: e.target.value,
                        },
                      });
                    }}
                    required
                  />
                </div>
              </div>
              <div>
                <div className='mb-3 mt-2'>
                  <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                    State *
                  </label>
                  <select
                    required={true}
                    className=' mt-[5px] h-[50px] w-full rounded-xl border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                    onChange={(event: any) => {
                      console.log(event.target.value);
                      setShippingAddress({
                        ...shippingAddress,
                        address: {
                          ...shippingAddress.address,
                          state: event.target.value,
                        },
                      });
                    }}
                    value={shippingAddress?.address?.state}
                    // onClick={(e) => {
                    //   setStateCode(e.currentTarget.value);
                    // }}
                  >
                    {State?.getStatesOfCountry('US')?.map((item) => {
                      return (
                        <option key={item?.isoCode} value={item?.name}>
                          {item?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className='mb-3 mt-2'>
                <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                  ZIP *
                </label>
                <input
                  type='tel'
                  maxLength={6}
                  value={shippingAddress?.address?.zip}
                  onChange={(e) => {
                    const zipCode = e.target.value.replace(/\D/g, '');

                    setShippingAddress({
                      ...shippingAddress,
                      address: {
                        ...shippingAddress.address,
                        zip: zipCode,
                      },
                    });
                  }}
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='ZIP '
                  required
                />
              </div>

              <button
                type='submit'
                className='mt-6 flex w-36 cursor-pointer justify-center rounded bg-gray-700 py-2 text-white hover:bg-[#009E60]'
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAddress;
