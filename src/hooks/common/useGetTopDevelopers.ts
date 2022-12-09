import { useMutation } from 'react-query';

import CommonServices from '@/services/common/Common';

const { getTopDevelopers } = new CommonServices();

export function useGetCommon() {
  return useMutation(() => getTopDevelopers());
}
