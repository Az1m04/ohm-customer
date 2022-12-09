import { useMutation, useQuery } from 'react-query';

import {
  getCurrentUser,
  resetPassword,
  updateDetails,
} from '@/services/user/userServices';

export const useGetCurrentUsers = (onSuccess: any) => {
  return useQuery('currentUser', getCurrentUser, {
    refetchOnWindowFocus: false,
    onSuccess,
  });
};
export const useUpdateDetails = () => {
  return useMutation((payload: any) => updateDetails(payload));
};
export const useResetPassword = () => {
  return useMutation((payload: any) => resetPassword(payload));
};
