/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useGetCommon } from '@/hooks/common/useGetTopDevelopers';

const TopDeveloper = () => {
  const developer = [
    {
      id: 1,
      img: '/images/developers/hiranandani-451.jpg',
      heading: 'Hiranandani',
      para: '31',
      border: '',
      belowText: '8 Projectsby Adani Realty in Ahmedabad',
    },
    {
      id: 2,
      img: '/images/developers/kalpataru-532.jpg',
      heading: 'Kalpataru',
      para: '31',
      border: '',
      belowText: '8 Projectsby Adani Realty in Ahmedabad',
    },
    {
      id: 3,
      img: '/images/developers/lodha-521.jpg',
      heading: 'Lodha',
      para: '31',
      border: '',
      belowText: '8 Projectsby Adani Realty in Ahmedabad',
    },
    {
      id: 4,
      img: '/images/developers/prestige-483.jpg',
      heading: 'Prestige',
      para: '31',
      border: '',
      belowText: '8 Projectsby Adani Realty in Ahmedabad',
    },
    {
      id: 5,
      img: '/images/developers/runwal-538.jpg',
      heading: 'Runwal',
      para: '31',
      border: '',
      belowText: '8 Projectsby Adani Realty in Ahmedabad',
    },
    {
      id: 6,
      img: '/images/developers/sobha-104.jpg',
      heading: 'Sobha',
      para: '31',
      border: '',
      belowText: '8 Projectsby Adani Realty in Ahmedabad',
    },
  ];

  // eslint-disable-next-line unused-imports/no-unused-vars
  const [topDevelopers, setTopDevelopers] = useState();
  const topdevelopersQuery = useGetCommon();

  const getTopDevelopers = async () => {
    const res = await topdevelopersQuery.mutateAsync();
    setTopDevelopers(res);
  };

  useEffect(() => {
    getTopDevelopers();
  }, []);

  return (
    <div className=' my-4 bg-[#dfddff] py-10 px-10'>
      <div className='pb-6 text-center text-3xl font-medium text-black'>
        Top Developers in Ahmedabad
      </div>

      <div className='container mx-auto h-fit sm:grid sm:grid-flow-row sm:grid-cols-1 sm:gap-4 md:grid  md:grid-flow-row md:grid-cols-2 md:gap-4 lg:grid lg:grid-flow-row lg:grid-cols-3 lg:gap-4 '>
        {developer?.map((dev) => (
          <Link key={dev.id} href={`/agents/${dev?.id}`}>
            <a>
              <div
                className=' rounded-md bg-white py-4 xs:my-3 sm:my-1 md:my-1 lg:my-2'
                style={{ boxShadow: '0 0 20px -8px rgb(0 0 0 / 18%)' }}
              >
                <div key={dev._id} className='flex flex-wrap '>
                  <div className='mx-4 w-24 rounded-md border border-solid border-gray-300 bg-white p-2 pb-2'>
                    <img src={dev.img} alt='' />
                  </div>
                  <div className=''>
                    <div className=' '>{dev?.heading}</div>

                    <div className=''>Experience : {dev?.para} Years</div>
                  </div>
                </div>
                <div className=' mx-auto my-4 border border-gray-100 sm:w-full md:w-full lg:w-96'></div>
                <div className='mt-2 text-center text-sm text-indigo-600 no-underline'>
                  8 Projectsby Adani Realty in Ahmedabad
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopDeveloper;
