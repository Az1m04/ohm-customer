import { useMutation } from 'react-query';

import {
  addToCart,
  deleteCart,
  updateCartItems,
} from '@/services/cart/cartServices';

export const useAddToCart = () => {
  return useMutation((payload: any) => addToCart(payload));
};

export const useUpdateToCart = () => {
  return useMutation((payload: any) => updateCartItems(payload));
};

export const useDeleteToCart = () => {
  return useMutation((payload: any) => deleteCart(payload));
};
