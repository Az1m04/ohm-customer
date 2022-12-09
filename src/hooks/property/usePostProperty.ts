import { useMutation } from 'react-query';

import PropertyServices from '@/services/property/PropertyServices';

import { PostPropertyType } from '../../services/property/PropertyServices.types';

const { postProperty } = new PropertyServices();

export function usePostProperty() {
  return useMutation((payload: PostPropertyType) => postProperty(payload));
}
