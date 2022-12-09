import { useQuery } from 'react-query';

import { getCartItems } from '@/services/cart/cartServices';

export const useGetCart = (cartItems: any) => {
  console.log(cartItems);
  return useQuery(['cartItems', cartItems], getCartItems, {
    refetchOnWindowFocus: false,
    enabled: !!cartItems,
  });
};
