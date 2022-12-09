import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import ArrowIcon from '../../assets/img/arrow-down.png';

const Accordion = ({
  Category,
  setUpdatedProducts,
  categoryProduct,
  subCategoryProduct,
}) => {
  const [active, setActive] = useState(false);

  const [activeState, setActiveState] = useState('');

  return (
    <div className=' w-full shadow-lg'>
      <div className='header  mb-[40px] rounded-t-lg bg-[#009e60] py-[10px]'>
        <h4 className='font-[20px] text-center text-white'>Explore</h4>
      </div>
      {Category?.map((item: any) => {
        return (
          <div className='mt-15px' key={item?._id}>
            <Link href={`/products?categoryId=${item?._id}`} passHref>
              <a
                id={activeState}
                className='flex h-12 cursor-pointer items-center justify-between overflow-hidden text-ellipsis rounded  py-4 px-6 text-sm text-gray-700 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900'
                onClick={(e) => {
                  e?.stopPropagation();
                  setUpdatedProducts([]);
                  if (activeState === item?._id) {
                    return setActive(!active);
                  }
                  setActiveState(item?._id);
                  setUpdatedProducts(categoryProduct);
                }}
              >
                <div className='text-[12px] uppercase'> {item?.name} </div>
                <div className='flex justify-end'>
                  <Image src={ArrowIcon} width='25px' height='25px' alt='' />
                </div>
              </a>
            </Link>

            {active &&
              activeState === item?._id &&
              item?.subCategory?.map((sub: any) => {
                return (
                  <div key={sub?._id} className='flex text-left'>
                    <Link href={`/products?subcategoryId=${sub?._id}`} passHref>
                      <ul
                        className='accordion-collapse collapse relative'
                        key={sub?._id}
                      >
                        <li className='relative'>
                          <div
                            className='flex w-full cursor-pointer items-center justify-start py-2 px-8 text-[14px] uppercase hover:text-[#009E60]'
                            onClick={() =>
                              setUpdatedProducts(subCategoryProduct)
                            }
                          >
                            {sub?.name}
                            {/* {sub?._id} */}
                          </div>
                        </li>
                      </ul>
                    </Link>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
