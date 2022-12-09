import { callApi } from '@/utils/apiUtils';
import categoryEndpoints from '@/utils/endpoints/category';

export const getCategory = () => {
  return callApi({
    uriEndPoint: {
      ...categoryEndpoints.getCategory,
    },
  });
};

export const getMainCategoryProduct = ({ pathParams }) => {
  return callApi({
    uriEndPoint: {
      ...categoryEndpoints.getMainCategoryProductDetails,
    },
    pathParams,
  });
};

export const getSubCategoryProduct = ({ pathParams }) => {
  return callApi({
    uriEndPoint: {
      ...categoryEndpoints.getSubCategoryProductDetails,
    },
    pathParams,
  });
};
