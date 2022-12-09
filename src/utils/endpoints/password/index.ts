import { EndPoint } from '@/types/endpoints';

const passwordEndpoints: EndPoint = {
  forgotPassword: {
    uri: '/user/forgotPassword',
    method: 'POST',
    version: '/api',
  },
  verifyOtp: {
    uri: '/user/verifyOtp/:token',
    method: 'POST',
    version: '/api',
  },
  resetPassword: {
    uri: '/user/resetPassword/:token',
    method: 'POST',
    version: '/api',
  },
};

export default passwordEndpoints;
