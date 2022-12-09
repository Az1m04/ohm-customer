import React from 'react';

import ProductCard from '@/components/productCard';

function BestSelling({ productDetails }: any) {
  return (
    <>
      {productDetails
        ?.filter((item) => item.variants.length > 0 && item.buyCount > 0)
        ?.slice(0, 12)
        ?.map((item: any) => {
          console.log(item);

          if (item?.isActive === true) {
            return (
              <ProductCard
                key={item.id}
                id={item?._id}
                imag={item?.media}
                title={item?.name}
                price={item?.variants[0]?.price}
                discount={item?.discount}
              />
            );
          }
        })}
    </>
  );
}

export default BestSelling;
