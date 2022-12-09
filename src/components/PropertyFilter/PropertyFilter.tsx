import { useAtom } from 'jotai';
import React, { useEffect, useRef } from 'react';

import { useGetProperty } from '@/hooks/property/useGetProperty';

import { allPropertyAtoms } from '@/store/property';

// const imgs = [
//   {
//     id: '1',
//     imgpath: '/images/1.jpg',
//     name: 'JP Codename Hotcake',
//     price: '350000',
//   },
//   {
//     id: '1',
//     imgpath: '/images/1.jpg',
//     name: 'JP Codename Hotcake',
//     price: '350000',
//   },
//   {
//     id: '1',
//     imgpath: '/images/1.jpg',
//     name: 'JP Codename Hotcake',
//     price: '350000',
//   },
//   {
//     id: '1',
//     imgpath: '/images/1.jpg',
//     name: 'JP Codename Hotcake',
//     price: '350000',
//   },
//   {
//     id: '1',
//     imgpath: '/images/1.jpg',
//     name: 'JP Codename Hotcake',
//     price: '350000',
//   },
//   {
//     id: '1',
//     imgpath: '/images/1.jpg',
//     name: 'JP Codename Hotcake',
//     price: '350000',
//   },
// ];

const svg = [
  {
    id: '1',
    svgpath: '',
  },
  {
    id: '2',
    svgpath: '',
  },
  {
    id: '3',
    svgpath: '',
  },
  {
    id: '4',
    svgpath: '',
  },
  {
    id: '5',
    svgpath: '',
  },
];

const checkboxes = [
  {
    id: '1',
    checkbox: '',
    propertyName: 'Apartment',
  },
  {
    id: '1',
    checkbox: '',
    propertyName: 'Apartment',
  },
  {
    id: '1',
    checkbox: '',
    propertyName: 'Apartment',
  },
  {
    id: '1',
    checkbox: '',
    propertyName: 'Apartment',
  },
  {
    id: '1',
    checkbox: '',
    propertyName: 'Apartment',
  },
  {
    id: '1',
    checkbox: '',
    propertyName: 'Apartment',
  },
  {
    id: '1',
    checkbox: '',
    propertyName: 'Apartment',
  },
  {
    id: '1',
    checkbox: '',
    propertyName: 'Apartment',
  },
];

const PropertyFilter = () => {
  const [allProperty, setAllProperty] = useAtom(allPropertyAtoms);
  const form = useRef<HTMLFormElement>(null);
  const allProperties = useGetProperty();

  const getAllProperty = async () => {
    const res = await allProperties.mutateAsync().then((res) => res);
    setAllProperty(res);
  };

  useEffect(() => {
    getAllProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='my-5 mx-20 flex flex-row flex-wrap'>
      <div className='mx-2 w-full max-w-xs  rounded-lg p-4 shadow-lg'>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formdata = new FormData(form);
            // formdata.entries();
            const data = Object.fromEntries(formdata.entries());
          }}
          // onChange={(event) => {
          //   event.preventDefault();
          // }}
        >
          <button
            type='submit'
            className=' float-right  rounded-sm bg-[#4F46E5] px-5 py-1 text-white'
          >
            Filter
          </button>

          <div className='normal  float-none  py-2  text-[18px] font-semibold leading-[2.6rem] text-[#666276]'>
            Building Type
          </div>

          <div className='flex flex-row'>
            <span className='px-2'>
              {' '}
              <input
                type='checkbox'
                name='commercial'
                className='rounded-sm border-blue-700'
              />
            </span>
            <span className='normal font-regular  text-[16px] leading-[1.6rem] text-[#666276]'>
              Commercial
            </span>
          </div>

          <div className='flex flex-row'>
            <span className='px-2'>
              {' '}
              <input
                type='checkbox'
                name='residential'
                className='rounded-sm border-blue-700'
              />
            </span>
            <span className='normal font-regular  text-[16px] leading-[1.6rem] text-[#666276]'>
              Residential
            </span>
          </div>

          <div className='normal py-2 text-[18px] font-semibold leading-[2.6rem] text-[#666276]'>
            Property Type
          </div>

          <div className='px-2'>
            {checkboxes.map((check) => (
              <div key={check.id}>
                <input
                  type='checkbox'
                  name={check.propertyName}
                  className=' rounded-sm border-blue-700'
                />
                <span
                  // key={check.propertyName}
                  className='normal font-regular  px-2 text-center text-[14px] leading-[2.6rem] text-[#666276] '
                >
                  {check.propertyName}
                </span>
              </div>
            ))}
          </div>
        </form>
      </div>

      <div className='flex flex-row flex-wrap'>
        {allProperty.map((imgs) => (
          <div
            className='mx-2 max-w-xs  rounded-lg shadow-lg  '
            key={imgs?._id}
          >
            <div
              style={{
                height: 0,
                width: 136,

                color: 'rgb(255 255 255)',
                position: 'absolute',

                borderTop: '35px solid rgb(252 211 77)',
                borderRight: '35px solid transparent',
              }}
            >
              <div className='normal absolute  bottom-1 left-2 text-[14px]  font-semibold leading-[1.6rem] text-[#000]'>
                New Order
              </div>
            </div>
            <img
              src='/images/1.jpg'
              alt=''
              className='h-48 w-full object-cover '
            />

            <div className='px-6 py-4'>
              <h4 className='mb-3 text-xl font-semibold tracking-tight text-gray-800'>
                {imgs.projectName}
              </h4>
              <div className='mx-auto my-1 flex flex-row '>
                {svg.map((svgs) => (
                  <svg
                    key={svgs.svgpath}
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='star'
                    className='mr-1  w-4  text-yellow-500'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 576 512'
                  >
                    <path
                      fill='currentColor'
                      d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z'
                    ></path>
                  </svg>
                ))}
              </div>
              <p className='leading-normal text-gray-700'>
                Lorem ipsum dolor, sit amet cons ectetur adipis icing elit.
                Praesen tium, quibusdam facere quo laborum maiores sequi nam
                tenetur laud.{' '}
                <span className=' font-regualar text-xs tracking-tight  text-[#4F46E5] '>
                  Read More....
                </span>
              </p>
              <div className='mb-3 text-xl font-semibold tracking-tight  text-[#4F46E5] '>
                ₹ {imgs.maintenance}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFilter;
