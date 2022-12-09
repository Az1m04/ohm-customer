import { useMutation } from 'react-query';

import AuthServices from '@/services/auth/AuthServices';

const { register } = new AuthServices();

export function useRegister() {
  return useMutation((payload: any) => register(payload));
}
