import { useMutation } from 'react-query';

import PasswordServices from '@/services/password/PasswordServices';

const { resetPasswordService } = new PasswordServices();

export function useReset() {
  return useMutation((payload: any) => resetPasswordService(payload));
}
