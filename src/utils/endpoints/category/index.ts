import { EndPoint } from '../../../types/endpoints';

const categoryEndpoints: EndPoint = {
  getCategory: {
    uri: '/category/all',
    method: 'GET',
    version: '/api',
  },

  getMainCategoryProductDetails: {
    uri: '/category/:id',
    method: 'GET',
    version: '/api',
  },

  getSubCategoryProductDetails: {
    uri: '/category/product/:id',
    method: 'GET',
    version: '/api',
  },
};
export default categoryEndpoints;
