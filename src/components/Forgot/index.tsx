import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { useForget } from '@/hooks/password/forgetPassword';
import { useReset } from '@/hooks/password/restPassword';
import { useOtp } from '@/hooks/password/verifyOtp';
import { useGetCurrentUsers } from '@/hooks/user/useGetCurrentUser';

import { currentUsers } from '@/store/users';

function Forgot(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loadings, setLoadings] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [verifyLoadings, setVerifyLoadings] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [navigationState, setNavigationState] = useState('forgot_password');
  const [getUsers, setUsers] = useAtom(currentUsers);
  const { refetch } = useGetCurrentUsers(setUsers);
  const router = useRouter();
  const forgetPassword = useForget();

  const resetPassword = useReset();

  const otpGenerate = useOtp();
  const [loading, setLoading] = useState(false);

  const setSendMail = (val: any) => {
    setLoading2(true);
    forgetPassword
      ?.mutateAsync({
        body: { email: val },
      })
      .then((res: any) => {
        setLoading2(false);
        toast.success('OTP has been send on your email');
        setTimeout(() => {
          setNavigationState('otp');
        }, 2000);
      })

      .catch((err) => {
        toast.error(err?.message);
        console.log(err, 'err');
        setLoading2(false);
      });
  };

  const otpGeneration = (val: any) => {
    setLoading(true);
    otpGenerate
      ?.mutateAsync({
        pathParams: { token: val },
      })
      .then((res: any) => {
        console.log(res, 'res');
        setLoading(false);
        refetch();
        toast.success('Otp verified successfully');
        setTimeout(() => {
          setNavigationState('reset_password');
        }, 2000);
      })

      .catch((err) => {
        setLoading(false);
        toast.error(err?.message);

        console.log(err, 'err');
      });
  };

  const setPasswordSuccessfull = (val: any) => {
    setLoading(true);
    resetPassword
      ?.mutateAsync({
        pathParams: { token: val },
      })
      .then((res: any) => {
        setLoading(false);
        refetch();
        toast.success('Password updated successfully');
        setTimeout(() => {
          router.push('/auth/login');
        }, 1200);
      })

      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };
  const [emailError, setEmailError] = useState(false);

  const pin1Ref: any = React.useRef(null);
  const pin2Ref: any = React.useRef();
  const pin3Ref: any = React.useRef();
  const pin4Ref: any = React.useRef();
  const [pin1, setPin1] = useState<any>(null);
  const [pin2, setPin2] = useState<any>(null);
  const [pin3, setPin3] = useState<any>(null);
  const [pin4, setPin4] = useState<any>(null);
  const pincode: any = [pin1, pin2, pin3, pin4];
  const nulldata = pincode?.every((item) => item === null);
  return (
    <div className='mt-24 mb-24 '>
      <ToastContainer />
      <div
        className='bg-[] mx-auto mt-7  h-auto  w-1/3 items-center justify-center  border border-gray-300 p-5  '
        style={{ height: '350px' }}
      >
        {navigationState === 'forgot_password' ? (
          <>
            <div className='mb-4 px-8 text-center'>
              <h3 className='mb-2 pt-4 text-2xl text-[#009e60]'>
                Enter Email Address
              </h3>
            </div>
            <form className='mb-4 rounded bg-white px-8 pt-6 pb-8'>
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-bold text-gray-700'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className='focus:shadow-outline appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none md:w-full'
                  id='email'
                  type='email'
                  value={email}
                  placeholder='Enter Email Address...'
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
              {emailError ? (
                <div className='mt-1 font-medium text-red-600'></div>
              ) : (
                <></>
              )}
              <div className='mb-6 text-center'>
                {loading2 ? (
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
                  <button
                    className='focus:shadow-outline hover: w-full rounded-full bg-[#009e60] px-4 py-2 font-bold text-white focus:outline-none'
                    type='button'
                    onClick={() => {
                      if (!!email === false) {
                        toast.error('Please enter email');
                      } else {
                        setSendMail(email);
                      }
                    }}
                  >
                    Reset Password
                  </button>
                )}
              </div>
              <hr className='mb-6 border-t' />
            </form>
          </>
        ) : (
          <></>
        )}
        {navigationState === 'otp' ? (
          <>
            <div className='login_form '>
              <h2 className='text-center text-[#009e60]'> OTP Verification</h2>
              <div className='my-24 flex justify-center'>
                <input
                  ref={pin1Ref}
                  className='mx-2 w-[10px] border border-[#009e60]'
                  maxLength={1}
                  value={pin1}
                  onChange={(e: any) => {
                    setPin1(e.target.value);
                    if (e.target.value.length > 0) {
                      pin2Ref.current.focus();
                    }
                  }}
                  onKeyPress={({ nativeEvent }: any) => {
                    if (pin1) {
                      pin2Ref.current.focus();
                      setPin2(nativeEvent.key);
                    }
                  }}
                  placeholder=''
                  style={{ width: 60, height: 60, textAlign: 'center' }}
                />
                <input
                  ref={pin2Ref}
                  className='mx-2 w-[10px] border border-[#009e60]'
                  maxLength={1}
                  value={pin2}
                  onChange={(e: any) => {
                    setPin2(e.target.value);
                    if (e.target.value.length > 0) {
                      pin3Ref.current.focus();
                    } else if (
                      e.nativeEvent.inputType === 'deleteContentBackward'
                    ) {
                      pin1Ref.current.focus();
                    }
                  }}
                  placeholder=''
                  onKeyPress={({ nativeEvent }: any) => {
                    if (pin2) {
                      pin3Ref.current.focus();
                      setPin3(nativeEvent.key);
                    }
                  }}
                  style={{ width: 60, height: 60, textAlign: 'center' }}
                />
                <input
                  ref={pin3Ref}
                  className='mx-2  border border-[#009e60]'
                  maxLength={1}
                  value={pin3}
                  onChange={(e: any) => {
                    setPin3(e.target.value);
                    if (e.target.value.length > 0) {
                      pin4Ref.current.focus();
                    } else if (
                      e.nativeEvent.inputType === 'deleteContentBackward'
                    ) {
                      pin2Ref.current.focus();
                    }
                  }}
                  onKeyPress={({ nativeEvent }: any) => {
                    if (pin3) {
                      pin4Ref.current.focus();
                      setPin4(nativeEvent.key);
                    }
                  }}
                  placeholder=''
                  style={{ width: 60, height: 60, textAlign: 'center' }}
                />
                <input
                  ref={pin4Ref}
                  className='mx-2 w-[10px] border border-[#009e60]'
                  maxLength={1}
                  value={pin4}
                  onChange={(e: any) => {
                    setPin4(e.target.value);

                    if (e.target.value.length > 0) {
                      pin4Ref.current.focus();
                    } else if (
                      e.nativeEvent.inputType === 'deleteContentBackward'
                    ) {
                      pin3Ref.current.focus();
                    }
                  }}
                  placeholder=''
                  onKeyPress={(event) => {
                    // if (nativeEvent.key === 'BackSpace') {
                    //   pin3Ref.current.focus();
                    // }
                  }}
                  style={{ width: 60, height: 60, textAlign: 'center' }}
                />
              </div>
              <div className='-mt-6 flex justify-between'>
                <div>
                  {loading2 ? (
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
                    <button
                      className='focus:shadow-outline hover: w-full rounded-full bg-[#009e60] px-4 py-2 font-bold text-white focus:outline-none'
                      type='button'
                      onClick={() => {
                        setSendMail(email);
                      }}
                    >
                      Resend otp
                    </button>
                  )}
                </div>
                <div className='mb-6 text-center'>
                  {loading ? (
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
                    <button
                      className='focus:shadow-outline hover: w-full rounded-full bg-[#009e60] px-4 py-2 font-bold text-white focus:outline-none'
                      type='button'
                      onClick={() => {
                        if (nulldata === true) {
                          toast.error('Please enter otp');
                        } else {
                          otpGeneration(btoa(`${email}-${pincode.join('')}`));
                        }
                      }}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {navigationState === 'reset_password' ? (
          <>
            <div className='mb-4 px-8 text-center'>
              <h3 className='mb-2 pt-4 text-2xl text-[#009e60]'>
                Reset Password
              </h3>
            </div>
            <form className='mb-4 rounded bg-white px-8 pt-6 pb-8'>
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-bold text-gray-700'
                  htmlFor='email'
                >
                  Enter Password
                </label>
                <input
                  className='focus:shadow-outline appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none md:w-full'
                  id='email'
                  type='email'
                  value={password}
                  placeholder='Enter Password...'
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-bold text-gray-700'
                  htmlFor='email'
                >
                  Confirm Password
                </label>
                <input
                  className='focus:shadow-outline appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none md:w-full'
                  id='email'
                  type='email'
                  value={repeatPassword}
                  placeholder='Confirm Password...'
                  onChange={(event) => setRepeatPassword(event.target.value)}
                />
              </div>
              <div className='mb-6 text-center'>
                {loading ? (
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
                  <button
                    className='focus:shadow-outline w-full rounded-full bg-[#009e60] px-4 py-2 font-bold text-white hover:bg-[#009e60] focus:outline-none'
                    type='button'
                    onClick={() => {
                      if (password !== repeatPassword) {
                        toast.error('Password dont match');
                      } else {
                        setPasswordSuccessfull(btoa(`${email}-${password}`));
                      }
                    }}
                  >
                    Change Password
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
//  setNavigationState('forgot_password');
export default Forgot;
