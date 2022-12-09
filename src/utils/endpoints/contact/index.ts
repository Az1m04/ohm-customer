import { EndPoint } from '@/types/endpoints';

const contactEndpoints: EndPoint = {
  addContact: {
    uri: '/contact/create',
    method: 'POST',
    version: '/api',
  },
};

export default contactEndpoints;
