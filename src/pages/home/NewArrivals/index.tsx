import React from 'react';

import ProductCard from '@/components/productCard';

function NewArrivals({ productDetails, productIdArr, wishlistArray }: any) {
  console.log('productDetails', productDetails);
  return (
    <>
      {productDetails
        ?.filter((item) => item.variants.length > 0)
        ?.slice(0, 12)
        ?.map((item: any) => {
          if (item?.isActive === true) {
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
              />
            );
          }
        })}
    </>
  );
}

export default NewArrivals;
