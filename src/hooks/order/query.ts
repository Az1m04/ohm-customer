import { useMutation, useQuery } from 'react-query';

import {
  getOrderItems,
  getSingleOrder,
  getUserOrderItems,
  getUserOrderSingleItems,
} from '@/services/order/orderServices';

export const useGetOrder = (orderItems: any) => {
  return useQuery(['orderData', orderItems], getOrderItems, {
    refetchOnWindowFocus: false,
    enabled: !orderItems,
  });
};
export const useGetUserOrderItems = (orderItems: any) => {
  return useQuery(['getUserOrderItems', orderItems], getUserOrderItems, {
    refetchOnWindowFocus: false,
  });
};
export const useGetUserSingleOrderItems = (orderItems: any) => {
  return useQuery(['getUserSingleOrderItems', orderItems], () => {
    getUserOrderSingleItems(orderItems);
  });
};
export const useGetSingleOrder = () => {
  return useMutation((payload: any) => getSingleOrder(payload));
};

/**
 * import { useQuery } from 'react-query';

import { getCartItems } from '@/services/cart/cartServices';

export const useGetCart = (cartItems: any) => {
  return useQuery(['cartItems', cartItems], getCartItems, {
    refetchOnWindowFocus: false,
    enabled: !!cartItems,
  });
};

 */
/**
 * import { useQuery } from 'react-query';

import { getWishListItems } from '@/services/wishlist/wishListServices';

export const useGetWishlist = (wishlistItems: any) => {
  return useQuery(['wishList', wishlistItems], getWishListItems, {
    refetchOnWindowFocus: false,
    enabled: !!wishlistItems,
  });
};

 */
