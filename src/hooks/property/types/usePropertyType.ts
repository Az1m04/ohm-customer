import { useMutation } from 'react-query';

import PropertyServices from '@/services/property/PropertyServices';

const { getPropertyTypes } = new PropertyServices();

export function useGetPropertyType() {
  return useMutation(() => getPropertyTypes());
}
