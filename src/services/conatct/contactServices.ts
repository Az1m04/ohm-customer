import { callApi } from '@/utils/apiUtils';
import contactEndpoints from '@/utils/endpoints/contact';

export const addToContact = ({ body }) => {
  return callApi({
    uriEndPoint: {
      ...contactEndpoints.addContact,
    },
    body,
  });
};
