import { callApi } from '@/utils/apiUtils';
import singleCategoryEndpoints from '@/utils/endpoints/category';
export const getSingleCategory = () => {
  return callApi({
    uriEndPoint: {
      ...singleCategoryEndpoints.getSingleCategory,
    }
  })
}