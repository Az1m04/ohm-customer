import { EndPoint } from '@/types/endpoints';

const cartEndpoints: EndPoint = {
  add: {
    uri: '/cart/:productId',
    method: 'POST',
    version: '/api',
  },
  getCart: {
    uri: '/cart',
    method: 'GET',
    version: '/api',
  },

  updateCart: {
    uri: '/cart/update/:productId',
    method: 'PUT',
    version: '/api',
  },
  delete: {
    uri: '/cart/delete/:productId',
    method: 'DELETE',
    version: '/api',
  },
};

export default cartEndpoints;
