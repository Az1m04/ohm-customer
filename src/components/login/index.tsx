import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useLogin } from '@/hooks/auth/login/useLogin';
import { useGetCurrentUsers } from '@/hooks/user/useGetCurrentUser';

import { authAtom } from '@/store/auth';
import { currentUsers } from '@/store/users';

const LoginPage = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const [error, setError] = useState();
  const router = useRouter();
  const login: any = useLogin();
  const [_, setUsers] = useAtom(currentUsers);
  const { refetch } = useGetCurrentUsers(setUsers);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    login.isError && setError(login.error);
    if (auth.isAuthenticated) {
      // push without refreshing
      router.push('/', '/', { shallow: true });
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated, router, toast, login.error]);

  return (
    <>
      <div className='container mx-auto max-w-lg py-[69px] px-[20px]'>
        <ToastContainer />

        <form
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            console.log('form', form);
            const formdata = new FormData(form);
            const userName = formdata.get('userName');
            const password = formdata.get('password');

            login
              .mutateAsync({ body: { userName, password } })
              .then(() => {
                refetch();
                toast.success('Login Successfully done');
                setTimeout(() => {
                  // router.back();
                  router.push('/');
                }, 2000);
              })

              .catch((err) => {
                toast.error(err?.data?.error?.message);
              });
          }}
        >
          <div className=' mx-auto  w-full '>
            <div className=''>
              <div className=' w-full'>
                <input
                  className='m-[10px] h-[50px]  w-full rounded-xl border border-gray-300  bg-transparent px-3 text-md text-gray-900 focus:border-[#009E60] focus:outline-none focus:ring-0'
                  name='userName'
                  placeholder='Please enter your username'
                />
              </div>
              <div className='relative w-full'>
                <input
                  className='m-[10px]  h-[50px] w-full rounded-xl border  border-gray-300 bg-transparent text-md text-gray-900 focus:border-[#009E60] focus:outline-none focus:ring-0'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Password '
                  required
                />
                {showPassword ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    onClick={() => setShowPassword(false)}
                    className='absolute right-1 top-[40%] cursor-pointer '
                    viewBox='0 0 16 16'
                  >
                    <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z' />
                    <path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z' />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    onClick={() => setShowPassword(true)}
                    className='absolute right-1 top-[40%] cursor-pointer  '
                    viewBox='0 0 16 16'
                  >
                    <path d='M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z' />
                    <path d='M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z' />
                    <path d='M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z' />
                  </svg>
                )}
              </div>
              <div className='font-md w-full cursor-pointer text-center text-lg text-[#575656]'>
                <Link href='/forgotPassword'>Forgot your password ?</Link>
              </div>
              <button
                // onClick={notify}
                type='submit'
                className=' m-[10px]  h-[50px] w-full rounded-xl border-2 border-[#009E60]  text-center text-[20px] text-[#009E60]'
              >
                <div className='flex w-full items-center justify-center '>
                  {login?.isLoading ? (
                    <div className=''>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        style={{
                          margin: 'auto',
                          background: 'white',
                          display: 'block',
                          shapeRendering: 'auto',
                        }}
                        width='30px'
                        height='30px'
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
                    </div>
                  ) : (
                    ' Login'
                  )}
                </div>
              </button>
            </div>
            <div className='font-md mt-3 w-full cursor-pointer  text-center  text-[#575656] '>
              <div className=''>
                <Link href='/auth/register' passHref>
                  <span className=''>
                    {' '}
                    Don&apos;t have an account?{' '}
                    <span className='text-green-600'>Create account</span>
                  </span>
                </Link>
              </div>
              <div className=' mt-4 pb-3'>
                <Link href='/products'>Return to store</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoginPage;
