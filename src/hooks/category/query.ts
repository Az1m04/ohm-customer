import { useQuery } from 'react-query';

import {
  getCategory,
  getMainCategoryProduct,
  getSubCategoryProduct,
} from '@/services/category/categoryService';

export const useGetCategory = (onSuccess: any) => {
  return useQuery('categoryDetails', getCategory, {
    refetchOnWindowFocus: false,
    onSuccess,
  });
};
export const useGetMainCategoryProduct = (payload: any) => {
  return useQuery(
    ['MainCategoryDetails', payload],
    () => getMainCategoryProduct(payload),
    {
      refetchOnWindowFocus: false,
      enabled: !!payload?.pathParams.id,
    }
  );
};

export const useGetsubCategoryProduct = (payload: any) => {
  return useQuery(
    ['SubCategoryDetails', payload],
    () => getSubCategoryProduct(payload),
    {
      refetchOnWindowFocus: false,
      enabled: !!payload?.pathParams.id,
    }
  );
};
