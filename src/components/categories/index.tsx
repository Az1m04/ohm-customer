import React from 'react';
//import CommercialProject from 'src/assets/svg/commercial project.svg';
import NewProject from 'src/assets/svg/new projects.svg';

const categories = [
  {
    id: '1',
    imgpath: '',
    name: 'New projects',
  },
  {
    id: '1',
    imgpath: '',
    name: 'Commerical properties',
  },
  {
    id: '1',
    imgpath: '',
    name: 'Plot & Land',
  },
  {
    id: '1',
    imgpath: '',
    name: 'Rental properties',
  },

  {
    id: '1',
    imgpath: '',
    name: 'Resale properties',
  },
  {
    id: '1',
    imgpath: '',
    name: 'Find agents',
  },
  {
    id: '1',
    imgpath: '',
    name: 'More',
  },
];

const Categories = () => {
  return (
    <div className='mx-24 my-24 flex flex-row items-center justify-around  object-center '>
      {categories.map((item) => (
        <div
          className='mx-2 flex   flex-row justify-between rounded-full border-2 border-white bg-white px-2 py-1 drop-shadow-lg   '
          key={item.id}
        >
          <NewProject className='h-12 w-12 '></NewProject>
          {/* <CommercialProject className='h-14 w-14 '></CommercialProject> */}
          <div className='normal  mt-1 px-2 py-2 text-[14px] font-bold leading-[1.3rem] text-[#1F1B2D] '>
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
