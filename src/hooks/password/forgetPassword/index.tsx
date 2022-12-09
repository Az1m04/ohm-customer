import { useMutation } from 'react-query';

import PasswordServices from '@/services/password/PasswordServices';

const { forgotPasswordService } = new PasswordServices();

export function useForget() {
  return useMutation((payload: any) => forgotPasswordService(payload));
}
