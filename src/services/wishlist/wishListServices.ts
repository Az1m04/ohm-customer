import { callApi } from '@/utils/apiUtils';
import wishListEndpoints from '@/utils/endpoints/wishlist';

export const addToWishList = ({ pathParams, body }) => {
  return callApi({
    uriEndPoint: {
      ...wishListEndpoints.add,
    },
    pathParams,
    body,
  });
};

export const getWishListItems = () => {
  return callApi({
    uriEndPoint: {
      ...wishListEndpoints.getWishlist,
    },
  });
};

export const deleteWishList = ({ pathParams }) => {
  return callApi({
    uriEndPoint: {
      ...wishListEndpoints.delete,
    },
    pathParams,
  });
};
