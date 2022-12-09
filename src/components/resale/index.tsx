import React, { useEffect, useState } from 'react';

import { useGetProperty } from '@/hooks/property/useGetProperty';

const Cards = [
  {
    id: 1,
    img: '/images/resale1.jpg',
    heading: '2 BHK Builder Floor For Sale in Hastinapuram',
    price: '₹ 63.25 Lac',
    sqft: '1150 Sq.Ft.',
    area: 'Built-up Area',
    des: 'This is a great opportunity for a buyer This is a great opportunity for a buyer',
    tags: {
      center: 'center',
      safe: 'center',
      paceful: 'center',
    },
  },
  {
    id: 2,
    img: '/images/resale1.jpg',
    heading: '2 BHK Builder Floor For Sale in Hastinapuram',
    price: '₹ 63.25 Lac',
    sqft: '1150 Sq.Ft.',
    area: 'Built-up Area',
    des: 'This is a great opportunity for a buyer This is a great opportunity for a buyer',
    tags: {
      center: 'center',
      safe: 'center',
      paceful: 'center',
    },
  },
  {
    id: 3,
    img: '/images/resale1.jpg',
    heading: '2 BHK Builder Floor For Sale in Hastinapuram',
    price: '₹ 63.25 Lac',
    sqft: '1150 Sq.Ft.',
    area: 'Built-up Area',
    des: 'This is a great opportunity for a buyer This is a great opportunity for a buyer',
    tags: {
      center: 'center',
      safe: 'center',
      paceful: 'center',
    },
  },
  {
    id: 3,
    img: '/images/resale1.jpg',
    heading: '2 BHK Builder Floor For Sale in Hastinapuram',
    price: '₹ 63.25 Lac',
    sqft: '1150 Sq.Ft.',
    area: 'Built-up Area',
    des: 'This is a great opportunity for a buyer This is a great opportunity for a buyer',
    tags: {
      center: 'center',
      safe: 'center',
      paceful: 'center',
    },
  },
  {
    id: 4,
    img: '/images/resale1.jpg',
    heading: '2 BHK Builder Floor For Sale in Hastinapuram',
    price: '₹ 63.25 Lac',
    sqft: '1150 Sq.Ft.',
    area: 'Built-up Area',
    des: 'This is a great opportunity for a buyer This is a great opportunity for a buyer',
    tags: {
      center: 'center',
      safe: 'center',
      paceful: 'center',
    },
  },
  {
    id: 5,
    img: '/images/resale1.jpg',
    heading: '2 BHK Builder Floor For Sale in Hastinapuram',
    price: '₹ 63.25 Lac',
    sqft: '1150 Sq.Ft.',
    area: 'Built-up Area',
    des: 'This is a great opportunity for a buyer This is a great opportunity for a buyer',
    tags: {
      center: 'center',
      safe: 'center',
      paceful: 'center',
    },
  },
  {
    id: 6,
    img: '/images/resale1.jpg',
    heading: '2 BHK Builder Floor For Sale in Hastinapuram',
    price: '₹ 63.25 Lac',
    sqft: '1150 Sq.Ft.',
    area: 'Built-up Area',
    des: 'This is a great opportunity for a buyer This is a great opportunity for a buyer',
    tags: {
      center: 'center',
      safe: 'center',
      paceful: 'center',
    },
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

const Resale = () => {
  const [allProperties, setAllProperties] = useState<any>([]);
  const getPropertyHook = useGetProperty();

  const getAllProperties = async () => {
    const res = await getPropertyHook.mutateAsync();
    setAllProperties(res);
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  return (
    <>
      <div className='min-h-max bg-[#eeeefa] py-10 '>
        <div className=' mx-80 '>
          <div className='flex w-max flex-row rounded-t-lg bg-white  px-2 py-1 text-[20px] font-semibold text-[#4f46e5]	'>
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
          <div className='rounded-tr-lg rounded-bl-lg rounded-br-lg bg-white px-6 py-5'>
            <div className='grid grid-flow-row grid-cols-6 gap-0'>
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

      <div className=' bg-[#e4e4e4]'>
        <div className='container mx-auto w-fit '>
          <div className=' flex flex-row items-center justify-start'>
            <div className='mx-2 mt-5 w-max items-center rounded-lg border border-indigo-400 bg-white px-5 py-3 text-center text-[16px] font-medium text-black '>
              All
            </div>
            <div className='mx-2 mt-5 flex w-max flex-row items-center rounded-lg  border border-indigo-400 bg-white px-4 py-3 text-center text-[16px] font-medium text-black '>
              <img src='/images/videotour.png' className='mx-2 h-6 w-6' />
              Video Tour
            </div>
            <div className='mx-2 mt-5 flex w-max flex-row items-center rounded-lg  border border-indigo-400 bg-white px-4 py-3 text-center text-[16px] font-medium text-black '>
              <img src='/images/byowner.png' className='mx-2 h-6 w-6' />
              Buy Owner
            </div>
            <div className='mx-2 mt-5 w-max items-center rounded-lg border border-indigo-400 bg-white px-5 py-3 text-center text-[16px] font-medium text-black '>
              Exclusive
            </div>
          </div>

          <div className=' grid  pt-8 pb-8 sm:grid-cols-1  sm:gap-4 md:grid-cols-1 md:gap-4  lg:grid-cols-3 lg:gap-8'>
            {allProperties?.map((items: any) => (
              <div
                className='h-fit max-w-sm	 rounded-lg border border-slate-200 bg-white     shadow-md '
                key={items._id}
              >
                <a
                  href='#!'
                  data-mdb-ripple='true'
                  data-mdb-ripple-color='light'
                >
                  <img
                    className=' w-full rounded-tl-lg rounded-tr-lg'
                    src='/images/resale1.jpg'
                    alt=''
                  />
                </a>
                <div className='p-4'>
                  <div className=' mb-2 text-[15px] font-bold text-black  '>
                    {items.projectName}
                  </div>
                  <div className='mb-2 text-[18px] font-bold leading-[1.5rem]  text-[#4f46e5]'>
                    ₹ {items.price}
                  </div>
                  <div className='mb-2 text-[18px] font-semibold leading-[1.5rem]  text-[#000]'>
                    {Cards[0]?.sqft}
                    <span className='text-regular mx-2 text-[16px] text-black '>
                      {items.area}
                    </span>
                  </div>
                  <div className='text-regular text-black'>
                    {items?.propertyDescription}
                    <span className='text-[#4f46e5]'>...Read More</span>
                  </div>
                  {/* {Cards.tags.map((items) => 
                  <div key={items.id} className='text-base text-gray-700'>{items.area}</div>
                  )} */}
                </div>
                <div className='mx-1 my-1 flex flex-row justify-evenly'>
                  <div className='   rounded-md bg-purple-200 px-2 py-1 text-center text-sm'>
                    Near City Center
                  </div>
                  <div className='   rounded-md bg-purple-200 px-2 py-1 text-center text-sm'>
                    Near City Center
                  </div>
                  <div className='   rounded-md bg-purple-200 py-1 px-2  text-center text-sm'>
                    Near City Center
                  </div>
                </div>
                <div className='mx-2 my-3 flex flex-row justify-end '>
                  <div className='mx-1 flex flex-row items-center justify-center rounded-md border border-indigo-400 px-2 py-1 text-center text-[#4f46e5]'>
                    <img
                      src='/images/whatsapp.gif'
                      className='h-8 w-8 stroke-lime-500   '
                    />
                    WhatsApp
                  </div>
                  <div className='mx-1 flex flex-row items-center justify-center rounded-md border border-indigo-400 bg-[#4f46e5] px-2 py-1 text-center text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='mr-1 h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='white'
                    >
                      <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                    </svg>
                    Contact Us
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Resale;
