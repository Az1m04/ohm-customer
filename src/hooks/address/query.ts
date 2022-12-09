import { useMutation, useQuery } from 'react-query';

import {
  deleteAddress,
  getAddress,
  getSingleAddress,
  updateAddress,
} from '@/services/address/Address';

export const useGetAddress = (address: any) => {
  return useQuery(['getAddress', address], getAddress, {
    refetchOnWindowFocus: false,
  });
};

export const useGetSingleAddress = () => {
  return useMutation((payload: any) => getSingleAddress(payload));
};

export const useDeleteAddress = () => {
  return useMutation((payload: any) => deleteAddress(payload));
};

export const useUpdateAddress = () => {
  return useMutation((payload: any) => updateAddress(payload));
};

// export const useGetSingleAddress = (address1: any) => {
//   return useQuery(['getSingleAddress', address1], () => {
//     getSingleAddress({
//       pathParams: {
//         id: address1?.id,
//       },
//     });
//   });
// };
