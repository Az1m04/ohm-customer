import { useMutation } from 'react-query';

import PasswordServices from '@/services/password/PasswordServices';

const { verifyOtpService } = new PasswordServices();

export function useOtp() {
  return useMutation((payload: any) => verifyOtpService(payload));
}
