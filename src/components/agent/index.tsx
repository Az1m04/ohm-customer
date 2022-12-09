import { useRouter } from 'next/router';
import React from 'react';

import { useRegister } from '@/hooks/auth/register/useRegister';

const threeCards = [
  {
    id: 1,
    img: '/images/editicon.png',
    heading: 'Lifetime Free Property Listings and Leads',

    para: 'Square Yards’ online Property Listing Service costs you nothing. Not Today. Not Ever.',
  },
  {
    id: 2,
    img: '/images/searchicon.png',
    heading: 'Lifetime Free Property Listings and Leads',

    para: 'Square Yards’ online Property Listing Service costs you nothing. Not Today. Not Ever.',
  },
  {
    id: 3,
    img: '/images/expert.png',
    heading: 'Lifetime Free Property Listings and Leads',

    para: 'Square Yards’ online Property Listing Service costs you nothing. Not Today. Not Ever.',
  },
];

const headerCards = [
  {
    id: 1,
    img: '/images/editicon.png',
    heading: '1 Million+ Property Options',
  },
  {
    id: 2,
    img: '/images/searchicon.png',
    heading: 'Lifetime Free Property Listings and Leads',
  },
  {
    id: 3,
    img: '/images/expert.png',
    heading: 'Lifetime Free Property Listings and Leads',
  },
  {
    id: 4,
    img: '/images/expert.png',
    heading: 'Lifetime Free Property Listings and Leads',
  },
];

