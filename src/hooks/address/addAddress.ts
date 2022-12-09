import { useMutation } from 'react-query';

import { addAddress } from '@/services/address/Address';

export const useAddAddress = () => {
  return useMutation((payload: any) => addAddress(payload));
};
