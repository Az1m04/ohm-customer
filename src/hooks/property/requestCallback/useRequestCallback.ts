import { useMutation } from 'react-query';

import PropertyServices from '@/services/property/PropertyServices';
import { RequestCallback } from '@/services/property/PropertyServices.types';

const { requestCallback } = new PropertyServices();

export function useRequestCallback() {
  return useMutation((payload: RequestCallback) => requestCallback(payload));
}
