import { useAtom } from 'jotai';
import { debounce } from 'lodash';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import close from 'src/assets/img/cross.png';
import logo from 'src/assets/img/logo1.png';
import searchWhiteIcon from 'src/assets/img/search-icon.png';
import shoppingCart from 'src/assets/img/shopping-cart-1.png';
import userSettings from 'src/assets/img/user-settings.png';

import 'react-toastify/dist/ReactToastify.css';

import { useLogout } from '@/hooks/auth/logout/useLogout';
import { useGetCart } from '@/hooks/cart/query';
import { useGetCategory } from '@/hooks/category/query';
import { useGetOrder, useGetUserOrderItems } from '@/hooks/order/query';
import { useGetProducts } from '@/hooks/products/query';
import { useGetCurrentUsers } from '@/hooks/user/useGetCurrentUser';
import { useGetWishlist } from '@/hooks/wishlist/query';

import TitleProduct from '@/components/titleProduct';

import { cartData } from '@/store/cart';
import { categoryDetails } from '@/store/category';
import { orderData } from '@/store/order';
import { currentUsers } from '@/store/users';
import { wishLiLocaldata, wishListData } from '@/store/wishList';

import { queryClient } from '@/pages/_app';
import { cookies } from '@/utils/apiUtils';

import Order from '../../../assets/img/box.png';
export const getInitials = (name: any) => {
  if (name) {
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || '') + (initials.pop() || '')
    ).toUpperCase();
    return initials;
  }
  return '';
};

