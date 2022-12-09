import { EndPoint } from '@/types/endpoints';

const authEndpoints: EndPoint = {
  accessLogin: {
    uri: '/auth/login',
    method: 'POST',
    version: '/api',
  },
  register: {
    uri: '/auth/prospectuser',
    method: 'POST',
    version: '/api',
  },

  accessLogout: {
    uri: '/auth/logout',
    method: 'DELETE',
    version: '/api',
  },
  verify: {
    uri: '/auth/verify',
    method: 'POST',
    version: '/api',
  },
};

export default authEndpoints;
