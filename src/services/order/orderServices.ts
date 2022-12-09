import { callApi } from '@/utils/apiUtils';
import orderEndpoints from '@/utils/endpoints/order';

export const addToOrders = ({ pathParams, body }) => {
  return callApi({
    uriEndPoint: {
      ...orderEndpoints.add,
    },
    pathParams,
    body,
  })
    .then((res) => res)
    .catch((err) => {
      console.log(err, 'errssss');

      throw err;
    });
};

export const getOrderItems = () => {
  return callApi({
    uriEndPoint: {
      ...orderEndpoints.getOrder,
    },
  });
};

export const getUserOrderItems = () => {
  return callApi({
    uriEndPoint: {
      ...orderEndpoints.getUserOrder,
    },
  });
};
export const getSingleOrder = (payload: any) => {
  return callApi({
    uriEndPoint: {
      ...orderEndpoints.getSingleOrder,
    },
    ...payload,
  });
};
export const getUserOrderSingleItems = ({ pathParams }) => {
  return callApi({
    uriEndPoint: {
      ...orderEndpoints.getUserSingleOrder,
    },
    pathParams,
  });
};

/**
 * export const getWishListItems = () => {
  return callApi({
    uriEndPoint: {
      ...wishListEndpoints.getWishlist,
    },
  });
};

 */
