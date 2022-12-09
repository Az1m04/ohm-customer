import { callApi } from '@/utils/apiUtils';
import productsEndpoints from '@/utils/endpoints/products';

export const getProduct = ({ query }) => {
  return callApi({
    uriEndPoint: {
      ...productsEndpoints.getProducts,
    },
    query,
  });
};

export const getSingleProduct = ({ pathParams }) => {
  return callApi({
    uriEndPoint: {
      ...productsEndpoints.getSingleProducts,
    },
    pathParams,
  });
};
