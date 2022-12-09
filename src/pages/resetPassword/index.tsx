import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';

import { useResetPassword } from '@/hooks/user/useGetCurrentUser';

import Account from '@/components/account';
import AccountSideNav from '@/components/accountSideNav';

import { currentUsers } from '@/store/users';

const ResetPassword = () => {
  const [meApi] = useAtom(currentUsers);
  const [showPassword, setShowPassword] = useState<any>(false);
  const email = meApi.email;
  const id = meApi?.data?._id;
  const [state, setState] = useState(true);
  console.log('meApi :>> ', meApi);
  const [changePassword, setChangePassword] = useState<any>({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const resetPassword = useResetPassword();
  const updatePassword = () => {
    if (changePassword.newPassword === changePassword.confirmPassword) {
      resetPassword
        ?.mutateAsync({
          pathParams: {
            id,
          },
          body: {
            currentPassword: changePassword.password,
            password: changePassword.newPassword,
          },
        })
        .then((res) => {
          console.log('res', res);
          setChangePassword({
            password: '',
            newPassword: '',
            confirmPassword: '',
          });
          setState(false);
          toast.success('Password changed successfully!', {
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
    } else {
      toast.error('Passwords must be same!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <div className='   mt-10 px-4 md:mx-6 md:mt-56 lg:mx-8 lg:mt-36 xl:mx-[90px] xl:mt-[150px]  2xl:mx-[180px]   '>
        <Account heading='Reset Password' />
        <div className='mb-16 md:flex md:space-x-6'>
          <div className='mt-10  rounded border'>
            <AccountSideNav />
            <ToastContainer />
          </div>
          <div className=' mt-10 w-full md:ml-5'>
            <div className='text-[30px] font-semibold'>Reset Password</div>
            <hr className='mb-4 mt-1' />
            <div className='grid gap-x-10 md:grid-cols-2'>
              <div className='mb-3 '>
                <label className='form-label mb-2 inline-block font-semibold text-gray-700'>
                  Current Passowrd
                </label>
                <input
                  type='password'
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='Current Passowrd '
                  value={changePassword.password}
                  onChange={(e) => {
                    setChangePassword({
                      ...changePassword,
                      password: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='relative mb-3'>
                <label className='form-label  mb-2 inline-block font-semibold text-gray-700'>
                  New Password
                </label>
                <input
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='New Password '
                  type={showPassword ? 'text' : 'password'}
                  value={changePassword.newPassword}
                  onChange={(e) => {
                    setChangePassword({
                      ...changePassword,
                      newPassword: e.target.value,
                    });
                  }}
                  required
                />
                {!showPassword ? (
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-0  mt-[-35px] pr-8'
                  >
                    <div className='flex justify-end text-[23px]'>
                      {' '}
                      <AiFillEye className='cursor-pointer' />
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute  right-0  mt-[-35px] pr-8'
                  >
                    <div className='flex justify-end text-[23px]'>
                      {' '}
                      <AiFillEyeInvisible className='cursor-pointer' />
                    </div>
                  </div>
                )}
              </div>

              <div className='mb-3 '>
                <label className='form-label mb-2  inline-block font-semibold text-gray-700'>
                  Confirm Password
                </label>
                <input
                  type='text'
                  className='form-control m-0 block h-12 w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700  transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none '
                  placeholder='Confirm Password '
                  value={changePassword.confirmPassword}
                  onChange={(e) => {
                    setChangePassword({
                      ...changePassword,
                      confirmPassword: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>

            <div
              onClick={() => {
                updatePassword();
              }}
              className='mt-6 flex w-40 cursor-pointer justify-center rounded bg-gray-700 py-2 font-semibold text-white hover:bg-[#009E60]'
            >
              Change Password
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
