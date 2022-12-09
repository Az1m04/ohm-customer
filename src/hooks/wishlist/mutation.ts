import { useMutation } from 'react-query';

import { addToWishList } from '@/services/wishlist/wishListServices';
import { deleteWishList } from '@/services/wishlist/wishListServices';

export const useAddToWishlist = () => {
  return useMutation((payload: any) => addToWishList(payload));
};

export const useDeleteToWishlist = () => {
  return useMutation((payload: any) => deleteWishList(payload));
};
