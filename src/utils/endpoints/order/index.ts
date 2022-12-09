import { EndPoint } from '@/types/endpoints';

const orderEndpoints: EndPoint = {
  add: {
    uri: '/orders/create/:id',
    method: 'POST',
    version: '/api',
  },
  getOrder: {
    uri: '/orders',
    method: 'GET',
    version: '/api',
  },
  getUserOrder: {
    uri: '/orders/user',
    method: 'GET',
    version: '/api',
  },
  getSingleOrder: {
    uri: '/orders/:id',
    method: 'GET',
    version: '/api',
  },
};

export default orderEndpoints;
