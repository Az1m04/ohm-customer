import { useMutation } from 'react-query';

import { VerifyParams } from '@/hooks/auth/verify/useVerify.types';

import AuthServices from '@/services/auth/AuthServices';

const { verify } = new AuthServices();

export function useVerify() {
  return useMutation((payload: VerifyParams) => verify(payload));
}
