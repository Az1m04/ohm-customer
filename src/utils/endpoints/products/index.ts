import { EndPoint } from '../../../types/endpoints';

const productsEndpoints: EndPoint = {
  getProducts: {
    uri: '/product',
    method: 'GET',
    version: '/api',
  },
  getSingleProducts: {
    uri: '/product/:id',
    method: 'GET',
    version: '/api',
  },
};

export default productsEndpoints;
