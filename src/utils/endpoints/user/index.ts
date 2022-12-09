import { EndPoint } from '@/types/endpoints';

const userEndpoints: EndPoint = {
  me: {
    uri: '/user/me',
    method: 'GET',
    version: '/api',
  },
  updateDetails: {
    uri: '/user/update',
    method: 'PUT',
    version: '/api',
  },
  resetPassword: {
    uri: '/user/updatepassword/:id',
    method: 'PUT',
    version: '/api',
  },
};

export default userEndpoints;
