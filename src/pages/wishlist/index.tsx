import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useDeleteToWishlist } from '@/hooks/wishlist/mutation';
import { useGetWishlist } from '@/hooks/wishlist/query';

import Loading from '@/components/loading';

import { currentUsers } from '@/store/users';
import { wishListData } from '@/store/wishList';

import { currencyFormatter } from '@/utils/apiUtils';

import cross from '../../assets/img/cross.png';
import emptyState from '../../assets/img/emptyState.png';

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useAtom(wishListData);
  const [wishlistData, setWishlistData] = useState([]);

  const [getUser, setUser] = useAtom(currentUsers);
  const userName = getUser?.data?.userName;

  // const [amount, setAmount] = useState([]);

  const wishlistProduct: any = useGetWishlist(wishlistItems);

  const wishlistProductData =
    wishlistProduct?.data?.wishlistData?.[0]?.data?.[0]?.items;

  useEffect(() => {
    userName && setWishlistData(wishlistProductData);
  }, [wishlistProductData]);

  const deleteWishList = useDeleteToWishlist();
  const deleteToWishList = (val: any) => {
    deleteWishList
      ?.mutateAsync({
        pathParams: { productId: val },
      })
      .then((res: any) => {
        setWishlistItems(wishlistProductData);
      });
  };
  const getPrice = (val: any) => {
    if (val?.retailer_price) {
      return val?.retailer_price;
    }
    if (val?.wholesaler_price) {
      return val?.wholesaler_price;
    }
    if (val?.distributor_price) {
      return val?.distributor_price;
    }
  };

  return (
    <>
      <div className='container mx-auto  mt-[200px] max-w-screen-xl'>
        {deleteWishList?.isLoading ? (
          <div className='mt-[80px] h-[100vh] w-full items-center'>
            <Loading />
          </div>
        ) : (
          <div className='mb-[60px  mt-[130px] '>
            <div className='  w-full overflow-x-auto'>
              <div className='inline-block  w-full py-2 '>
                <>
                  <table className=' w-full border text-center '>
                    <thead className='border-b uppercase'>
                      <tr>
                        <th
                          scope='col'
                          className='border-r bg-black px-6 py-4 text-sm font-medium text-gray-900'
                        ></th>
                        <th
                          scope='col'
                          className='border-r bg-black px-6 py-4 text-sm font-medium text-gray-900'
                        ></th>
                        <th
                          scope='col'
                          className='font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff]'
                        >
                          Product
                        </th>
                        <th
                          scope='col'
                          className='font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff]'
                        >
                          Price
                        </th>
                        <th
                          scope='col'
                          className='font-strong border-r bg-black px-6 py-4 font-sans text-[16px] font-bold text-[#ffffff]'
                        >
                          Stock Status
                        </th>
                        <th
                          scope='col'
                          className='border-r bg-black px-6 py-4 text-sm font-medium text-gray-900'
                        ></th>
                      </tr>
                    </thead>

                    {wishlistData?.length > 0 && (
                      <tbody className='body'>
                        {wishlistData?.map((item: any) => {
                          return (
                            <tr className='border-b' key={item?._id}>
                              <td className='cursor-pointer whitespace-nowrap border-r px-6 py-4 text-sm font-medium text-gray-900'>
                                {userName && (
                                  <>
                                    <Image
                                      src={cross}
                                      alt=''
                                      height={20}
                                      width={20}
                                      onClick={() =>
                                        deleteToWishList(item?._id)
                                      }
                                    />
                                  </>
                                )}
                              </td>
                              <td className='whitespace-nowrap border-r px-6 py-4 text-sm font-light text-gray-900'>
                                <Image
                                  src={
                                    item?.product?.media?.[0]?.url ||
                                    item?.media?.[0]?.url
                                  }
                                  alt={item?.product?.name || item?.name}
                                  height='105px'
                                  width='105px'
                                />
                              </td>
                              <td className='border-r px-6 py-4 text-[15px]  font-medium  text-[#838383]'>
                                {item.product?.name || item?.name}
                              </td>
                              <td className='border-r px-6 py-4 text-[15px]  font-medium  text-[#838383]'>
                                {currencyFormatter?.format(
                                  getPrice(item?.sku?.price) || 0
                                )}
                              </td>
                              <td className='border-r px-6 py-4 text-[15px]  font-medium  text-[#838383]'>
                                {item?.product?.available
                                  ? 'In Stock'
                                  : 'out of Stock'}
                              </td>
                              <td className='border-r px-6 py-4 text-[15px]  font-medium  text-[#838383]'>
                                <div className=' w-15 my-4 rounded-xl border-2 border-[#4a4a4a] px-4 py-2'>
                                  <Link
                                    href={`products/viewproduct?productId=${
                                      item?.product?._id || item?._id
                                    }`}
                                  >
                                    <a>
                                      <div className='font-serif  text-[16px] font-light text-gray-900'>
                                        <p>View product</p>
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    )}
                  </table>

                  {wishlistData?.length === 0 && (
                    <div className='flex h-[60vh] w-full justify-center'>
                      <div className='  mx-auto  max-w-[400px] rounded  text-center  '>
                        <Image
                          src={emptyState}
                          width='400px'
                          height='400px'
                          alt='no image found'
                          objectFit='contain'
                        />
                        <div className=' text-xl font-semibold text-gray-700'>
                          No products found
                        </div>
                      </div>
                    </div>
                  )}
                </>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WishList;
