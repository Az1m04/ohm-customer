import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useAddContact } from '@/hooks/contact/mutation';

import customerSupport from '../../assets/img/customerSupport.png';
import emailAddress from '../../assets/img/emailAddress.png';
import location from '../../assets/img/location-black.png';

const Contact = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [phoneNumber, setPhoneNumber] = useState();
  const [result, setResult] = useState<any>({});
  const form = useRef(null);

  // const [loading, setLoading] = useState(false);

  const contactData = [
    {
      id: 1,
      title: 'Customer Support',
      description: '+1 (203) 725-5206',
      img: customerSupport,
    },
    {
      id: 2,
      title: 'Location',
      description: '846 Wolcott,Waterbury,06705 Connecticut',
      img: location,
    },
    {
      id: 3,
      title: 'Email Address',
      description: 'ohmwholesales@gmail.com',
      img: emailAddress,
    },
  ];

  const addContact: any = useAddContact();

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event?.target as HTMLFormElement;

    const formdata = new FormData(form);
    const newPhone = ('+1' + formdata.get('phone')) as string;

    const data = {
      firstName: formdata.get('firstName') as string,
      lastName: formdata.get('lastName') as string,
      email: formdata.get('email') as string,
      phone: newPhone,
      description: formdata.get('description') as string,
    };

    addContact
      .mutateAsync({ body: data })
      .then((res) => {
        setResult(res);
        toast.success('Your request has been submitted successfully');
      })
      .catch(() => {
        toast.error('Request already submitted');
      });
  };

  return (
    <div className=' mt mx-auto justify-center sm:mt-[20] md:container md:mt-[120px] lg:mt-[120px] xl:mt-[120px]'>
      <div className='md:w-34 md:flex-cols  mt-[30px] flex flex-wrap items-center justify-center gap-10   md:mx-[52px] '>
        {contactData?.map((item) => (
          <div
            key={item?.id}
            className='border-grey-100 h-[226px] w-[390px] max-w-sm overflow-hidden rounded-md border-2 border-solid bg-[#eeeeee] p-[30px] shadow-sm hover:border-[#009E60] '
          >
            <div className='flex w-full justify-center border-green-600'>
              <div className='h-[90px] w-[90px] rounded-full border-2 border-[#009e60] bg-white p-5 '>
                <Image src={item.img} alt={item.description} />
              </div>
            </div>
            <div className='w-full  py-4'>
              <div className='mb-2 w-full text-center text-xl font-bold text-[#009e60]'>
                {item?.title}
              </div>
              <p className='text-center text-[15px] text-[#7d7d7d]'>
                {item?.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className=' mb-[100px] mt-[100px] flex flex-col justify-between px-2 md:mx-[52px] md:px-5 lg:flex-row '>
        <div className='leftSide  w-full justify-center  '>
          <h1 className='mt-2 mb-8 text-center text-[35px] font-semibold text-[#009E60]'>
            Contact Us
          </h1>
          <form
            ref={form}
            className='form'
            onSubmit={(e: any) => {
              submitHandler;
              e.target.reset();
            }}
          >
            <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2'>
              <div className=' w-full'>
                <label className='   font-md text-[16px]  text-[#696969BA]'>
                  First Name
                </label>
                <input
                  className=' mt-[5px] h-[50px] w-full rounded-md border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  type='name'
                  name='firstName'
                  pattern='[a-zA-Z]*'
                  placeholder='Enter your first name'
                  required
                />
              </div>
              <div className=' w-full'>
                <label className='   font-md text-[16px]  text-[#696969BA]'>
                  Last Name
                </label>
                <input
                  className=' mt-[5px] h-[50px] w-full rounded-md border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  type='name'
                  name='lastName'
                  pattern='[a-zA-Z]*'
                  placeholder='Enter your last name'
                  required
                />
              </div>
            </div>

            <div className=' mt-4 w-full'>
              <div className=' mt-4 w-full'>
                <label
                  htmlFor='floating_email'
                  className='   font-md text-[16px]  text-[#696969BA]'
                >
                  Email address
                </label>
                <input
                  className=' mt-[5px] h-[50px] w-full rounded-md border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  type='email'
                  name='email'
                  placeholder='Enter your email address'
                  required={true}
                  onBlur={(e) => {
                    if (
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        e.target.value
                      )
                    ) {
                      return true;
                    }
                    alert('You have entered an invalid email address!');
                    return false;
                  }}
                />
              </div>
              <div className=' mt-4 w-full'>
                <label className='   font-md text-[16px]  text-[#696969BA]'>
                  Phone Number
                </label>
                <div className='mt-[5px] flex h-[50px] w-full items-center rounded-md border border-gray-300'>
                  <span className='p-5'>+1</span>
                  <input
                    minLength={10}
                    className='  h-[50px] w-full rounded-r-md border border-gray-300 bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                    type='tel'
                    name='phone'
                    value={phoneNumber}
                    onChange={(event: any) => {
                      const phone = event.target.value.replace(/\D/g, '');
                      setPhoneNumber(phone);
                    }}
                    placeholder='Enter your phone number'
                    required={true}
                  />
                </div>
              </div>
              <div className=' mt-5 w-full'>
                <label className='   font-md text-[16px]  text-[#696969BA]'>
                  Message
                </label>

                <textarea
                  className='   mt-[5px]  w-full rounded-md border border-gray-300  bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                  rows={5}
                  cols={50}
                  name='description'
                  placeholder='Enter your message'
                />
              </div>
            </div>

            <button
              type='submit'
              className=' mt-[30px] h-[50px] w-full rounded-md bg-[#009E60] px-[15px] py-[9px]  text-center text-[18px] font-semibold text-white focus:outline-none'
            >
              <div className='flex items-center justify-center'>
                {addContact?.isLoading && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    style={{
                      background: 'none',
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
                      stroke='#ffff'
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
                )}
                <div className='ml-2'> Submit</div>
              </div>
            </button>
            <ToastContainer />
          </form>
        </div>
        <div className='rightSide  flex w-full  items-center justify-center pt-[80px]  '>
          <div className='locationImage mx-4 h-[250px] w-full  lg:h-[500px]'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2985.2222398566696!2d-73.01106498432549!3d41.56443449296309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7c0c4f77576f3%3A0x7455a6176a58177a!2s846%20Wolcott%20St%2C%20Waterbury%2C%20CT%2006705!5e0!3m2!1sen!2sus!4v1652344398093!5m2!1sen!2sus'
              frameBorder='0'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen={true}
              tabIndex={0}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
