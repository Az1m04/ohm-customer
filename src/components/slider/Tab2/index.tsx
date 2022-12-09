import { Tab } from '@headlessui/react';
import Link from 'next/link';
import { useState } from 'react';

function Tab2() {
  const [selected, setSelected] = useState(true);

  const [categories] = useState({
    Recent: [
      {
        id: 1,
        img: '/images/loan.png',
        heading: 'Budget friendly homes',
        price: '₹ 0L - 25L',
        para: '302 Foster Ave',
      },
      {
        id: 2,
        img: '/images/loan.png',
        heading: '2 BHK apartments',
        price: '₹ 0L - 25L',
        para: '302 Foster Ave',
      },
      {
        id: 3,
        img: '/images/loan.png',
        heading: 'Independent homes',
        price: '₹ 0L - 25L',
        para: '302 Foster Ave',
      },
    ],
    Popular: [
      {
        id: 1,
        img: '/images/loan.png',
        heading: 'Budget friendly homes',
        price: '₹ 0L - 25L',
        para: '302 Foster Ave',
      },
      {
        id: 2,
        img: '/images/loan.png',
        heading: '2 BHK apartments',
        price: '₹ 0L - 25L',
        para: '302 Foster Ave',
      },
    ],
    Trending: [
      {
        id: 1,
        img: '/images/loan.png',
        heading: 'Budget friendly homes',
        price: '₹ 0L - 25L',
        para: '302 Foster Ave',
      },
      {
        id: 2,
        img: '/images/loan.png',
        heading: '2 BHK apartments',
        price: '₹ 0L - 25L',
        para: '302 Foster Ave',
      },
    ],
    Test: [
      {
        id: 1,
        img: '/images/loan.png',
        heading: 'Budget friendly homes',
        price: '₹ 0L - 25L',
        para: '302 Foster Ave',
      },
    ],
  });

  return (
    <div className='container mx-auto  px-2 py-16 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl  p-1'>
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                  ${
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-900 hover:bg-white/[0.12] hover:text-black'
                  }`}
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className='rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            >
              <div className='grid grid-flow-row'>
                <div className='md:auto-rows-row container mx-auto grid h-fit w-fit sm:grid-flow-row sm:auto-rows-max md:grid-flow-row lg:auto-cols-max lg:grid-flow-col'>
                  {posts.map((items) => (
                    <Link key={items.id} href={`/projects/${items.id}`}>
                      <a>
                        <div className=' my-4 mx-2 h-fit max-w-sm rounded-lg bg-white shadow-lg'>
                          <a href='#!'>
                            <img
                              className='h-50 transform  rounded-lg transition duration-500 hover:scale-105'
                              src='https://mdbootstrap.com/img/new/standard/nature/184.jpg'
                              alt=''
                            />
                          </a>
                          <div className='p-6'>
                            <h5 className='mb-2 text-xl font-medium text-gray-900'>
                              {items.heading}
                            </h5>
                            <h2 className='mb-2 text-xl font-medium text-gray-900'>
                              {items.price}
                            </h2>
                            <p className='mb-4 text-base text-gray-700'>
                              {items.para}
                            </p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default Tab2;
