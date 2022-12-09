import { useMutation } from 'react-query';

import CommonServices from '@/services/common/Common';

const { getUserDetails } = new CommonServices();

export function useGetUserDetails() {
  return useMutation((payload: any) => getUserDetails(payload));
}
