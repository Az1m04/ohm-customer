import Link from 'next/link';
import React from 'react';

const AgentCards = [
  {
    id: 1,
    img: '/images/usernew.jpg',
    heading: 'Azuro Property Management Mumbai New',
    smallheading: 'Azuro Property Management',
    lists: [
      {
        listitem: '7 Year experience',
      },
      {
        listitem: 'English, Hindi, Marathi',
      },
    ],

    propertyDetails: [
      {
        id: 1,
        propertyImg: '/images/propertyimg.jpg',
        details: [
          {
            proname: '2 BHK 1110 Sq. Ft. Apartment',
            address: 'Sector 93B, Noida',
            pay: '₹ 30,003',
            sqft: '1110 Sq.Ft.',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    img: '/images/usernew.jpg',
    heading: 'Azuro Property Management Mumbai New',
    smallheading: 'Azuro Property Management',
    lists: [
      {
        listitem: '7 Year experience',
      },
      {
        listitem: 'English, Hindi, Marathi',
      },
    ],
    propertyDetails: [
      {
        id: 2,
        propertyImg: '/images/propertyimg.jpg',
        details: [
          {
            proname: '2 BHK 1110 Sq. Ft. Apartment',
            address: 'Sector 93B, Noida',
            pay: '₹ 30,003',
            sqft: '1110 Sq.Ft.',
          },
        ],
      },
    ],
  },
];

const tabs = [
  {
    id: '1',
    name: 'All Agents',
  },
  {
    id: '2',
    name: 'Preferred Partners',
  },
];

const Agents = () => {
  return (
    <div className=' bg-[#e4e4e4]'>
      <div className='container mx-auto  py-5 '>
        <div className='flex flex-wrap justify-between px-2'>
          <div className='  text-left text-[28px] font-medium text-black'>
            Real Estate Agents in India
          </div>
          <div className=' '>
            <select className='w-28 rounded-lg border border-gray-300 bg-white '>
              <option>Sort By</option>
              <option>Most Well Connected</option>
              <option>Most Well Connected</option>
              <option>Most Well Connected</option>
              <option>Most Well Connected</option>
              <option>Most Well Connected</option>
            </select>
          </div>
        </div>
        <div className=' px-2 text-left text-[16px] font-medium text-black'>
          34101 Agents Found
        </div>

        <div className='my-4 gap-4 sm:grid sm:grid-flow-row sm:grid-cols-1 md:grid md:grid-flow-row md:grid-cols-1 lg:grid lg:grid-flow-row lg:grid-cols-2   '>
          {AgentCards.map((items) => (
            <Link key={items.id} href='/agentprofile'>
              <a>
                <div className='xs:mx-auto my-4 h-fit rounded-lg border border-slate-200 bg-white p-4 shadow-md sm:mx-auto sm:grid sm:grid-flow-row sm:grid-cols-1 md:grid md:grid-flow-row md:grid-cols-2 lg:grid lg:grid-flow-row   lg:grid-cols-2 '>
                  <div className=''>
                    <img
                      className='h-66 xs:mx-auto xs:mx-auto w-72 rounded-lg sm:mx-auto md:mx-0 lg:mx-0'
                      src={items.img}
                      alt=''
                    />

                    <div className='xs:mx-auto my-4 grid w-72 grid-flow-row grid-cols-2 rounded-lg sm:mx-auto md:mx-0 lg:mx-0'>
                      <div className=' flex flex-row items-center justify-center rounded-md border border-indigo-400 px-2 py-1 text-center text-[#4f46e5]'>
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
                        Contact
                      </div>
                    </div>
                  </div>

                  <div className='my-4 '>
                    <div className=' text-[18px] font-semibold text-black  '>
                      {items.heading}
                    </div>

                    <div className='flex'>
                      <img src='/images/homeicon.png' className='h-8 w-8 ' />
                      <div className='font-regular  my-1 mx-2 text-[18px] text-black'>
                        {items.smallheading}
                      </div>
                    </div>
                    <div className='my-2 ml-6'>
                      <ul className='font-regular list-disc  text-[17px] text-black	'>
                        {items?.lists?.map((card) => (
                          <li key={card?.listitem}>{card.listitem}</li>
                        ))}
                      </ul>
                    </div>

                    {items?.propertyDetails?.map((pro) => (
                      <div
                        key={pro.id}
                        className='border-1 flex flex-wrap items-center justify-start space-x-4 border-gray-50 '
                      >
                        <img
                          src={pro.propertyImg}
                          style={{
                            borderRadius: 10,
                            padding: 6,
                            width: 100,
                            height: 100,
                          }}
                        />
                        {pro?.details?.map((detail) => (
                          <div key={detail.proname}>
                            <div className='text-bold text-[14px] text-indigo-500'>
                              {detail.proname}
                            </div>
                            <div className='text-bold text-[14px] text-gray-800'>
                              {detail.address}
                            </div>
                            <div className='flex flex-row '>
                              <div className='text-bold px-1 text-[14px] text-black'>
                                {detail.pay}
                              </div>
                              <div className='text-bold px-1 text-[14px] text-black'>
                                {detail.sqft}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Agents;