const Header = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isMenu1Opened, setIsMenu1Opened] = useState(false);
  const [isAccountMenu, setIsAccountMenuOpened] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const userLogout = useLogout();

  const router = useRouter();
  const [active, setActive] = useState(false);
  const [orderItems, setOrderItems] = useAtom(orderData);
  const orderedData: any = useGetOrder(setOrderItems);

  const [activeState, setActiveState] = useState('');

  const products: any = useGetProducts({
    query: {
      keyword: searchTerm,
    },
  });

  const [getCategory, setCategory] = useAtom(categoryDetails);
  const All = useGetCategory(setCategory);
  const [cartItems, setCartItems] = useAtom(cartData);
  const [wishlistItems, setWishlistItems] = useAtom(wishListData);
  const [offlineCartUpdate, setOfflineCartUpdate] = useState([]);
  const [isProfilePopup, setIsProfilePopup] = useState(false);
  const userCardRef = useRef<any>(null);
  const userRef = useRef<any>(null);

  const { data }: any = useGetCart(cartItems);
  const wishlistContainer: any = useGetWishlist(wishlistItems);
  const [wihlistLocalItem, setWihlistLocalData] = useAtom(wishLiLocaldata);
  const showHeader =
    // router.pathname === "/products" ||
    router.pathname === '/contact' ||
    router.pathname === '/auth/login' ||
    router.pathname === '/forgotPassword'
      ? false
      : true;
  const showHeader2 =
    router.pathname === '/contact' ||
    router.pathname === '/auth/login' ||
    router.pathname === '/auth/register' ||
    router.pathname === '/about'
      ? false
      : true;

  // const cartContains = [...cartDataItem?.data.cartData];

  let categoryItem = getCategory?.categoryData;
  console.log(categoryItem, 'getCategory itemssss');

  const ref: any = useRef(null);
  const refMenu: any = useRef(null);
  const refMenu1: any = useRef(null);
  const menuBar: any = useRef(null);
  const refAccount: any = useRef(null);

  const [getUser, setUser] = useAtom(currentUsers);
  if (!getUser?.status) {
    categoryItem = categoryItem?.filter((item) => {
      if (
        item._id === '62ab002953269c82394c1759' ||
        item._id === '62ab09ee53269c82394c1831' ||
        item._id === '62bd2392ff2f388182c27c10'
      ) {
        return false;
      }
      return true;
    });
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isProfilePopup &&
        userCardRef.current &&
        !userCardRef.current.contains(e.target) &&
        !userRef?.current?.contains(e.target)
      ) {
        setIsProfilePopup(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isProfilePopup]);
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isMenu1Opened &&
        refMenu1.current &&
        !refMenu1.current.contains(e.target) &&
        !menuBar?.current?.contains(e.target)
      ) {
        setIsMenu1Opened(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isMenu1Opened]);

  useGetCurrentUsers(setUser);

  const handleLogout = () => {
    queryClient.clear();
    setUser({});

    cookies.remove('accessToken');
    localStorage.removeItem('accessToken');
    setIsAccountMenuOpened(false);
    // userLogout
    //   .mutateAsync()
    //   .then((res: any) => {

    //   })
    //   .catch((err) => {
    //     ('');
    //   });
  };

  const handleClickOutside = (event: any) => {
    if (ref?.current && !ref?.current.contains(event.target)) {
      if (searchTerm === '') {
        setIsOpened(false);
      }
    }
  };

  const handleMenuClickOutside = (event: any) => {
    if (refMenu?.current && !refMenu?.current.contains(event.target)) {
      setIsMenuOpened(false);
    }
  };

  const handleAccountClickOutside = (event: any) => {
    if (refAccount?.current && !refAccount?.current.contains(event.target)) {
      setIsAccountMenuOpened(false);
    }
  };
  useEffect(() => {
    if (isMenuOpened) {
      document.addEventListener('click', handleMenuClickOutside, true);
    }

    if (isOpened) {
      document.addEventListener('click', handleClickOutside, true);
    }

    if (isAccountMenu) {
      document.addEventListener('click', handleAccountClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      setSearchTerm('');
      document.addEventListener('click', handleMenuClickOutside, true);

      document.addEventListener('click', handleAccountClickOutside, true);
    };
  }, [isOpened, isMenu1Opened, isAccountMenu]);

  const debouncedSearch = debounce((criteria) => {
    setSearchTerm(criteria);
  });

  const filtered = orderedData?.data?.productData;

  //   const router = useRouter();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userOrder: any = useGetUserOrderItems({});
  const orderedHeaderLength = userOrder?.data?.usersOrder?.length;

  return (
    <div className='w-full'>
      <Head>{TitleProduct()}</Head>
      {isMenu1Opened ? (
        <></>
      ) : (
        <div className='bg-[#009E60] '>
          <div className='flex justify-center p-[10px] text-center text-[14px] text-white'>
            WARNING: THIS PRODUCT CONTAINS NICOTINE. NICOTINE IS AN ADDICTIVE
            CHEMICAL.
          </div>
        </div>
      )}

      <div className=' h-max-[100px]    bg-[#F9F9F9]   py-[8px] px-[1rem] md:w-full  '>
        <div className=' flex w-full flex-col justify-between text-white  md:flex-row      '>
          <div className='  flex items-center justify-between self-stretch'>
            <div className='flex items-center justify-center  '>
              {!isMenu1Opened ? (
                <Link href='/'>
                  <div className='  md:block '>
                    <Image
                      src={logo}
                      alt='logo'
                      height='80px'
                      width='220px'
                      objectFit='cover'
                    />
                  </div>
                </Link>
              ) : (
                <></>
              )}
            </div>
            <div className='md:hidden'>
              <div>
                <Link href='/'>
                  <a>
                    <button
                      ref={menuBar}
                      className={`rounded-xl  ${
                        isMenu1Opened ? 'bg-[#004A2D] ' : 'bg-[#009E60] '
                      } p-3`}
                      aria-controls='mobile-menu'
                      aria-expanded='false'
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenu1Opened(!isMenu1Opened);
                      }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        fill='white'
                        viewBox='0 0 16 16'
                      >
                        <path
                          fillRule='evenodd'
                          d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
                        />
                      </svg>
                    </button>
                  </a>
                </Link>
                {isMenu1Opened && (
                  <div className='md:hidden '>
                    <div
                      ref={refMenu1}
                      className='absolute left-0 z-[99999999999]  h-full w-full origin-top divide-gray-100 bg-white  pb-10 text-left  shadow-lg ring-1 ring-black ring-opacity-5  focus:outline-none'
                      role='menu'
                      aria-orientation='vertical'
                      aria-labelledby='menu-button'
                    >
                      <div className=' gap-5  text-[16px] text-gray-600'>
                        <div>
                          {/* <Link href='/'>
                            <a>
                              <div
                                className='p-[20px] pl-10'
                                onClick={() => setIsMenu1Opened(false)}
                              >
                                Home
                              </div>
                            </a>
                          </Link>

                          <Link href='/products'>
                            <a>
                              <div
                                className='p-[20px] pl-10'
                                onClick={() => setIsMenu1Opened(false)}
                              >
                                Products
                              </div>
                            </a>
                          </Link>

                          <Link href='/about'>
                            <a>
                              <div
                                className='p-[20px] pl-10'
                                onClick={() => setIsMenu1Opened(false)}
                              >
                                About
                              </div>
                            </a>
                          </Link>

                          <Link href='/contact'>
                            <a>
                              <div
                                className='p-[20px] pl-10'
                                onClick={() => setIsMenu1Opened(false)}
                              >
                                Contact
                              </div>
                            </a>
                          </Link> */}
                          <div className='border-b' />
                          <h2 className='mt-4 pl-10 pb-4 text-xl'>
                            Categories
                          </h2>
                          <div className='border-b' />
                          <div className='grid gap-y-5 pl-4 text-lg '>
                            {showHeader && (
                              <div className=' md:container md:relative md:mx-auto '>
                                <div className='xl:px grid w-full  rounded-md  px-4 py-2 md:absolute md:grid-cols-4  md:px-24 lg:grid-cols-7 lg:gap-x-0 lg:px-[10px]'>
                                  {categoryItem?.map((item: any) => {
                                    console.log('my data', categoryItem);
                                    return (
                                      <div
                                        key={item?._id}
                                        className='group -ml-1 md:relative '
                                      >
                                        <Link
                                          href={`/products?categoryId=${item?._id}`}
                                          passHref
                                        >
                                          <button
                                            id='dropdownInformationButton'
                                            data-dropdown-toggle='dropdownInformation'
                                            className='md:after: flex  w-full items-center justify-between   bg-[#ffffff] px-4 py-2.5 text-center text-sm font-medium  '
                                            type='button'
                                            onClick={(e) => {
                                              e?.stopPropagation();

                                              if (activeState === item?._id) {
                                                return setActive(!active);
                                              }
                                              setActiveState(item?._id);
                                              setIsMenu1Opened(false);
                                            }}
                                          >
                                            <span className='truncate font-bold uppercase'>
                                              {item?.name}
                                            </span>
                                            {item?.subCategory?.length > 0 && (
                                              <svg
                                                className='ml-2 h-4 w-4'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                                xmlns='http://www.w3.org/2000/svg'
                                              >
                                                <path
                                                  strokeLinecap='round'
                                                  strokeLinejoin='round'
                                                  strokeWidth='2'
                                                  d='M19 9l-7 7-7-7'
                                                ></path>
                                              </svg>
                                            )}
                                          </button>
                                        </Link>
                                        <div className=' relative  hidden w-full border bg-white group-hover:block'>
                                          <div className=' absolute w-full'>
                                            {item?.subCategory?.map(
                                              (sub: any) => {
                                                return (
                                                  <div key={sub?._id}>
                                                    <Link
                                                      href={`/products?subcategoryId=${sub?._id}`}
                                                      passHref
                                                    >
                                                      <button
                                                        className='w-full'
                                                        onClick={() => {
                                                          setIsMenu1Opened(
                                                            false
                                                          );
                                                        }}
                                                      >
                                                        <div className='flex  cursor-pointer bg-green-200 text-left hover:bg-gray-100'>
                                                          <ul
                                                            className='accordion-collapse collapse relative'
                                                            key={sub?._id}
                                                          >
                                                            <li className='relative'>
                                                              <div className='flex w-full cursor-pointer items-center justify-start py-2 pl-4 text-[14px] font-bold uppercase hover:text-[#009E60]'>
                                                                {sub?.name}
                                                              </div>
                                                            </li>
                                                          </ul>
                                                        </div>
                                                      </button>
                                                    </Link>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <div className=" w-full justify-center self-stretch  md:block ">
            <div className="w-full items-center justify-center   xl:flex">
              <div
                ref={ref}
                className=" flex w-full items-center rounded-full border border-[#009E60] bg-[#009E60]  text-gray-500"
              >
                <input
                  className=" h-[40px] w-full rounded-l-full py-[8px] px-[12px] italic outline-none   "
                  placeholder="Type to search"
                  onChange={(e: any) => {
                    debouncedSearch(e.target.value?.trim());
                  }}
                />
                <div className="m-[10px] h-[16px] w-[20px] cursor-pointer rounded-r-full ">
                  <div className=" h-[16px] w-[16px] ">
                    <Image
                      src={searchWhiteIcon}
                      height="100%"
                      width="100%"
                      className="object-contain sm:mx-auto md:mx-0 lg:mx-0"
                      alt="logo"
                    />
                  </div>
                </div>
              </div>

              {searchTerm !== "" && products?.data?.productData?.length > 0 ? (
                <div
                  ref={ref}
                  className=" absolute
                    left-[23rem] top-24 z-40 mt-2 ml-1 flex h-56 w-[550px] overflow-y-auto overflow-x-hidden  rounded-md border-gray-200 bg-white bg-scroll text-gray-500 shadow-lg "
                >
                  <div className="h-[16px] w-full cursor-pointer  rounded-r-full p-[10px] ">
                    {products?.data?.productData?.map((i) => {
                      return (
                        <div
                          key={i?._id}
                          className="ml-3 mt-3 w-full  lowercase hover:text-[#009E60]"
                          onClick={(e) => {
                            e?.preventDefault();
                            setIsOpened(false);
                            setSearchTerm("");
                          }}
                        >
                          <Link
                            href={`/products/viewproduct?productId=${i?._id}`}
                            passHref
                          >
                            <span className="w-full text-lg">
                              {i?.name?.trim("")}
                            </span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <>
                  {searchTerm !== "" &&
                    products?.data?.productData?.length === 0 && (
                      // eslint-disable-next-line no-console
                      <div
                        className=" absolute
                      left-[23rem] top-24 z-40 mt-2 ml-1 flex h-56 w-[550px] rounded-md border-gray-200 bg-white text-gray-500 shadow-lg"
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-2xl font-medium">
                            NO PRODUCT FOUND
                          </span>
                        </div>
                      </div>
                    )}
                </>
              )}

              <div className=" mx-auto -mt-2 hidden h-[76px] w-full items-center justify-center  py-[8px] px-[20px] text-[16px]  text-[#009E60] md:flex lg:container lg:flex xl:container xl:flex">
                <>
                  <Link href="/">
                    <a>
                      <div className="px-[15px]">Home</div>
                    </a>
                  </Link>

                  <Link href="/products">
                    <a>
                      <div className="px-[15px]">Products</div>
                    </a>
                  </Link>

                  <Link href="/about">
                    <a>
                      <div className="px-[15px]">About</div>
                    </a>
                  </Link>

                  <Link href="/contact">
                    <a>
                      <div className="px-[15px]">Contact</div>
                    </a>
                  </Link>
                </>
              </div>
            </div>
          </div> */}

          <div className='  mx-2  self-stretch md:block'>
            <div className='w-full items-center justify-center xl:flex   '>
              <div
                ref={ref}
                className=' flex w-full items-center  rounded-full border border-[#009E60] bg-[#009E60]  text-gray-500'
                style={{ minWidth: '20vw', marginRight: '10rem' }}
              >
                <input
                  className=' h-[40px] w-full rounded-l-full py-[8px] px-[12px] italic outline-none   '
                  placeholder='Type to search'
                  value={searchTerm}
                  onChange={(e: any) => {
                    debouncedSearch(e.target.value);
                  }}
                />
                <div
                  className=' relative right-5 w-[20px] cursor-pointer rounded-r-full bg-[white]'
                  onClick={() => {
                    debouncedSearch('');
                  }}
                >
                  <div className=' h-[16px] w-[16px] '>
                    <Image
                      src={close}
                      height='100%'
                      width='100%'
                      className='object-contain sm:mx-auto md:mx-0 lg:mx-0'
                      alt='logo'
                    />
                  </div>
                </div>

                <div className='m-[10px] h-[16px] w-[20px] cursor-pointer rounded-r-full '>
                  <div className=' h-[16px] w-[16px] '>
                    <Image
                      src={searchWhiteIcon}
                      height='100%'
                      width='100%'
                      className='object-contain sm:mx-auto md:mx-0 lg:mx-0'
                      alt='logo'
                    />
                  </div>
                </div>
              </div>

              {searchTerm !== '' && products?.data?.productData?.length > 0 ? (
                <div
                  ref={ref}
                  className=' absolute
                    left-[23rem] top-24 z-40 mt-2 ml-1 flex h-56 w-[550px] overflow-y-auto overflow-x-hidden  rounded-md border-gray-200 bg-white bg-scroll text-gray-500 shadow-lg '
                >
                  <div className='h-[16px] w-full cursor-pointer  rounded-r-full p-[10px] '>
                    {products?.data?.productData?.map((i) => {
                      return (
                        <div
                          key={i?._id}
                          className='ml-3 mt-3 w-full  lowercase hover:text-[#009E60]'
                          onClick={(e) => {
                            e?.preventDefault();
                            setIsOpened(false);
                            setSearchTerm('');
                          }}
                        >
                          <Link
                            href={`/products/viewproduct?productId=${i?._id}`}
                            passHref
                          >
                            <span className='w-full text-lg'>
                              {i?.name?.trim('')}
                            </span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <>
                  {searchTerm !== '' &&
                    products?.data?.productData?.length === 0 && (
                      // eslint-disable-next-line no-console
                      // <div
                      //   className=" absolute
                      // left-[23rem] top-24 z-40 h-56 w-[550px] rounded-md border-gray-200 bg-white text-gray-500 shadow-lg"
                      // >
                      //   <div className="flex h-full w-full items-center justify-center">
                      //     <span className="text-2xl font-medium">
                      //       NO PRODUCT FOUND
                      //     </span>
                      //   </div>
                      // </div>
                      <div
                        className=' z-10  flex h-36 w-auto items-center justify-center
                       rounded-lg border-gray-200 bg-white text-lg  font-medium
                        text-gray-500 shadow-lg md:absolute md:top-28 md:left-[26%] md:w-[25rem]'
                      >
                        NO PRODUCT FOUND
                      </div>
                    )}
                </>
              )}

              <div className=' mx-auto -mt-2 hidden h-[76px] w-full items-center justify-center  py-[8px] px-[20px] text-[16px]  text-[#009E60] md:flex lg:container lg:flex xl:container xl:flex'>
                <>
                  <Link href='/'>
                    <a>
                      <div className='px-[15px]'>Home</div>
                    </a>
                  </Link>

                  <Link href='/products'>
                    <a>
                      <div className='px-[15px]'>Products</div>
                    </a>
                  </Link>

                  <Link href='/about'>
                    <a>
                      <div className='px-[15px]'>About</div>
                    </a>
                  </Link>

                  <Link href='/contact'>
                    <a>
                      <div className='px-[15px]'>Contact</div>
                    </a>
                  </Link>
                </>
              </div>
            </div>
          </div>
          <div>
            <div className='flex justify-center'>
              <Link href='/'>
                <a>
                  <div className='  md:hidden '>
                    {/* <Image src={logo} height="88px" width="214px" alt="logo" /> */}
                  </div>
                </a>
              </Link>
            </div>
            <div className='mt-4 flex  flex-wrap justify-between '>
              <div className='flex'>
                <Link href='/cart'>
                  <a>
                    <div className=' mr-2 md:hidden'>
                      <span className='flex h-3  w-full '>
                        <span className=' top-25 absolute  ml-3 mt-1 inline-flex h-4 w-4  items-center rounded-full bg-[#009E60]  text-center '>
                          {getUser?.data?.userName && (
                            <>
                              <span className='w-full  text-[12px] text-white'>
                                {data?.cartData?.[0]?.items.length > 0
                                  ? data?.cartData?.[0]?.items.length
                                  : 0}
                              </span>
                            </>
                          )}
                        </span>
                      </span>
                      <Image
                        src={shoppingCart}
                        height='23px'
                        width='23px'
                        className=' object-contain sm:mx-auto md:mx-0 lg:mx-0'
                        alt='logo'
                      />
                    </div>
                  </a>
                </Link>
                <Link href='/order'>
                  <a>
                    <div className=' ml-1.5 md:hidden'>
                      <span className='flex h-3  w-full '>
                        <span className=' top-25 absolute  ml-3 mt-1 inline-flex h-4 w-4  items-center rounded-full bg-[#009E60]  text-center '>
                          {getUser?.data?.userName && (
                            <>
                              <span className='w-full  text-[12px] text-white'>
                                {orderedHeaderLength > 0
                                  ? orderedHeaderLength
                                  : 0}
                              </span>
                            </>
                          )}
                        </span>
                      </span>
                      <Image
                        src={Order}
                        height='23px'
                        width='23px'
                        className=' object-contain sm:mx-auto md:mx-0 lg:mx-0'
                        alt='logo'
                      />
                    </div>
                  </a>
                </Link>
              </div>
              <div className=' flex flex-1 items-center justify-end md:hidden'>
                <div className='flex '>
                  {/* <a
                    className="nav-link dropdown-toggle w-full  items-center whitespace-nowrap text-[#8d8d8d]  transition duration-150 ease-in-out xl:flex  "
                    href="#"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    type="button"
                    id="dropdownMenuButtonX"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(e) => {
                      e?.preventDefault();
                      setIsAccountMenuOpened(!isAccountMenu);
                    }}
                  >
                    <div className="flex w-full items-center">
                      <div className="mr-3 h-[23px] w-[23px] ">
                        <Image src={userSettings} alt="logo" />
                      </div>
                      <div className=" cursor-pointer items-center gap-4 text-[16px] text-gray-600 xl:flex">
                        {getUser?.data?.userName ? (
                          <div
                            className="   hover:bg-gray-200"
                            onClick={() => {
                              setIsAccountMenuOpened(false);
                            }}
                          >
                            {getUser?.data?.userName &&
                              `${getUser?.data?.userName}`}
                          </div>
                        ) : (
                          <Link href="/auth/login">
                            <div
                              className=" py-[5px]  hover:bg-gray-200"
                              onClick={() => {
                                setIsAccountMenuOpened(false);
                                setIsMenu1Opened(false);
                              }}
                            >
                              Login
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </a> */}

                  <a
                    className='nav-link dropdown-toggle  flex items-center whitespace-nowrap  text-[#8d8d8d] transition duration-150 ease-in-out  '
                    href='#'
                    data-mdb-ripple='true'
                    data-mdb-ripple-color='light'
                    type='button'
                    id='dropdownMenuButtonX'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                    onClick={(e) => {
                      e?.preventDefault();
                      setIsAccountMenuOpened(!isAccountMenu);
                    }}
                  >
                    <div className='mr-3 h-[23px] w-[23px] '>
                      <Image src={userSettings} alt='logo' />
                    </div>
                    <div className=' flex cursor-pointer items-center gap-4 text-[16px] text-gray-600'>
                      {getUser?.data?.userName ? (
                        <Link href='/welcomeAccount'>
                          <a>
                            <div
                              className='  py-[10px] hover:bg-gray-200'
                              onClick={() => {
                                setIsAccountMenuOpened(false);
                              }}
                            >
                              {getUser?.data?.userName &&
                                `${getUser?.data?.userName}`}
                            </div>
                          </a>
                        </Link>
                      ) : (
                        // </Link>
                        // <div className='  py-[10px] hover:bg-gray-200'>
                        //   {getUser?.data?.userName &&
                        //     `${getUser?.data?.userName}`}
                        // </div>
                        <Link href='/auth/login'>
                          <div
                            className='sm-visible py-[5px]  hover:bg-gray-200'
                            onClick={() => setIsMenu1Opened(false)}
                          >
                            Login
                          </div>
                        </Link>
                      )}
                      /
                      <Link
                        href={`${
                          getUser?.data?.userName ? '/' : '/auth/register'
                        }`}
                      >
                        <div
                          className='  py-[5px] hover:bg-gray-200'
                          onClick={() => {
                            if (getUser?.data?.userName) {
                              {
                                handleLogout();
                              }
                            } else {
                              setIsAccountMenuOpened(false);
                            }
                          }}
                        >
                          <button>
                            {getUser?.data?.userName ? `Log out` : ' Sign up'}
                            {/* <ToastContainer /> */}
                          </button>
                        </div>
                      </Link>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className=' hidden w-full self-stretch md:block md:w-[30%] '>
            <div className=' '>
              <div
                className={` ml-5 flex w-full ${
                  getUser?.data?.userName && 'md:hidden'
                } lg:block xl:block `}
              >
                <a
                  className='nav-link dropdown-toggle  items-center whitespace-nowrap text-[#8d8d8d]  transition duration-150 ease-in-out xl:flex  '
                  href='#'
                  data-mdb-ripple='true'
                  data-mdb-ripple-color='light'
                  type='button'
                  id='dropdownMenuButtonX'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                  onClick={(e) => {
                    e?.preventDefault();
                    setIsAccountMenuOpened(!isAccountMenu);
                  }}
                >
                  <div className='mr-3 h-[23px] w-[23px] '>
                    <Image src={userSettings} alt='logo' />
                  </div>
                  <div className=' cursor-pointer items-center gap-4 text-[16px] text-gray-600 xl:flex'>
                    {getUser?.data?.userName ? (
                      <Link href='/welcomeAccount'>
                        <a>
                          <div
                            className='  py-[10px] hover:bg-gray-200'
                            onClick={() => {
                              setIsAccountMenuOpened(false);
                            }}
                          >
                            {getUser?.data?.userName &&
                              `${getUser?.data?.userName}`}
                          </div>
                        </a>
                      </Link>
                    ) : (
                      // </Link>
                      // <div className='  py-[10px] hover:bg-gray-200'>
                      //   {getUser?.data?.userName &&
                      //     `${getUser?.data?.userName}`}
                      // </div>
                      <Link href='/auth/login'>
                        <div
                          className='sm-visible py-[5px]  hover:bg-gray-200'
                          onClick={() => setIsMenu1Opened(false)}
                        >
                          Login
                        </div>
                      </Link>
                    )}
                    /
                    <Link
                      href={`${
                        getUser?.data?.userName ? '/' : '/auth/register'
                      }`}
                    >
                      <div
                        className='  py-[5px] hover:bg-gray-200'
                        onClick={() => {
                          if (getUser?.data?.userName) {
                            {
                              handleLogout();
                            }
                          } else {
                            setIsAccountMenuOpened(false);
                          }
                        }}
                      >
                        <button>
                          {getUser?.data?.userName ? `Log out` : ' Sign up'}
                          {/* <ToastContainer /> */}
                        </button>
                      </div>
                    </Link>
                  </div>
                </a>
              </div>
              {getUser?.data?.userName && (
                <div className=''>
                  <div className=' flex h-[38px] flex-wrap items-center gap-5  md:w-full md:justify-start md:gap-2.5 lg:justify-end xl:justify-end'>
                    <div className='ml-5 md:inline lg:hidden xl:hidden 2xl:hidden'>
                      <div className=''>
                        <button
                          ref={userRef}
                          className='relative w-max rounded-full bg-[#009E60] px-2  py-1.5 text-sm text-white'
                          onClick={() => {
                            setIsProfilePopup(!isProfilePopup);
                          }}
                        >
                          {(getUser?.data?.firstName &&
                            getUser?.data?.lastName &&
                            getInitials(
                              `${getUser?.data?.firstName}${' '}${
                                getUser?.data?.lastName
                              }`
                            )) ||
                            getInitials(getUser?.data?.userName)}
                          {isProfilePopup && (
                            <div
                              className='absolute   select-none rounded-md  bg-white shadow-md'
                              style={{
                                bottom: '-6.4rem',
                                right: '-42px',
                                zIndex: '2222',
                              }}
                              ref={userCardRef}
                            >
                              <h1 className='py-5 px-2.5 text-sm font-medium text-[#009E60]'>
                                {getUser?.data?.userName}
                              </h1>
                              <div className='w-full border-b' />
                              <button
                                onClick={() => {
                                  if (getUser?.data?.userName) {
                                    {
                                      handleLogout();
                                    }
                                  }
                                }}
                                className='w-full py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-50'
                              >
                                Logout
                              </button>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                    {/* ///////////////////////////////////////////////////////////WishList///////////////////////////////////////////////////////////////////////////////////////////////////// */}

                    {/* ///////////////////////////////////////////////////////////cart///////////////////////////////////////////////////////////////////////////////////////////////// */}
                    <Link href='/cart'>
                      <a>
                        <div className=' md:visible lg:visible xl:visible'>
                          <span className='flex h-3  w-full '>
                            <span className=' top-25 absolute  ml-3 mt-1 inline-flex h-4 w-4  items-center rounded-full bg-[#009E60]  text-center '>
                              {getUser?.data?.userName && (
                                <>
                                  <span className='w-full  text-[12px] text-white'>
                                    {data?.cartData?.[0]?.items.length > 0
                                      ? data?.cartData?.[0]?.items.length
                                      : 0}
                                  </span>
                                </>
                              )}
                            </span>
                          </span>
                          <Image
                            src={shoppingCart}
                            height='23px'
                            width='23px'
                            className=' object-contain sm:mx-auto md:mx-0 lg:mx-0'
                            alt='logo'
                          />
                        </div>
                      </a>
                    </Link>

                    {/* //////////////////////////////////////////////////////////////////order/////////////////////////////////////////////////////////////////////// */}
                    <Link href='/order'>
                      <a>
                        <div className=' md:visible lg:visible xl:visible '>
                          <span className='flex h-3  w-full '>
                            <span className=' top-25 absolute  ml-3 mt-1 inline-flex h-4 w-4  items-center rounded-full bg-[#009E60]  text-center '>
                              {getUser?.data?.userName && (
                                <>
                                  <span className='w-full  text-[12px] text-white'>
                                    {orderedHeaderLength > 0
                                      ? orderedHeaderLength
                                      : 0}
                                  </span>
                                </>
                              )}
                            </span>
                          </span>
                          <Image
                            src={Order}
                            height='23px'
                            width='23px'
                            className=' object-contain sm:mx-auto md:mx-0 lg:mx-0'
                            alt='logo'
                          />
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showHeader2 ? (
        <>
          <div className='hidden w-full md:container md:relative md:mx-auto md:flex lg:mx-auto'>
            <div className='xl:px  flex w-full  flex-wrap justify-start rounded-md  px-4 py-2  '>
              {categoryItem?.map((item: any) => {
                return (
                  <div
                    key={item?._id}
                    className='group -ml-1 md:relative '
                    style={{ width: '300px' }}
                  >
                    <Link href={`/products?categoryId=${item?._id}`} passHref>
                      <button
                        id='dropdownInformationButton'
                        data-dropdown-toggle='dropdownInformation'
                        className='md:after: flex  w-full items-center justify-between border-[2px] border-[#009e60] bg-[#ffffff] px-4 py-2.5 text-center text-sm font-medium text-[#009e60] '
                        type='button'
                        onClick={(e) => {
                          e?.stopPropagation();

                          if (activeState === item?._id) {
                            return setActive(!active);
                          }
                          setActiveState(item?._id);
                        }}
                      >
                        <div
                          style={{ width: '20rem' }}
                          className='truncate font-bold uppercase'
                        >
                          {item?.name}
                        </div>
                        {item?.subCategory?.length > 0 && (
                          <svg
                            className='ml-2 h-4 w-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M19 9l-7 7-7-7'
                            ></path>
                          </svg>
                        )}
                      </button>
                    </Link>
                    <div className=' relative z-[999] hidden w-full border bg-white group-hover:block'>
                      <div className=' absolute w-full'>
                        {item?.subCategory?.map((sub: any) => {
                          return (
                            <div key={sub?._id}>
                              <Link
                                href={`/products?subcategoryId=${sub?._id}`}
                                passHref
                              >
                                <div className='flex  cursor-pointer bg-green-200 text-left hover:bg-gray-100'>
                                  <ul
                                    className='accordion-collapse collapse relative'
                                    key={sub?._id}
                                  >
                                    <li className='relative'>
                                      <div className='flex w-full cursor-pointer items-center justify-start py-2 pl-4 text-[14px] font-bold uppercase hover:text-[#009E60]'>
                                        {sub?.name}
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
