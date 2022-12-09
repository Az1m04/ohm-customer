import { callApi } from '@/utils/apiUtils';
import addressEndpoints from '@/utils/endpoints/address';

export const getAddress = () => {
  return callApi({
    uriEndPoint: {
      ...addressEndpoints.getAddress,
    },
  });
};
export const addAddress = ({ pathParams, body }) => {
  return callApi({
    uriEndPoint: {
      ...addressEndpoints.addAddress,
    },
    pathParams,
    body,
  });
};
export const getSingleAddress = (payload: any) => {
  return callApi({
    uriEndPoint: {
      ...addressEndpoints.getSingleAddress,
    },
    ...payload,
  });
};
export const deleteAddress = (payload: any) => {
  console.log('payload', payload);
  return callApi({
    uriEndPoint: {
      ...addressEndpoints.deleteAddress,
    },
    ...payload,
  });
};
export const updateAddress = (payload: any) => {
  console.log('payload', payload);
  return callApi({
    uriEndPoint: {
      ...addressEndpoints.updateAddress,
    },
    ...payload,
  });
};
