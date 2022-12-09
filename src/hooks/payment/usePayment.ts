import { useQuery } from 'react-query';

import { getCurrentUser } from '@/services/user/userServices';

export const usePayment = (onSuccess: any) => {
  return useQuery('currentUser', getCurrentUser, {
    refetchOnWindowFocus: false,
    onSuccess,
  });
};
