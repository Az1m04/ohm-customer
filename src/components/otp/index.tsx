import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import { useVerify } from '@/hooks/auth/verify/useVerify';

const OtpPage = () => {
  const [keyPressed, setKeyPressed] = useState<number>(0);
  const [error, setError] = useState('');
  const [email, setEmail] = useState<string | null>('');
  const verify = useVerify();
  const router = useRouter();

  useEffect(() => {
    if (localStorage) {
      setEmail(localStorage.getItem('email'));
    }
  }, []);
  const inputRef: any = {
    input1: useRef<HTMLInputElement>(null),
    input2: useRef<HTMLInputElement>(null),
    input3: useRef<HTMLInputElement>(null),
    input4: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    inputRef?.input1?.current?.focus();
  }, []);
  return (
    <>
      <div
        className='relative flex h-64 items-center justify-center'
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(/images/loginbanner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className='container mx-auto max-w-lg'>
        <div className='relative bottom-28 mx-auto  w-full  rounded-lg border border-white bg-white px-8 py-6 text-center shadow-md '>
          <img
            src='/images/graylogo.png'
            className='mx-auto'
            width={180}
            height={180}
          />
          {!email && (
            <>
              <h1 className='mt-6 text-xl font-semibold text-[#4f46e5]'>
                Enter your email
              </h1>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = event.target as HTMLFormElement;
                  const formdata = new FormData(form);
                  const { email } = Object.fromEntries(formdata.entries());
                }}
                className='mx-10 mt-7 text-left'
              >
                <div className='group relative z-0 mb-6 w-full'>
                  <input
                    className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                    type='name'
                    name='username'
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='floating_email'
                    className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
                  >
                    Email Address
                  </label>
                </div>
                <div className='my-5 flex justify-center space-x-5 text-center'>
                  <button
                    type='submit'
                    className='flex cursor-pointer items-center rounded-md bg-blue-700 px-3 py-3 text-white hover:bg-blue-800'
                  >
                    <span className='font-bold'>Send OTP</span>
                    <i className='bx bx-caret-right ml-1'></i>
                  </button>
                </div>
              </form>
            </>
          )}
          {email && (
            <>
              <h1 className='mt-10 text-xl font-semibold text-[#4f46e5]'>
                OTP Verification
              </h1>
              <div className='mt-4 flex flex-col'>
                <span>Enter the OTP you received at</span>
                <span className='font-bold'>{email}</span>
              </div>
              <form
                className='mt-10'
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = event.target as HTMLFormElement;
                  const formdata = new FormData(form);
                  const rawOtpObj = Object.fromEntries(formdata.entries());
                  const otp = Object.values(rawOtpObj).join('');

                  const verifyStatus = verify.mutateAsync({
                    email: email as string,
                    otp,
                  });

                  verifyStatus
                    .then(() => router.push('/'))
                    .catch((error) => setError(error));
                }}
                onChange={(event: any) => {
                  const form = event.target as HTMLInputElement;
                  const nextRef = 'input' + (+form.name.slice(5) + 1);
                  const prevRef = 'input' + (+form.name.slice(5) - 1);
                  if (keyPressed !== 8) {
                    if (nextRef !== 'input5') {
                      inputRef[nextRef].current.focus();
                    }
                  } else {
                    if (prevRef !== 'input0' && event.target.value) {
                      inputRef[prevRef].current.focus();
                    }
                  }
                }}
                onKeyDown={(event: any) => {
                  const form = event.target as HTMLInputElement;
                  setKeyPressed(event?.keyCode);
                  const prevRef = 'input' + (+form.name.slice(5) - 1);
                  if (
                    prevRef !== 'input0' &&
                    !event.target.value &&
                    event?.keyCode === 8
                  ) {
                    inputRef[prevRef].current.focus();
                  }
                }}
              >
                <div className='mt-5 flex flex-row justify-center px-2 text-center'>
                  <input
                    className='form-control m-2 h-10 w-10 rounded border text-center'
                    type='text'
                    name='input1'
                    ref={inputRef.input1}
                    maxLength={1}
                  />
                  <input
                    className='form-control m-2 h-10 w-10 rounded border text-center'
                    type='text'
                    name='input2'
                    ref={inputRef.input2}
                    // onChange={handleInputfocus}
                    maxLength={1}
                  />
                  <input
                    className='form-control m-2 h-10 w-10 rounded border text-center'
                    type='text'
                    ref={inputRef.input3}
                    name='input3'
                    // onChange={handleInputfocus}
                    maxLength={1}
                  />
                  <input
                    className='form-control m-2 h-10 w-10 rounded border text-center'
                    type='text'
                    ref={inputRef.input4}
                    name='input4'
                    // onChange={handleInputfocus}
                    maxLength={1}
                  />
                </div>
                <div className='my-10 flex justify-center space-x-5 text-center'>
                  <button
                    type='button'
                    className='flex cursor-pointer items-center text-blue-700 hover:text-blue-900'
                  >
                    <span className='font-bold'>Resend OTP</span>
                    <i className='bx bx-caret-right ml-1'></i>
                  </button>
                  <button
                    type='submit'
                    className='flex cursor-pointer items-center rounded-md bg-blue-700 px-3 py-3 text-white hover:bg-blue-800'
                  >
                    <span className='font-bold'>Verify OTP</span>
                    <i className='bx bx-caret-right ml-1'></i>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OtpPage;
