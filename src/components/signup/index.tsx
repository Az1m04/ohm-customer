import { State } from 'country-state-city';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import AuthServices from '@/services/auth/AuthServices';

const { register: registerService } = new AuthServices();

import { useRegister } from '@/hooks/auth/register/useRegister';
// import Notification from '../notification/Notification';
function getfileobj(file: any) {
  console.log(file, 'file');
  let localUri = file.name;
  let filename = localUri?.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  return {
    type,
    name: filename,
    uri: localUri,
  };
}
const SignupPage = () => {
  const router = useRouter();
  const [resaleCertificate, setResaleCertificate] = useState<any>([]);
  const [einCertificate, setEinCertificate] = useState<any>([]);
  const [phoneNumber, setPhoneNumber] = useState();
  const [stateCode, setStateCode] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(!!stateCode, 'state');
  const register = useRegister();
  const [address, setAddress] = useState({
    address: '',
    city: '',
    state_code: '',
    postal_code: '',
  });
  function showFileName() {
    const fil: any = document.getElementById('myFile');
    alert(fil.value);
  }

  return (
    <>
      <div className='container mx-auto max-w-screen-lg  py-[40px] px-[20px]'>
        <ToastContainer />

        <div className=' mx-auto w-full '>
          <div className='mt-2 mb-8 text-left text-[25px] font-semibold text-[#009E60]'>
            Register
          </div>
          <form
            onSubmit={(e) => {
              if (!!stateCode === false) {
                e.preventDefault();

                toast.error('Select State');
              } else if (!!stateCode === true) {
                e.preventDefault();
                const form = e?.target as HTMLFormElement;
                setLoading(true);
                const formdata = new FormData(form);

                const newPhone = formdata.get('phone') as string;
                formdata.append('phone', newPhone);
                formdata.append(
                  'resaleCertificate',
                  resaleCertificate[0]?.data
                );
                const data = {
                  address_line_1: address?.address,
                  city: address?.city,
                  state_code: address?.state_code,
                  postal_code: address?.postal_code,
                };

                formdata.append('address', JSON.stringify(data));

                formdata.append('einCertificate', einCertificate[0]?.data);
                console.log(formdata.get('password'), 'password');

                const a = formdata.get('password') as string;
                const b = formdata.get('confirmPassword') as string;
                console.log(a, b);
                if (a != b) {
                  toast.error('Password do not match');
                  setLoading(false);
                } else if (a === b) {
                  register
                    .mutateAsync({ body: formdata })
                    .then((res: any) => {
                      if (res?.success === true) {
                        setLoading(false);
                        toast.success('Your request sent to admin');
                        setTimeout(() => {
                          router.push('/auth/login');
                        }, 1500);
                      }
                    })

                    .catch((err) => {
                      setLoading(false);
                      console.log(err);

                      toast.error(err?.message);
                    });
                }
              }
            }}
            className=''
          >
            <div className='grid grid-cols-2 gap-4 '>
              {/* First Name */}
              <div className=' w-full'>
                <label className='   text-[14px] font-semibold text-gray-500'>
                  First Name <span className='text-red-500'>*</span>
                </label>
                <input
                  className=' form-control mt-[5px] h-[50px] w-full rounded-xl border  border-gray-300 bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  type='text'
                  name='firstName'
                  pattern='[a-zA-Z]+'
                  placeholder='Enter your first name'
                  required={true}
                />
              </div>
              {/* Last Name */}
              <div className=' w-full'>
                <label className='   text-[14px] font-semibold text-gray-500'>
                  Last Name <span className='text-red-500'>*</span>
                </label>
                <input
                  className=' form-control mt-[5px] h-[50px] w-full rounded-xl border  border-gray-300 bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  type='text'
                  name='lastName'
                  pattern='[a-zA-Z]*'
                  placeholder='Enter your last name'
                  required={true}
                />
              </div>
              {/* Phone */}
              <div className=' w-full'>
                <label className='   text-[14px] font-semibold text-gray-500'>
                  Business Phone <span className='text-red-500'>*</span>
                </label>
                <div className='mt-[5px] flex h-[50px] w-full items-center rounded-xl border border-gray-300'>
                  <span className='p-5'>+1</span>
                  <input
                    className='  h-[50px] w-full rounded-r-xl border border-gray-300 bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                    type='tel'
                    name='phone'
                    maxLength={10}
                    value={phoneNumber}
                    placeholder='Enter your phone number'
                    onChange={(event: any) => {
                      const phone = event.target.value.replace(/\D/g, '');
                      setPhoneNumber(phone);
                    }}
                    required={true}
                  />
                </div>
              </div>
              {/* Address */}
              <div className=' w-full'>
                <label className='   text-[14px] font-semibold text-gray-500'>
                  Address <span className='text-red-500'>*</span>
                </label>
                <input
                  className=' mt-[5px] h-[50px] w-full rounded-xl border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  placeholder='Enter your address'
                  required={true}
                  onChange={(event: any) => {
                    setAddress({
                      ...address,
                      address: event.target.value,
                    });
                  }}
                  value={address?.address}
                />
              </div>
              {/* State */}
              <div className=' w-full'>
                <label className='   text-[14px] font-semibold text-gray-500'>
                  State <span className='text-red-500'>*</span>
                </label>
                {/* <input
                  className=' mt-[5px] h-[50px] w-full rounded-xl border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  pattern='[a-zA-Z]*'
                  placeholder='Enter your state'
                  required={true}
                  onChange={(event: any) => {
                    setAddress({
                      ...address,
                      state_code: event.target.value,
                    });
                  }}
                  value={address?.state_code}
                /> */}
                <select
                  required={true}
                  className=' mt-[5px] h-[50px] w-full rounded-xl border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  onChange={(event: any) => {
                    console.log(event.target.value);
                    setStateCode(event.target.value);
                    setAddress({
                      ...address,
                      state_code: event.target.value,
                    });
                  }}
                  value={stateCode}
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
              {/* City */}
              <div className=' w-full'>
                <label className='text-[14px] font-semibold text-gray-500'>
                  City
                </label>
                <input
                  className=' mt-[5px] h-[50px] w-full rounded-xl border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  pattern='^[a-zA-Z\- ]+$'
                  placeholder='Enter your city'
                  required={true}
                  onChange={(event: any) => {
                    setAddress({
                      ...address,
                      city: event.target.value,
                    });
                  }}
                  value={address?.city}
                />
              </div>
              {/* Zip Code */}
              <div className=' w-full'>
                <label className='   text-[14px] font-semibold text-gray-500'>
                  ZipCode <span className='text-red-500'>*</span>
                </label>
                <input
                  className=' mt-[5px] h-[50px] w-full rounded-xl border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  type='tel'
                  // name='zipCode'
                  maxLength={6}
                  placeholder='Enter your zipCode'
                  required={true}
                  onChange={(event: any) => {
                    const zipCode = event.target.value.replace(/\D/g, '');
                    setAddress({
                      ...address,
                      postal_code: zipCode,
                    });
                  }}
                  value={address?.postal_code.trim()}
                />
              </div>
              {/* Company Name */}
              <div className=' w-full'>
                <label className='   text-[14px] font-semibold text-gray-500'>
                  Company Name <span className='text-red-500'>*</span>
                </label>
                <input
                  className=' mt-[5px] h-[50px] w-full rounded-xl border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  type='companyName'
                  name='companyName'
                  // pattern='[a-zA-Z]*'
                  placeholder='Enter your company name'
                  required={true}
                />
              </div>
              {/* User Name */}
              <div className=' w-full'>
                <label className='   text-[14px] font-semibold text-gray-500'>
                  Username <span className='text-red-500'>*</span>
                </label>
                <input
                  className=' mt-[5px] h-[50px] w-full rounded-xl border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  type='text'
                  name='userName'
                  placeholder='Enter your user name'
                  required={true}
                  // id='userName'
                />
              </div>
              {/* Email Address */}
              <div className=' w-full'>
                <label
                  htmlFor='floating_email'
                  className='   text-[14px] font-semibold text-gray-500'
                >
                  Email address <span className='text-red-500'>*</span>
                </label>
                <input
                  className=' mt-[5px] h-[50px] w-full rounded-xl border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  type='search'
                  name='email'
                  placeholder='Enter your email address'
                  required={true}
                  autoComplete='off'
                  onBlur={(e) => {
                    if (
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        e.target.value
                      )
                    ) {
                      return true;
                    }
                    toast.error('You have entered an invalid email address!');
                    return false;
                  }}
                />
              </div>
              {/* Password */}
              <div className=' mt-4 w-full'>
                <label className='   text-[14px] font-semibold text-gray-500'>
                  Password <span className='text-red-500'>*</span>
                </label>
                <input
                  className=' mt-[5px] h-[50px] w-full rounded-xl border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  required={true}
                  autoComplete='nope'
                />
              </div>
              {/* Confirm Password */}
              <div className=' mt-4 w-full'>
                <label className='   text-[14px] font-semibold text-gray-500'>
                  Confirm Password <span className='text-red-500'>*</span>
                </label>
                <input
                  className=' mt-[5px] h-[50px] w-full rounded-xl border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  type='password'
                  name='confirmPassword'
                  placeholder='Enter your password'
                  required={true}
                />
              </div>
            </div>
            {/* First File Upload */}
            <div className=' mt-4 w-full'>
              <div className='   text-[14px] font-semibold text-[#333333]'>
                Please attach Resale Certificate / Tobacco License
              </div>
              <div className=' w-full'>
                <input
                  type='file'
                  id='myFile'
                  // name='einCertificate'
                  value=''
                  className={`mt-2   ${einCertificate?.name && 'text-white'}`}
                  // required={!resaleCertificate?.name}
                  onChange={(e: any) => {
                    /* Get files in array form */
                    const files: any = Array.from(e.target.files);
                    /* Map each file to a promise that resolves to an array of image URI's */
                    Promise.all(
                      files.map((file: any) => {
                        return new Promise((resolve, reject) => {
                          const reader = new FileReader();
                          reader.addEventListener('load', (ev: any) => {
                            resolve(ev.target.result);
                          });
                          reader.addEventListener('error', reject);
                          reader.readAsDataURL(file);
                        });
                      })
                    ).then(
                      (data: any) => {
                        /* Once all promises are resolved, update state with image URI array */
                        // const updatedList: any = [...selectedFiles.dataArray, ...data]
                        data?.forEach((element, i) => {
                          files[i] = {
                            uri: element,
                            data: files[i],
                            id:
                              new Date().getTime().toString() +
                              Math.floor(Math.random() * 1000000),
                          };
                        });
                        setResaleCertificate(files);
                      },
                      (error) => {
                        console.error(error);
                      }
                    );
                  }}
                />

                <span className='-ml-40  pt-2'>
                  {resaleCertificate[0]?.data?.name}
                </span>
              </div>
              <div className='  mt-2 text-[14px] font-semibold text-[#333333]'>
                Please use png, jpg, jpeg or pdf format files to upload.
              </div>
            </div>

            <div className=' mt-4 w-full'>
              <div className='text-[14px] font-semibold text-[#333333]'>
                Please attach EIN Certificate
              </div>
              <div className='flex'>
                <input
                  className={`mt-2   ${einCertificate?.name && 'text-white'}`}
                  type='file'
                  value=''
                  // name='resaleCertificate'
                  // required={!einCertificate?.name}
                  onChange={(e: any) => {
                    /* Get files in array form */
                    const files: any = Array.from(e.target.files);
                    /* Map each file to a promise that resolves to an array of image URI's */
                    Promise.all(
                      files.map((file: any) => {
                        return new Promise((resolve, reject) => {
                          const reader = new FileReader();
                          reader.addEventListener('load', (ev: any) => {
                            resolve(ev.target.result);
                          });
                          reader.addEventListener('error', reject);
                          reader.readAsDataURL(file);
                        });
                      })
                    ).then(
                      (data: any) => {
                        /* Once all promises are resolved, update state with image URI array */
                        // const updatedList: any = [...selectedFiles.dataArray, ...data]
                        data?.forEach((element, i) => {
                          files[i] = {
                            uri: element,
                            data: files[i],
                            id:
                              new Date().getTime().toString() +
                              Math.floor(Math.random() * 1000000),
                          };
                        });
                        setEinCertificate(files);
                      },
                      (error) => {
                        console.error(error);
                      }
                    );
                  }}
                />
                <span className='font-italic -ml-40 pt-2'>
                  {einCertificate[0]?.data?.name}
                </span>
              </div>
              <div className=' mt-2  text-[14px] font-semibold text-[#333333]'>
                Please use png, jpg, jpeg or pdf format files to upload.
              </div>
              <p className='mt-3 text-[14px]'>
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our privacy policy.
              </p>
            </div>
            {loading ? (
              <div className=' mt-[30px] h-[50px] w-[160px] rounded-xl border-2 border-[#009E60] px-[15px]  py-[9px] text-center text-[16px] font-semibold text-[#009E60]'>
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
                // onClick ={notify}
                type='submit'
                // onClick= {myFunction}
                className=' mt-[30px] h-[50px] w-[160px] rounded-xl border-2 border-[#009E60] px-[15px]  py-[9px] text-center text-[16px] font-semibold text-[#009E60]'
              >
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
function res(res: any) {
  throw new Error('Function not implemented.');
}
