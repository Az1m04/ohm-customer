import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';

import { useRequestCallback } from '@/hooks/property/requestCallback/useRequestCallback';
import { useGetProperty } from '@/hooks/property/useGetProperty';

const cardBoxses = [
  {
    id: 1,
    img: '/images/project-img.jpg',
    heading: 'JP Codename Hotcake    ',
    shortDes: 'Mira Bhayandar, Mumbai',
    price: '₹ 61.99 Lac to 87.42 Lac',
    BHK: '1 BHK-2 BHK Flat ',
    Squre: '295 Sq. Ft. to 416 Sq. Ft. (Carpet)',
    Des: 'JP Codename Hotcake Mumbai is a premium residential project offering',

    apartment: [
      {
        id: 1,
        ApartmentImg: '/images/1bhk-295sqft-1.jpg',
        ApartmentName: '1 BHK 295 Sq. Ft. Apartment',
        ApartmentLac: '61.77Lac',
        ApartmentDes: '295 Sq. Ft.(Carpet)',
      },
      {
        id: 2,
        ApartmentImg: '/images/1bhk-295sqft-1.jpg',
        ApartmentName: '1 BHK 295 Sq. Ft. Apartment',
        ApartmentLac: '61.77Lac',
        ApartmentDes: '295 Sq. Ft.(Carpet)',
      },
    ],
    jpnorth: [
      {
        id: 1,
        ApartmentImg: '/images/icon11.png',
        ApartmentName: '1 BHK 295 Sq. Ft. Apartment',
        ApartmentLac: '61.77Lac',
        ApartmentDes: '295 Sq. Ft.(Carpet)',
      },
      {
        id: 2,
        ApartmentImg: '/images/icon12.png',
        ApartmentName: '1 BHK 295 Sq. Ft. Apartment',
        ApartmentLac: '61.77Lac',
        ApartmentDes: '295 Sq. Ft.(Carpet)',
      },
      {
        id: 3,
        ApartmentImg: '/images/icon13.png',
        ApartmentName: '1 BHK 295 Sq. Ft. Apartment',
        ApartmentLac: '61.77Lac',
        ApartmentDes: '295 Sq. Ft.(Carpet)',
      },
    ],
  },
  {
    id: 2,
    img: '/images/project-img.jpg',
    heading: 'JP Codename Hotcake    ',
    shortDes: 'Mira Bhayandar, Mumbai',
    price: '₹ 61.99 Lac to 87.42 Lac',
    BHK: '1 BHK-2 BHK Flat ',
    Squre: '295 Sq. Ft. to 416 Sq. Ft. (Carpet)',
    Des: 'JP Codename Hotcake Mumbai is a premium residential project offering',

    apartment: [
      {
        id: 1,
        ApartmentImg: '/images/1bhk-295sqft-1.jpg',
        ApartmentName: '1 BHK 295 Sq. Ft. Apartment',
        ApartmentLac: '61.77Lac',
        ApartmentDes: '295 Sq. Ft.(Carpet)',
      },
      {
        id: 2,
        ApartmentImg: '/images/1bhk-295sqft-1.jpg',
        ApartmentName: '1 BHK 295 Sq. Ft. Apartment',
        ApartmentLac: '61.77Lac',
        ApartmentDes: '295 Sq. Ft.(Carpet)',
      },
    ],
    jpnorth: [
      {
        id: 1,
        ApartmentImg: '/images/icon11.png',
        ApartmentName: '1 BHK 295 Sq. Ft. Apartment',
        ApartmentLac: '61.77Lac',
        ApartmentDes: '295 Sq. Ft.(Carpet)',
      },
      {
        id: 2,
        ApartmentImg: '/images/icon12.png',
        ApartmentName: '1 BHK 295 Sq. Ft. Apartment',
        ApartmentLac: '61.77Lac',
        ApartmentDes: '295 Sq. Ft.(Carpet)',
      },
      {
        id: 3,
        ApartmentImg: '/images/icon13.png',
        ApartmentName: '1 BHK 295 Sq. Ft. Apartment',
        ApartmentLac: '61.77Lac',
        ApartmentDes: '295 Sq. Ft.(Carpet)',
      },
    ],
  },
];

