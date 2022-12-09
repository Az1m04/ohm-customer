import { useQuery } from 'react-query';

import { getWishListItems } from '@/services/wishlist/wishListServices';

export const useGetWishlist = (wishlistItems: any) => {
  return useQuery(['wishList', wishlistItems], getWishListItems, {
    refetchOnWindowFocus: false,
    enabled: !!wishlistItems,
  });
};
