import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useGetCart } from '@/hooks/cart/query';
import {
  useGetMainCategoryProduct,
  useGetsubCategoryProduct,
} from '@/hooks/category/query';
import { useGetProducts } from '@/hooks/products/query';
import { useGetWishlist } from '@/hooks/wishlist/query';

import Loading from '@/components/loading';
import ProductCard from '@/components/productCard';

import { cartData } from '@/store/cart';
import { categoryDetails } from '@/store/category';
import { wishListData } from '@/store/wishList';

function Products() {
  const actualData: any = useGetProducts({});
  const [getCategory, setCategory] = useAtom(categoryDetails);
  const [updateProducts, setUpdatedProducts] = useState([]);
  const [cartItems, setCartItems] = useAtom(cartData);
  const [wishlistItems, setWishlistItems] = useAtom(wishListData);

  const cart: any = useGetCart(cartItems);
  const wishlist: any = useGetWishlist(wishlistItems);

  const { query }: any = useRouter();

  const ID: any = query.categoryId && query.categoryId;
  const subId: any = query?.subcategoryId && query?.subcategoryId;

  const mainCategoryProducts: any = useGetMainCategoryProduct({
    pathParams: { id: ID },
  });

  const subCategoryProducts: any = useGetsubCategoryProduct({
    pathParams: { id: subId },
  });

  useEffect(() => {
    if (query?.categoryId === undefined && query?.subcategoryId === undefined) {
      setUpdatedProducts(actualData?.data?.productData);
    }
  }, [query, actualData]);

  useEffect(() => {
    const categoryproduct =
      mainCategoryProducts?.data?.category?.product?.filter((product: any) => {
        return product?.variants?.length !== 0 && product.isActive;
      });
    if (mainCategoryProducts?.data?.category?.product) {
      const allProduct: any = [...categoryproduct];
      setUpdatedProducts(allProduct);
    }
    if (subCategoryProducts?.data?.products?.[0]?.productDetails) {
      const subProduct: any = [
        ...subCategoryProducts?.data?.products?.[0]?.productDetails?.filter(
          (product: any) => {
            return product?.variants?.length !== 0 && product.isActive;
          }
        ),
      ];
      setUpdatedProducts(subProduct);
    }
  }, [
    mainCategoryProducts?.data?.category?.product,
    query,
    query.categoryId,
    query.subCategoryId,
    subCategoryProducts?.data?.products,
  ]);
  const productIdArr = cart?.data?.cartData?.[0]?.items?.map(
    (item) => item?.productId
  );

  const wishlistArray =
    wishlist?.data?.wishlistData?.[0]?.data?.[0]?.items?.map(
      (item) => item?.productId
    );
  return (
    <div className='mx-auto min-h-[45vh] w-full  md:container '>
      <div className='my-5  gap-5 md:mx-[56px]'>
        <div className='mb-10 w-full md:w-1/4 '>
          {/* <Accordion
            setUpdatedProducts={setUpdatedProducts}
            Category={getCategory?.categoryData}
            categoryProduct={mainCategoryProducts?.data?.category?.product}
            subCategoryProduct={
              subCategoryProducts?.data?.products?.[0]?.productDetails
            }
          /> */}
        </div>
        <div className=' mt-28 flex w-full flex-wrap overflow-hidden '>
          {actualData.isLoading ||
          subCategoryProducts.isLoading ||
          mainCategoryProducts.isLoading ? (
            <div className='mt-[60px] h-[100vh] w-full items-center'>
              <Loading />
            </div>
          ) : (
            <div className='flex  w-full flex-wrap justify-center overflow-hidden '>
              {updateProducts
                ?.filter((product: any) => {
                  return product?.variants?.length !== 0 && product.isActive;
                })
                ?.map((item: any) => {
                  return (
                    <ProductCard
                      isAddedinWishlist={wishlistArray?.includes(item?._id)}
                      isAddedInCart={productIdArr?.includes(item?._id)}
                      key={item?._id}
                      imag={item?.media ? item?.media : '/images/slider-1.jpg'}
                      title={item?.name}
                      id={item?._id}
                      price={item?.variants[0]?.price}
                      discount={item?.discount}
                      isActive={item?.isActive === true}
                    />
                  );
                })}

              {updateProducts?.length === 0 || updateProducts === undefined ? (
                <div className='mx-auto w-full rounded  text-center'>
                  <Image
                    src='/images/emptyState.png'
                    width='300px'
                    height='300px'
                    alt='no image found'
                    objectFit='contain'
                    className='bg-white-8002'
                  />
                  <div className='text-xl font-semibold text-gray-700'>
                    No products found
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