const Agent = () => {
  const register = useRegister();

  const router = useRouter();

  return (
    <>
      <div
        className='
    py-	bg-cover	  bg-center bg-no-repeat py-24'
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.82)), url('images/project-img.jpg')",
        }}
        // style={{
        //   backgroundImage:
        //     'linearGradient(180deg, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.82)), url("images/project-img.jpg")',
        //   backgroundPosition: '0px 0px, 50% 100%',
        //   backgroundSize: 'auto, cover',
        //   backgroundRepeat: 'repeat, no-repeat',
        // }}
      >
        <div className='container mx-auto grid grid-flow-row grid-cols-2 items-center space-x-48'>
          <div>
            <div className='text-[50px] text-white'>
              Let us find a Buyer/Tenant for you absolutely free
            </div>
            <div className=' mb-8 text-base leading-7 text-white'>
              Listing on India’s Largest Digital Real Estate Network means
              Expert Assistance and Millions of Client Views for your Property.
            </div>
            <div className=' grid w-max grid-flow-row grid-cols-2 space-x-2'>
              {headerCards.map((item) => (
                <div
                  key={item.id}
                  className='text-regular my-2 flex  flex-row items-center rounded-md bg-white py-2 px-4 text-white'
                  style={{ background: 'rgba(79, 70, 229, 0.74)' }}
                >
                  <img src={item.img} className='mx-2 h-12 w-12 rounded-md' />

                  <div className='font-regular text-[#fff]'>{item.heading}</div>
                </div>
              ))}
            </div>
          </div>

          <div className='w-max rounded-lg bg-white py-6 px-8'>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const form = event.target as HTMLFormElement;
                const formdata = new FormData(form);
                const { name, email, password, type } = Object.fromEntries(
                  formdata.entries()
                );

           

                const registerStatus = register.mutateAsync({
                  name: name as string,
                  email: email as string,
                  password: password as string,
                  type: type as string,
                  role: 'user',
                });
                localStorage.setItem('email', email as string);
                registerStatus
                  .then(() => router.push('/auth/verify'))
                  .catch(() => {
                    return;
                  });
              }}
            >
              <div className='text-[22px] text-[#4f46e5]'>I am an</div>
              <div className='flex flex-row items-center  space-x-4'>
                <div className='my-4 flex w-48 flex-row items-center  rounded-full bg-[#dbdbdb] py-4 px-8 '>
                  <input type='radio' name='type' value='developer' />

                  <div className='mx-2'>Owner</div>
                </div>
                <div className='my-4 flex w-48 flex-row items-center  rounded-full bg-[#dbdbdb] py-4 px-8 '>
                  <input type='radio' name='type' value='agent' />

                  <div className='mx-2'>Agent</div>
                </div>
              </div>
              <div className='text-[22px] text-[#4f46e5]'>React out me at</div>
              <input
                type='text'
                placeholder='Enter your Name'
                className='w-full rounded-md border border-slate-300'
                name='name'
              />
              <div className='my-2 grid grid-flow-row grid-cols-2 space-x-2'>
                {/* <select
                  className='rounded-md border border-slate-300'
                  name='mobile'
                >
                  <option>+91</option>
                </select> */}
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='w-full rounded-md border border-slate-300'
                  name='email'
                />
                <input
                  type='password'
                  placeholder='Enter your password'
                  className='w-full rounded-md border border-slate-300'
                  name='password'
                />
              </div>

              <div className='mt-6 block w-full rounded-md bg-[#c6c3ec] pt-3 pb-3 text-center text-base text-indigo-600'>
                <button type='submit' className=' text-[18px] text-[#4f46e5]'>
                  React out me at
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='container mx-auto my-10 w-fit'>
        <div className='grid grid-cols-3 gap-32  '>
          {threeCards.map((items) => (
            <div
              className='max-w-sm rounded-xl border border-slate-200  bg-white shadow-md '
              key={items.id}
            >
              <a href='#!' data-mdb-ripple='true' data-mdb-ripple-color='light'>
                <img
                  className='mx-4  mt-4 h-20 w-20 rounded-full bg-[#4f46e5] p-4 '
                  src={items.img}
                  alt=''
                />
              </a>
              <div className='p-6'>
                <h5 className='mb-2 text-xl font-medium text-gray-900'>
                  {items.heading}
                </h5>
                <p className='mb-4 text-base text-gray-700'>{items.para}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=' container mx-96 grid  grid-flow-col items-center justify-center gap-16 bg-white '>
        <div className='px-auto'>
          <img src='/images/postproperty1.png' />
        </div>
        <div className='mr-72'>
          <div className='text-[16px] font-bold  '>How it Works</div>
          <div className='mt-0 mb-5 text-4xl font-bold text-gray-900 '>
            Create a Killer Property Listing.
          </div>
          <div className='text-base leading-9 '>
            For Rocket Fast Deals, create a listing with every detail, like the
            property type, your expected price and other advantages of the
            property. Property pictures are very important. Tip: Listings with
            at least 5 great pics get maximum enquiries.
          </div>
        </div>
      </div>
      <div className='my-10 grid grid-flow-col items-center justify-center gap-16 bg-[#dfddff] py-14 px-96 '>
        <div className=''>
          <div className='text-[16px] font-bold  '>How it Works</div>
          <div className='mt-0 mb-5 text-4xl font-bold text-gray-900 '>
            Create a Killer Property Listing.
          </div>
          <div className='text-base leading-9 '>
            For Rocket Fast Deals, create a listing with every detail, like the
            property type, your expected price and other advantages of the
            property. Property pictures are very important. Tip: Listings with
            at least 5 great pics get maximum enquiries.
          </div>
        </div>
        <div className=''>
          <img src='/images/Properties2.png' />
        </div>
      </div>
      <div className=' container mx-96 grid  grid-flow-col items-center justify-center gap-16 bg-white '>
        <div className='px-auto'>
          <img src='/images/postproperty1.png' />
        </div>
        <div className='mr-72'>
          <div className='text-[16px] font-bold  '>How it Works</div>
          <div className='mt-0 mb-5 text-4xl font-bold text-gray-900 '>
            Create a Killer Property Listing.
          </div>
          <div className='text-base leading-9 '>
            For Rocket Fast Deals, create a listing with every detail, like the
            property type, your expected price and other advantages of the
            property. Property pictures are very important. Tip: Listings with
            at least 5 great pics get maximum enquiries.
          </div>
        </div>
      </div>
      <div className='my-10 grid grid-flow-col items-center justify-center gap-16 bg-[#dfddff] py-14 px-96 '>
        <div className=''>
          <div className='text-[16px] font-bold  '>How it Works</div>
          <div className='mt-0 mb-5 text-4xl font-bold text-gray-900 '>
            Create a Killer Property Listing.
          </div>
          <div className='text-base leading-9 '>
            For Rocket Fast Deals, create a listing with every detail, like the
            property type, your expected price and other advantages of the
            property. Property pictures are very important. Tip: Listings with
            at least 5 great pics get maximum enquiries.
          </div>
        </div>
        <div className=''>
          <img src='/images/Properties2.png' />
        </div>
      </div>
      <div className='my-10 text-center'>
        <div className='text-[28px] font-semibold text-black '>
          Frequently asked questions
        </div>
        <div className='container my-8  mx-96  w-fit  items-center'>
          {/* <Accordion /> */}
        </div>
      </div>
    </>
  );
};

export default Agent;
