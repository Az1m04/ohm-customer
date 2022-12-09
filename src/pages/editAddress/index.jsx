import { State } from 'country-state-city';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Account from '@/components/account';
import AccountSideNav from '@/components/accountSideNav';

import {
  useGetSingleAddress,
  useUpdateAddress,
} from '../../hooks/address/query';

const EditAddress = () => {
  const router = useRouter();

  const id = localStorage.getItem('addressId');
  const [newdata, setNewData] = useState([]);
  const singleAddress = useGetSingleAddress();

  const [shippingAddress, setShippingAddress] = useState({
    address: {
      address_line_1: '',
      city: '',
      state: '',
      zip: '',
    },

    legalBusinessName: '',
  });

  const updateAddress = useUpdateAddress();

  const updateShippingAddress = () => {
    updateAddress
      ?.mutateAsync({
        pathParams: {
          id,
        },
        body: shippingAddress,
      })
      .then((res) => {
        console.log('res', res);
        router.push('./address');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getSingleShippingAddress = () => {
    singleAddress
      .mutateAsync({
        pathParams: {
          id,
        },
      })
      .then((res) => {
        console.log('res', res);
        setNewData(res.data);
        // console.log('id :>> ', id, newdata);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const setData = (e) => {
    setShippingAddress({
      address: {
        address_line_1: newdata?.address?.address_line_1,
        city: newdata?.address?.city,
        state: newdata?.address?.state,
        zip: newdata?.address?.zip,
      },

      legalBusinessName: newdata?.legalBusinessName,
    });
  };
  const handleSubmit = () => {
    updateShippingAddress(shippingAddress);
  };
  useEffect(() => {
    getSingleShippingAddress();
  }, []);

  useEffect(() => {
    setData(newdata);
  }, [newdata]);
  return (
    <>
      <div className='   mt-10 px-4 md:mx-6 md:mt-56 lg:mx-8 lg:mt-36 xl:mx-[90px] xl:mt-[150px]  2xl:mx-[180px]   '>
        <Account heading='Additional Shipping Addresses' />
        <div className='mb-16 md:flex md:space-x-6'>
          <div className='mt-10  rounded border'>
            {' '}
            <AccountSideNav />
          </div>

          <form className='w-full'>
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
              </div>

              <div>
                <div className='mb-3 mt-4'>
                  <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                    Street address *
                  </label>
                  <input
                    type='text'
                    className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                    placeholder='Address Line 1*'
                    value={shippingAddress.address?.address_line_1}
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
                    value={shippingAddress.address?.address_line_2}
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
                    onChange={(event) => {
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
                  type='number'
                  value={shippingAddress?.address?.zip}
                  onChange={(e) => {
                    setShippingAddress({
                      ...shippingAddress,
                      address: {
                        ...shippingAddress.address,
                        zip: e.target.value,
                      },
                    });
                  }}
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='ZIP *'
                  required
                />
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
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

export default EditAddress;
