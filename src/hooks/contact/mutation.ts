import { useMutation } from 'react-query';

import { addToContact } from '@/services/conatct/contactServices';

export const useAddContact = () => {
  return useMutation((payload: any) => addToContact(payload));
};
