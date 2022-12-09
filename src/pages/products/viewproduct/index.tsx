import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import style from './index.module.css';

import { useAddToCart } from '@/hooks/cart/mutation';
import { useGetCart } from '@/hooks/cart/query';
import { useGetProducts, useGetSingleProducts } from '@/hooks/products/query';
import { useGetWishlist } from '@/hooks/wishlist/query';

import ImageMagnifier from '@/components/ImageMagnifier';
import Loading from '@/components/loading';
import ProductCard from '@/components/productCard';

import { cartData } from '@/store/cart';
import { productDetails } from '@/store/products';
import { currentUsers } from '@/store/users';
import { wishLisItemtId, wishListData } from '@/store/wishList';

import rightArrow from '@/assets/img/rightArrow.png';
import leftArrow from '@/assets/img/rightArrow.png';
import { queryClient } from '@/pages/_app';
import { currencyFormatter } from '@/utils/apiUtils';

function ViewProduct() {
  const router = useRouter();
  const { productId } = router.query;
  const [quantity, setQuantity] = useState<any>([]);
  const [getUser, setUser] = useAtom(currentUsers);
  const [getProduct, setProduct] = useAtom(productDetails);
  const [loadingState, setLoadingState] = useState(false);
  const [ErrorHandlerInStock, setErrorHandlerInStock] = useState(false);
  const [cartItems, setCartItems] = useAtom(cartData);
  const [cartId, setCartId] = useState(false);
  const [wishlistItems, setWishlistItems] = useAtom(wishListData);
  const [wishlisttId, setWishlistId] = useAtom(wishLisItemtId);
  const [productData, setProductData] = useState({} as any);
  const [showModal, setShowModal] = useState(false);
  const [sliceBeforeSize, setSliceBeforeSize] = useState(0);
  const [sliceAfterSize, setSliceAfterSize] = useState(3);
  const [getQuantity, setGetQuantity] = useState([]);

  const [variant, setVariant] = useState([] as any);

  const getCartData = useGetCart(setCartItems);
  const wishlistData: any = useGetWishlist(setWishlistItems);

  const productDataquery: any = useGetSingleProducts({
    pathParams: { id: productId },
  });

  useEffect(() => {
    if (!productData?.data || productData?.data?.data?._id !== productId) {
      setProductData(productDataquery);
      setVariant(productDataquery?.data?.data?.variants);
    }
  }, [productDataquery, productData, productId]);

  useEffect(() => {
    productDataquery?.refetch();
  }, []);
  const getPrice = (role: any, price: any) => {
    switch (role) {
      case 'admin':
        return price.myPrice;

      case 'wholesaler':
        return price?.wholesaler_price;
      case 'retailer':
        return price.retailer_price;
      case 'distributor':
        return price.distributor_price;
    }
  };
  useEffect(() => {
    const updatedVariants = productDataquery?.data?.data?.variants?.map(
      (item: any) => {
        return {
          sku: item?.sku,
          attributesVal: item?.attributesVal,
          inventory: item?.inventory,
          quantity: 0,
          price: item.price,
        };
      }
    );
    console.log(updatedVariants, 'uopdated');
    setGetQuantity(updatedVariants);
  }, [productDataquery?.isFetching, variant]);
  console.log(productDataquery?.isFetching, 'productData');

  const { data }: any = useGetProducts(getProduct);
  const categoryParentId: any = productData?.data?.data?.category?._id;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.getItem('cartItems');
    }
  }, []);

  let wishlist: any =
    typeof window !== 'undefined'
      ? localStorage.getItem('wishlistItems')
      : null;

  wishlist = wishlist ? JSON.parse(wishlist) : [];

  const wishlistProductData = wishlist?.find((item) =>
    item?._id?.includes(productId)
  );
  const wishlistProduct =
    wishlistData?.data?.wishlistData?.[0]?.data?.[0]?.items?.find((item) =>
      item?.productId?.includes(productId)
    );

  useEffect(() => {
    if (wishlistProductData?._id || wishlistProduct?.productId) {
      return setWishlistId(true);
    } else return setWishlistId(false);
  }, [wishlistProductData?._id, wishlistProduct?.productId]);

  const addCart = useAddToCart();

  const user = getUser?.data?.firstName;

  const addToCart = (val: any) => {
    const updatedQuantity = getQuantity?.filter(
      (item: any) => item.quantity > 0
    );
    console.log(updatedQuantity, 'updatedQuantity');
    const exist = getQuantity?.some((item: any) => item?.quantity > 0);

    if (exist) {
      addCart
        ?.mutateAsync({
          pathParams: { productId: val },
          body: {
            products: updatedQuantity,
          },
        })
        .then((res: any) => {
          setLoadingState(false);
          getCartData.refetch();
          queryClient.setQueryData('cartItems', () => {
            return setCartItems({
              ...res,

              totalCount: res?.totalCount,
            });
          });
          setCartId(true);

          toast.success('Product added to cart successfully');

          setQuantity([]);

          const updatedData: any = getQuantity?.map((item: any) => {
            return {
              ...item,
              quantity: 0,
            };
          });
          setGetQuantity(updatedData);
        })

        .catch((err) => {
          setLoadingState(false);
          toast.error(err?.response?.data?.error?.message);

          console.error(err?.response);
          setCartId(false);
        });
    } else if (quantity?.length === 0) {
      toast.error('Please select a product');
      setLoadingState(false);
    }
  };

  const productDetail = {
    id: '1',
    img: [
      { _id: '1', uri: '/images/slider-1.jpg' },
      { _id: '2', uri: '/images/ slider-2.jpg' },
      { _id: '3', uri: '/images/slider-3.jpg' },
    ],
    title: 'Fullsend Gummies',
    price: '$10.00',
    discount: '10%',
  };

  const [currentImage, setCurrentImage] = useState({
    id: 0,
    img: productData?.data?.data?.media
      ? productData?.data?.data?.media?.[0].url
      : '/images/slider-1.jpg',
  });

  useEffect(() => {
    if (productDataquery?.data?.data?.media) {
      setCurrentImage({
        id: 0,
        img: productDataquery?.data?.data?.media?.[0].url,
      });
    }
  }, [productDataquery?.data?.data?.media]);
  useEffect(() => {
    if (productData?.data?.data?.media) {
      setCurrentImage({
        id: currentImage?.id,
        img: currentImage?.img,
      });
    }
  }, [currentImage?.img]);

  const checkInventory = productData?.data?.data?.variants.every(
    (item) => item.inventory === 0
  );
  const lol = data?.productData?.filter((product: any) => {
    return (
      product?.variants?.length > 0 &&
      product.isActive &&
      product._id !== productId &&
      product?.category?._id?.includes(categoryParentId)
    );
  }).length;

  const availableQuantity = quantity?.every((item) => item.quantity > 0);

  const decreasePrice = (sku: any) => {
    const data: any = getQuantity?.map((item: any) => {
      if (item?.sku === sku && item.quantity > 0) {
        return {
          ...item,
          quantity: item?.quantity - 1,
        };
      }
      return item;
    });

    setGetQuantity(data);
  };
  const increasePrice = (sku: any) => {
    console.log(sku, 'sku');
    const data: any = getQuantity?.map((item: any) => {
      if (item.inventory > item?.quantity) {
        if (item?.sku === sku) {
          return {
            ...item,
            quantity: item?.quantity + 1,
          };
        }
      }

      return item;
    });

    setGetQuantity(data);
  };

  console.log(getQuantity, 'getQuantity');
  return (
    <div
      className={`${style.scrollbar} mx-auto my-[95px] mt-[180px] w-full items-center justify-center md:container md:px-[60px] `}
    >
      {showModal && <div className='absolute left-[0%] z-[999]'></div>}
      {productData?.isLoading || !productData?.data ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className='mb-[35px] flex justify-center text-[32px] text-[#009E60] '>
            <div className='capitalize'>
              {productData?.data?.data?.name}{' '}
              <div className='border-b-2 border-[#009E60]' />
            </div>
            <div />
          </div>

          <div className=' mx-auto w-full  justify-center gap-12  md:flex'>
            <div className=' md:w-[30vw]'>
              <ToastContainer />
              <div className='flex w-full flex-col'>
                <div className=' w-[3/5] cursor-pointer items-center  rounded-lg shadow-lg'>
                  {productData?.data?.data?.media && (
                    <ImageMagnifier src={currentImage?.img} />
                  )}
                </div>
                <div className='mt-10 flex w-full flex-wrap justify-center gap-5 lg:justify-start'>
                  {productData?.data?.data?.media ? (
                    <>
                      {productData?.data?.data?.media?.map(
                        (item, index): any => (
                          <div
                            key={index}
                            className={`cursor-pointer rounded-lg border p-2  ${
                              index === currentImage?.id
                                ? 'border-[#009E60] hover:border-[#009E60]'
                                : 'hover:border-[#333333]'
                            } `}
                            onClick={() => {
                              setCurrentImage({ id: index, img: item?.url });
                            }}
                          >
                            <div className='relative h-[60px] w-[60px] md:h-[100px] md:w-[100px]'>
                              <Image
                                layout='fill'
                                src={item?.url}
                                objectFit='cover'
                                alt='cover'
                              />
                            </div>
                          </div>
                        )
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <div className='mt-[40px]'>
                  <div className='  w-full  px-2  '>
                    <div className='w-[120px] rounded-t-lg border-2 border-[#009E60] py-[8px] px-[30px] text-[12px] text-[#333333]'>
                      Description
                    </div>
                    <div className=' flex-col border p-[20px] text-[18px] text-[#2A2A2A] shadow-lg'>
                      <div className='text-[16px]'>Description</div>
                      <p className=' text-[12px]'>
                        {' '}
                        {productData?.data?.data?.description}{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='mt-[15px]  h-auto rounded-lg border border-gray-200 bg-white p-6 shadow-md md:max-w-[40vw]'>
                <div className='flex flex-col'>
                  <div>{productData?.data?.data?.name} </div>

                  {getUser?.data?._id ? (
                    <div>
                      {`$${Math.min(
                        ...productData?.data?.data?.variants?.map((item) =>
                          getPrice(getUser?.data?.role, item.price)
                        )
                      )} - $${Math.max(
                        ...productData?.data?.data?.variants?.map((item) =>
                          getPrice(getUser?.data?.role, item.price)
                        )
                      )} `}
                    </div>
                  ) : (
                    <div className='text-[16px] font-medium text-[#009E60]'>
                      <Link href='/auth/login'>Login to see the price</Link>
                    </div>
                  )}

                  {user && (
                    <div className='overflow-x-auto  sm:-mx-6 lg:-mx-8'>
                      <div className='inline-block min-w-full py-4 sm:px-6 lg:px-8'>
                        <div
                        // className={`h-auto max-h-[370px] overflow-x-auto ${styles.scroll}`}
                        >
                          <table className='min-w-full '>
                            <thead className='border-b bg-[#009E60]'>
                              <tr>
                                <th
                                  scope='col'
                                  className='px-6 py-4 text-sm font-medium text-white xxs:px-3 xs:px-6'
                                >
                                  Items
                                </th>
                                <th
                                  scope='col'
                                  className='px-6 py-4 text-sm font-medium text-white xxs:px-3 xs:px-6'
                                >
                                  Price
                                </th>
                                <th
                                  scope='col'
                                  className='px-6 py-4 text-sm font-medium text-white xxs:px-0 xs:px-6'
                                >
                                  Quantity
                                </th>
                              </tr>
                            </thead>
                            {getQuantity?.map((item: any) => {
                              return (
                                <>
                                  {' '}
                                  <tbody key={item?._id}>
                                    <tr className='border-b bg-white'>
                                      <td className='px-6 py-4  font-medium text-gray-900 xxs:px-3 xxs:text-[10px] lg:text-[13px]'>
                                        {item?.attributesVal}
                                      </td>
                                      {user ? (
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 xxs:px-3 xxs:text-[10px] lg:text-center lg:text-sm'>
                                          {currencyFormatter?.format(
                                            getPrice(
                                              getUser?.data?.role,
                                              item.price
                                            )
                                          )}
                                        </td>
                                      ) : (
                                        <td className='px-6 py-4 text-sm font-medium text-[#009E60] '>
                                          login
                                        </td>
                                      )}

                                      <td className='px-6 py-4 text-sm font-light text-gray-900 xxs:px-0 xs:px-6'>
                                        {item?.inventory === 0 ? (
                                          <div className='w-[100px] rounded-lg bg-red-600 p-2 text-center text-white xxs:text-[10px]'>
                                            Out of Stock
                                          </div>
                                        ) : (
                                          <>
                                            <div className='flex flex-row items-center px-6 py-4 text-sm font-medium text-gray-900 xxs:px-2'>
                                              <div
                                                className='mr-3 cursor-pointer rounded-lg bg-gray-200 py-1 px-3 text-base hover:bg-black hover:text-white xxs:mr-0'
                                                onClick={() => {
                                                  decreasePrice(item?.sku);
                                                }}
                                              >
                                                -
                                              </div>
                                              <div className='mr-3  py-1  px-3 xxs:mr-0'>
                                                {item.quantity}
                                              </div>
                                              <div
                                                className='mr-3 cursor-pointer rounded-lg bg-[#049e5f] py-1 px-3 text-base text-white hover:bg-[#114630] xxs:mr-0'
                                                onClick={() => {
                                                  increasePrice(item?.sku);
                                                }}
                                              >
                                                +
                                              </div>
                                            </div>
                                            {/* <input
                                              className=' mt-[5px] h-[50px] w-[80px] rounded-xl border border-green-600   bg-transparent px-[10px] text-md text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                                              type='number'
                                              id={item?.sku}
                                              value={
                                                quantity.length > 0
                                                  ? quantity?.find(
                                                      (i) =>
                                                        i?.sku === item?.sku
                                                    )?.quantity
                                                  : 0
                                              }
                                              min={0}
                                              onChange={(e) => {
                                                const { value } = e.target;

                                                if (value > item?.inventory) {
                                                  return;
                                                } else if (
                                                  value < item?.inventory
                                                ) {
                                                  const claimQuantity = [
                                                    ...quantity,
                                                  ];
                                                  const itemOfIndex =
                                                    claimQuantity?.findIndex(
                                                      (i) =>
                                                        i?.sku === item?.sku
                                                    );
                                                  if (itemOfIndex >= 0) {
                                                    claimQuantity[
                                                      itemOfIndex
                                                    ].quantity =
                                                      parseInt(value);
                                                  } else {
                                                    claimQuantity.push({
                                                      sku: item?.sku,
                                                      quantity: parseInt(value),
                                                    });
                                                  }

                                                  setQuantity(claimQuantity);
                                                }
                                              }}
                                            /> */}
                                          </>
                                        )}
                                      </td>
                                    </tr>
                                  </tbody>
                                </>
                              );
                            })}
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {user && (
                  <>
                    {' '}
                    {!checkInventory && (
                      <div className='w-[100px] bg-[#009E60] p-[7px]'>
                        {loadingState ? (
                          <div className=' flex flex-row'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              xmlnsXlink='http://www.w3.org/1999/xlink'
                              style={{
                                margin: 'auto',
                                background: 'transparent',
                                display: 'block',
                                shapeRendering: 'auto',
                              }}
                              width='20'
                              height='20'
                              viewBox='0 0 100 100'
                              preserveAspectRatio='xMidYMid'
                            >
                              <circle
                                cx='50'
                                cy='50'
                                fill='none'
                                stroke='white'
                                strokeWidth='10'
                                r='35'
                                strokeDasharray='164.93361431346415 56.97787143782138'
                              >
                                <animateTransform
                                  attributeName='transform'
                                  type='rotate'
                                  repeatCount='indefinite'
                                  dur='1s'
                                  values='0 50 50;360 50 50'
                                  keyTimes='0;1'
                                ></animateTransform>
                              </circle>
                            </svg>
                          </div>
                        ) : (
                          <button
                            className=''
                            onClick={() => {
                              setLoadingState(true);

                              addToCart(productData?.data?.data?._id);
                            }}
                          >
                            <span className='text-center text-[#ffffff]'>
                              {' '}
                              Add to Cart
                            </span>
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className='my-16  text-center '>
            {lol > 0 ? (
              <h1 className='text-[38px] text-[#333333]'>Related Products</h1>
            ) : (
              <></>
            )}
            <div className='mt-6 flex w-full flex-wrap items-center justify-center'>
              <div className='mr-10'>
                <Image
                  className='rotate-180 cursor-pointer'
                  src={rightArrow}
                  width={25}
                  height={40}
                  alt='...'
                  onClick={() => {
                    if (sliceBeforeSize > 0) {
                      setSliceBeforeSize(sliceBeforeSize - 1);
                      setSliceAfterSize(sliceAfterSize - 1);
                    }
                  }}
                />
              </div>

              {data?.productData
                ?.filter((product: any) => {
                  return (
                    product?.variants?.length > 0 &&
                    product.isActive &&
                    product._id !== productId
                  );
                })
                ?.slice(sliceBeforeSize, sliceAfterSize)
                ?.map((item: any) => {
                  return (
                    <ProductCard
                      key={item?._id}
                      imag={item?.media ? item?.media : '/images/slider-1.jpg'}
                      title={item?.name}
                      id={item?._id}
                      price={item?.variants[0]?.price}
                      discount={item?.discount}
                    />
                  );
                })}
              <div className='ml-10'>
                <Image
                  src={leftArrow}
                  width={25}
                  height={40}
                  alt='...'
                  onClick={() => {
                    setSliceAfterSize(sliceAfterSize + 1);
                    setSliceBeforeSize(sliceBeforeSize + 1);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewProduct;
