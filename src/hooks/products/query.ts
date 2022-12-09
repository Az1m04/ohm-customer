import { useQuery } from 'react-query';

import {
  getProduct,
  getSingleProduct,
} from '@/services/products/productService';

export const useGetProducts = (payload: any) => {
  return useQuery(['productDetails', payload], () => getProduct(payload), {
    refetchOnWindowFocus: false,
  });
};

export const useGetSingleProducts = (payload: any) => {
  return useQuery(
    ['productDetails', payload],
    () => getSingleProduct(payload),
    {
      refetchOnWindowFocus: false,
    }
  );
};
