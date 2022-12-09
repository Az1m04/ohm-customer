import { callApi } from '@/utils/apiUtils';
import userEndpoints from '@/utils/endpoints/user';

export const getCurrentUser = () => {
  return callApi({
    uriEndPoint: {
      ...userEndpoints.me,
    },
  });
};
export const updateDetails = (payload: any) => {
  return callApi({
    uriEndPoint: {
      ...userEndpoints.updateDetails,
    },
    ...payload,
  });
};
export const resetPassword = (payload: any) => {
  return callApi({
    uriEndPoint: {
      ...userEndpoints.resetPassword,
    },
    ...payload,
  });
};
