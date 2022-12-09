/* eslint-disable react/no-unescaped-entities */
import { State } from 'country-state-city';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { useAddAddress } from '@/hooks/address/addAddress';
import {
  useDeleteAddress,
  useGetAddress,
  useGetSingleAddress,
  useUpdateAddress,
} from '@/hooks/address/query';
import { useGetCurrentUsers } from '@/hooks/user/useGetCurrentUser';

import Loading from '@/components/loading';

import { currentUsers } from '@/store/users';

import Banner2 from '../../../../assets/img/location3.png';

function CartInformation({ setStep, setData, data, step }) {
  const userAddress: any = useGetAddress({});
  const [getUsers, setUsers] = useAtom(currentUsers);
  const [addNewAddressState, setAddNewAddressState] = useState(false);
  const [updateAddressState, setUpdateAddressState] = useState({
    visible: false,
    id: '',
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getUser: any = useGetCurrentUsers(setUsers);
  const addAddress = useAddAddress();

  const [shippingAddress, setShippingAddress] = useState<any>({
    address: {
      address_line_1: '',
      city: '',
      state: 'Please Select State',
      zip: '',
    },
    legalBusinessName: '',
  });

  const deleteShippingAddress = useDeleteAddress();

  const deleteAddress = (v) => {
    setDeleteLoading(true);
    deleteShippingAddress
      .mutateAsync({
        pathParams: {
          id: v,
        },
      })
      .then((res) => {
        setDeleteLoading(false);
        userAddress.refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const router = useRouter();

  const addShippingAddress = (val: any) => {
    addAddress
      ?.mutateAsync({
        body: val,
      })
      .then((res: any) => {
        userAddress.refetch();
        setAddNewAddressState(false);
        setUpdateAddressState({
          visible: false,
          id: '',
        });
        setShippingAddress({
          address: {
            address_line_1: '',
            streetAddressLine_2: '',
            city: '',
            state: '',
            zip: '',
          },
          legalBusinessName: '',
        });
      })

      .catch((err) => {
        console.error(err);
      });
  };
  const handleSubmit = (e) => {
    addShippingAddress(shippingAddress);
  };
  const singleAddress = useGetSingleAddress();

  const getSingleShippingAddress = () => {
    singleAddress
      .mutateAsync({
        pathParams: {
          id: updateAddressState?.id,
        },
      })
      .then((res: any) => {
        console.log('res', res);
        setShippingAddress({
          address: {
            address_line_1: res?.data?.address?.address_line_1,
            city: res?.data?.address?.city,
            state: res?.data?.address?.state,
            zip: res?.data?.address?.zip,
          },
          legalBusinessName: res?.data?.legalBusinessName,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateAddress = useUpdateAddress();

  const updateShippingAddress = () => {
    updateAddress
      ?.mutateAsync({
        pathParams: {
          id: updateAddressState?.id,
        },
        body: shippingAddress,
      })
      .then((res: any) => {
        console.log('res', res);
        userAddress?.refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getSingleShippingAddress();

    return () => {};
  }, [updateAddressState?.id]);

  return (
    <div className=''>
      <ToastContainer />

      {userAddress?.isFetching ? (
        <Loading />
      ) : (
        <div className=' mx-auto mt-5 grid-cols-2'>
          <div className='text-2xl'>Select a delivery address</div>
          <div className='text-sm text-[#666665]'>
            Is the address you'd like to use displayed below? If so, click the
            corresponding "Deliver to this address" button. Or you can enter a{' '}
            <span className='font-bold text-[#35953e]'>
              new delivery address.
            </span>
          </div>
          <div className='my-5 flex items-center'>
            <Image
              src={Banner2}
              objectFit='contain'
              width={30}
              height={30}
              className='bg-none '
              alt='u'
            />
            <div className='ml-2 text-xl font-bold text-[#000]'>
              On the move .
            </div>
          </div>
          <div className='my-5 h-[1px] w-full bg-gray-300'></div>

          <div className='flex w-full flex-wrap'>
            {addNewAddressState === false ? (
              <>
                {updateAddressState?.visible === false ? (
                  <>
                    <div className='my-5 mr-5 w-[240px] rounded-md border border-gray-400  p-5'>
                      <div className='font-medium text-[#009E60]'>
                        {getUser?.data?.data?.firstName}{' '}
                        {getUser?.data?.data?.lastName}
                      </div>
                      <div>
                        {getUser?.data?.data?.phone
                          ?.toString()
                          ?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
                      </div>
                      <div className='  text-sm uppercase'>
                        {getUser?.data?.data?.address?.address_line_1}{' '}
                        {getUser?.data?.data?.address?.city}{' '}
                        {getUser?.data?.data?.address?.state_code}{' '}
                        {getUser?.data?.data?.address?.postal_code}
                      </div>
                      <div className='uppercase'>USA</div>

                      <button
                        onClick={() => {
                          setStep((prev) => prev + 1);

                          setData(getUser?.data?.data);
                        }}
                        className=' my-3 rounded-md bg-green-200 p-2 px-4 text-sm  hover:bg-green-300 hover:shadow'
                      >
                        Deliver to this Address
                      </button>
                    </div>
                    {userAddress?.data?.address?.map((item) => {
                      console.log(item, 'item');
                      return (
                        <div
                          key={item?._id}
                          className='my-5 mr-5 w-[240px] rounded-md border border-gray-400  p-5'
                        >
                          <div className='font-medium text-[#009E60]'>
                            {getUser?.data?.data?.firstName}{' '}
                            {getUser?.data?.data?.lastName}
                          </div>
                          <div>
                            {getUser?.data?.data?.phone
                              ?.toString()
                              ?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
                          </div>
                          <div className='  text-sm uppercase'>
                            {item?.address?.address_line_1}{' '}
                            {item?.address?.city} {item?.address?.state}{' '}
                            {item?.address?.zip}
                          </div>
                          <div className='uppercase'>USA</div>

                          <button
                            onClick={() => {
                              setStep((prev) => prev + 1);

                              setData(item);
                            }}
                            className=' my-3 rounded-md bg-green-200 p-2 px-4 text-sm  hover:bg-green-300 hover:shadow'
                          >
                            Deliver to this Address
                          </button>
                          <div className='my-2 flex items-center'>
                            <button
                              onClick={() => {
                                setUpdateAddressState({
                                  visible: true,
                                  id: item?._id,
                                });
                                setAddNewAddressState(true);
                              }}
                              className='mr-3 rounded border border-gray-400 bg-white  px-4 font-semibold text-gray-800 shadow hover:bg-gray-100'
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                deleteAddress(item?._id);
                              }}
                              className='flex items-center rounded border border-gray-400 bg-white  px-4 font-semibold text-gray-800 shadow hover:bg-gray-100'
                            >
                              {deleteLoading ? (
                                <div className='flex items-center'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    style={{
                                      margin: 'auto',
                                      background: 'transparent',
                                      display: 'block',
                                      shapeRendering: 'auto',
                                    }}
                                    width='20'
                                    height='20'
                                    viewBox='0 0 100 100'
                                    preserveAspectRatio='xMidYMid'
                                  >
                                    <circle
                                      cx='50'
                                      cy='50'
                                      fill='none'
                                      stroke='green'
                                      strokeWidth='10'
                                      r='35'
                                      strokeDasharray='164.93361431346415 56.97787143782138'
                                    >
                                      <animateTransform
                                        attributeName='transform'
                                        type='rotate'
                                        repeatCount='indefinite'
                                        dur='1s'
                                        values='0 50 50;360 50 50'
                                        keyTimes='0;1'
                                      ></animateTransform>
                                    </circle>
                                  </svg>
                                  <div>Delete</div>
                                </div>
                              ) : (
                                <div>Delete</div>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
          {!addNewAddressState ? (
            <button
              onClick={() => {
                setAddNewAddressState(true);
              }}
              className=' flex w-36 cursor-pointer justify-center rounded bg-gray-700 py-2 text-white hover:bg-[#009E60]'
            >
              Add new Address
            </button>
          ) : (
            <div className='flex w-full justify-end'>
              <button
                onClick={() => {
                  setAddNewAddressState(false);
                  setUpdateAddressState({
                    visible: false,
                    id: '',
                  });
                }}
                className=' flex w-36 cursor-pointer justify-center rounded bg-gray-700 py-2 text-white hover:bg-[#009E60]'
              >
                Close
              </button>
            </div>
          )}

          {addNewAddressState ? (
            <>
              <div className='mt-10 text-2xl'>
                {updateAddressState?.visible === true
                  ? 'Update Address'
                  : 'Add a new address'}
              </div>

              <form
                className='mb-10 w-full'
                onSubmit={(e) => {
                  e.preventDefault();

                  if (!!shippingAddress?.address?.state === false) {
                    toast.error('State is required');
                  } else {
                    if (updateAddressState?.visible === false) {
                      handleSubmit(e);
                    } else if (updateAddressState?.visible === true) {
                      updateShippingAddress();
                    }
                  }
                }}
              >
                <div className=' my-5 w-full'>
                  <div className=''>
                    <div className='mb-3 mt-2'>
                      <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                        Business Name *
                      </label>
                      <input
                        type='text'
                        className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                        placeholder='Enter your business name '
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

                  <div className='grid grid-cols-2 gap-x-10'>
                    <div className='mb-3 mt-2'>
                      <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                        Street address *
                      </label>
                      <input
                        type='text'
                        className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                        placeholder='Address Line 1'
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
                    </div>
                    <div className='mb-3 mt-2'>
                      <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                        Town / City *
                      </label>
                      <input
                        type='text'
                        className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                        placeholder='Enter Town / City '
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

                  <div className='grid grid-cols-2 gap-x-10'>
                    <div className='mb-3 '>
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
                        placeholder='Enter zipcode'
                        required
                      />
                    </div>
                  </div>

                  <div className='mt-6 flex items-center'>
                    <button
                      type='submit'
                      className='mr-4  flex w-36 cursor-pointer justify-center rounded bg-gray-700 py-2 text-white hover:bg-[#009E60]'
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        router.push('/cart');
                      }}
                      className=' flex w-36 cursor-pointer justify-center rounded bg-gray-700 py-2 text-white hover:bg-[#009E60]'
                    >
                      Return to cart
                    </button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <></>
          )}

          {/* <button
            type='submit'
            onClick={() => {
              setStep((prev) => prev + 1);
            }}
            className=' m-2 h-[60px] w-[200px] rounded-xl  bg-[#009E60] px-[15px] py-[9px]  text-center text-[16px] font-medium text-white md:mt-10'
          >
            {loadingState ? (
              <div className=' flex flex-row'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  style={{
                    margin: 'auto',
                    background: 'transparent',
                    display: 'block',
                    shapeRendering: 'auto',
                  }}
                  width='20'
                  height='20'
                  viewBox='0 0 100 100'
                  preserveAspectRatio='xMidYMid'
                >
                  <circle
                    cx='50'
                    cy='50'
                    fill='none'
                    stroke='white'
                    strokeWidth='10'
                    r='35'
                    strokeDasharray='164.93361431346415 56.97787143782138'
                  >
                    <animateTransform
                      attributeName='transform'
                      type='rotate'
                      repeatCount='indefinite'
                      dur='1s'
                      values='0 50 50;360 50 50'
                      keyTimes='0;1'
                    ></animateTransform>
                  </circle>
                </svg>
              </div>
            ) : (
              <>Checkout</>
            )}
          </button>
  
          <Link href='/cart' passHref>
            <button className=' ml-2  h-[60px] w-[200px] rounded-xl border-2 border-[#009E60] px-[15px]  py-[9px] text-center text-[16px] font-medium text-[#009E60]'>
              Return to cart
            </button>
          </Link> */}
        </div>
      )}
    </div>
  );
}

export default CartInformation;
