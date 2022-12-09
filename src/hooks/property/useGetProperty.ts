import { useMutation } from 'react-query';

import PropertyServices from '@/services/property/PropertyServices';

const { getProperty } = new PropertyServices();

export function useGetProperty() {
  return useMutation(() => getProperty());
}
