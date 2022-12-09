import { callApi } from '@/utils/apiUtils';
import cartEndpoints from '@/utils/endpoints/cart';

export const addToCart = ({ pathParams, body }) => {
  return callApi({
    uriEndPoint: {
      ...cartEndpoints.add,
    },
    pathParams,
    body,
  });
};

export const getCartItems = () => {
  return callApi({
    uriEndPoint: {
      ...cartEndpoints.getCart,
    },
  });
};
export const updateCartItems = (payload: { pathParams: any; body: any }) => {
  return callApi({
    uriEndPoint: {
      ...cartEndpoints.updateCart,
    },
    pathParams: payload.pathParams,
    body: payload.body,
  });
};
export const deleteCart = ({ pathParams }) => {
  return callApi({
    uriEndPoint: {
      ...cartEndpoints.delete,
    },
    pathParams,
  });
};