const citiesName = [
  { id: 27093, city: 'Mumbai' },
  { id: 19409, city: 'Pune ' },
  { id: 11869, city: 'Chennai ' },
  { id: 19478, city: 'Bangalore' },
  { id: 2070, city: 'Delhi' },
  { id: 2060, city: 'Ghaziabad ' },
  { id: 3559, city: 'Kolkata ' },
  { id: 549, city: 'Faridabad ' },
  { id: 13034, city: 'Hyderabad ' },
  { id: 192, city: 'Dehradun ' },
  { id: 1729, city: 'Vizag ' },
  { id: 1998, city: 'Lucknow ' },
  { id: 1508, city: 'Ahmedabad ' },
  { id: 1255, city: 'Vijayawada ' },
  { id: 11604, city: 'Jaipur ' },
  { id: 198, city: 'Bhopal ' },
  { id: 111, city: 'Bareilly ' },
  { id: 111, city: 'Allahabad ' },
  { id: 1384, city: 'Chandigarh ' },
  { id: 243, city: 'Meerut ' },
  { id: 235, city: 'Agra ' },
  { id: 28738, city: 'Thane ' },
  { id: 227, city: 'Sonipat ' },
  { id: 212, city: 'Bhiwadi ' },
];

const Project = () => {
  const [allProperties, setAllProperties] = useState<any>([]);
  const [showModal, setshowModal] = useState(false);
  const [property, setproperty] = useState<string>('');
  const getPropertyHook = useGetProperty();

  const router = useRouter();

  const getAllProperties = async () => {
    const res = await getPropertyHook.mutateAsync();
    setAllProperties(res);
  };

  const requestCallback = useRequestCallback();

  useEffect(() => {
    getAllProperties();
  }, []);

  return (
    <div className=''>
      <div className='bg-[#eeeefa] py-4'>
        <div className=' container mx-auto  '>
          <div className='flex w-max flex-row rounded-t-lg bg-white  px-2 py-2 text-[20px] font-semibold text-[#4f46e5]	'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              viewBox='0 0 28 20'
              fill='#000'
            >
              <path
                fillRule='evenodd'
                d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                clipRule='evenodd'
              />
            </svg>
            Cities
          </div>
          <div className='rounded-tr-lg rounded-bl-lg rounded-br-lg bg-white sm:p-8 md:p-4 lg:p-4 '>
            <div className='sm:grid sm:grid-flow-row sm:grid-cols-2 sm:gap-2 md:grid md:grid-flow-row md:grid-cols-2 md:gap-2 lg:grid lg:grid-flow-row lg:grid-cols-6 lg:gap-2'>
              {citiesName.map((items) => (
                <div key={items.id}>
                  <span className='font-regular text-[18px] text-[#000]'>
                    {items.city}
                  </span>
                  <span className='text-[18px] font-bold text-[#4f46e5]'>
                    ({items.id})
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className='my-4'>
            <select className='rounded-md border border-indigo-300 bg-transparent'>
              <option>Sort By</option>
              <option>Most Well Connected</option>
              <option>Most Well Connected</option>
              <option>Most Well Connected</option>
              <option>Most Well Connected</option>
              <option>Most Well Connected</option>
            </select>
          </div>
        </div>
      </div>

      <div className='container mx-auto my-3 text-left text-[16px] font-bold text-black'>
        Showing 1,25,270 Projects
      </div>

      <div className=' grid-col-1 grid place-items-center space-y-8 '>
        {allProperties?.map((items: any) => (
          <div
            key={items._id}
            className='mx-auto flex h-fit w-fit flex-col items-center rounded-lg bg-[#f2f2ff] shadow-lg xxs:mx-5 xs:mx-5 sm:mx-5 md:mx-5  lg:mx-5 xl:flex-row 2xl:flex-row'
          >
            <div className=' w-max'>
              <div className=' relative   h-max w-max items-end  overflow-hidden rounded-sm bg-cover'>
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  src='images/project-img.jpg'
                  alt='building'
                  className='h-[380px] sm:h-[380px] md:h-[580px] lg:h-[580px] xl:h-[380px] 2xl:h-[380px]'
                />
                <div className='  absolute bottom-0 left-0 w-full space-x-3 bg-gradient-to-t from-black px-4 py-3  '>
                  <button className='bg rounded-md bg-white px-5 py-3 text-lg text-[#4f46e5]'>
                    Details
                  </button>
                  <button
                    onClick={() => {
                      setshowModal((prev) => !prev);
                      setproperty(items._id);
                    }}
                    className='rounded-md bg-[#4f46e5] px-5 py-3 text-lg text-white'
                  >
                    <div className='flex items-center space-x-3'>
                      <FaPhone size={15} />
                      <span>Get a Call back</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div
              className='cursor-pointer p-6 '
              onClick={() => {
                router.push(`/projects/${items._id}`);
              }}
            >
              <div className='flex flex-row items-center justify-between'>
                <div className='text-[#333333 ]  text-[20px] font-bold '>
                  {items.projectName}
                </div>
                <div className='text-[20px] font-bold text-[#4f46e5] '>
                  ₹ {items.price}
                </div>
              </div>
              <div className=' text-[15px]  text-[#333333]'>
                {items.propertyDescription}
              </div>
              <div className='flex flex-row justify-between'>
                <div className='text-regular text-sm text-[#333333]'>
                  {cardBoxses[0]?.BHK}
                  {cardBoxses[0]?.Squre}
                </div>

                <div className='grid grid-flow-col'>
                  <img src='/images/sy.png' className='ml-8 h-8 w-28' />
                  <img src='/images/sq.png' className=' h-8 w-28' />
                </div>
              </div>

              <div className='text-regular   text-[16px]  text-[#333333]'>
                {cardBoxses[0]?.Des}
                <span className='font-regular  text-[14px] text-[#4f46e5]'>
                  ...Read More
                </span>
              </div>

              <div
                key={items._id}
                className='mt-3  flex items-center gap-4 xxs:flex-col xs:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row'
              >
                {cardBoxses[0]?.apartment.map((item) => (
                  <div
                    key={items._id}
                    className='text-regular text-[#33333]  m-0 flex flex-none items-center gap-2 rounded-md  bg-white px-2 py-2 text-sm xxs:w-full sm:w-full md:w-max'
                  >
                    <img
                      src={item.ApartmentImg}
                      className=' h-12 w-12 rounded-md'
                    />

                    <div className='grid grid-flow-row grid-cols-2 gap-2 '>
                      <div className='text-[#33333]  text-xs font-medium'>
                        1 BHK 295 Sq. Ft. Apartment
                      </div>

                      <div className='font-regular  text-[14px] text-[#4f46e5]'>
                        ₹61.99 Lac
                      </div>
                      <div className='font-regular  text-[14px] text-[#000000]'>
                        295 Sq. Ft.(Carpet)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='xl:grid-col-3 lg:grid-col-3 xxs-grid-cols-1 mt-3 grid  place-items-center place-items-center gap-4 rounded-lg bg-[#cdceff] px-4 xxs:mx-auto xxs:w-full xs:grid-cols-2  sm:grid-cols-2   md:grid-cols-3  2xl:grid-cols-3  '>
                {cardBoxses[0]?.jpnorth.map((item, index) => (
                  <div key={index} className='xxs:w-full '>
                    <div className='text-[14px]  font-semibold text-[#000]'>
                      JP North
                    </div>
                    <div
                      key={items._id}
                      className='text-regular text-[#33333] my-2 flex 2xl:w-72 xl:w-72 lg:w-72 md:w-full sm:w-full xs:w-full xxs:full justify-start rounded-md bg-white  py-2 text-sm '
                    >
                      <img
                        src={item.ApartmentImg}
                        className='mx-2 h-12 w-12 rounded-md'
                      />
                      <div className='grid grid-flow-row  '>
                        <div className='text-[#33333] text-xs font-medium'>
                          Recent Sale Txns
                        </div>

                        <div className='text-[14px]  font-semibold text-[#000]'>
                          445 in Last 1 Year
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className='fixed inset-0 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50'
        id='my-modal'
        hidden={!showModal}
      >
        <div className='relative top-28 m-auto h-fit w-max  rounded-lg bg-white py-6 px-8'>
          <div
            onClick={() => setshowModal(false)}
            className='float-right rounded-md p-1 hover:cursor-pointer hover:bg-gray-600 hover:bg-opacity-50'
          >
            <MdOutlineClose></MdOutlineClose>
          </div>
          <form
            className='space-y-3'
            onSubmit={(event) => {
              event.preventDefault();
              const form = event.target as HTMLFormElement;
              const formdata = new FormData(form);
              const { name, email, phone, message } = Object.fromEntries(
                formdata.entries()
              );

              const requestCallbackStatus = requestCallback.mutateAsync({
                customer: {
                  name: name as string,
                  email: email as string,
                  phone: phone as string,
                  message: message as string,
                },
                property: property as string,
              });

              requestCallbackStatus.catch(() => {
                return;
              });
            }}
          >
            <div className='text-[22px] text-[#4f46e5]'>Request a Callback</div>
            <input
              type='text'
              placeholder='Full Name'
              className='mt-3 w-full rounded-md border border-slate-300'
              name='name'
            />
            <div className='grid grid-flow-row grid-cols-4 space-x-3'>
              <select
                className='col-span-1 rounded-md border border-slate-300'
                name='contact'
              >
                <option>+91</option>
              </select>
              <input
                type='tel'
                placeholder='Contact Number'
                className='col-span-3 rounded-md border border-slate-300'
                name='phone'
              />
            </div>
            <input
              type='email'
              placeholder='Email'
              className='w-full rounded-md border border-slate-300'
              name='email'
            />
            <textarea
              placeholder='Drop a message.'
              className='w-full rounded-md border border-slate-300'
              name='message'
            />
            <div className='mt-6 block w-full rounded-md bg-[#c6c3ec] pt-3 pb-3 text-center text-base text-indigo-600'>
              <button type='submit' className=' text-[18px] text-[#4f46e5]'>
                React out me at
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Project;
