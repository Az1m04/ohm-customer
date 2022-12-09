import { EndPoint } from '../../../types/endpoints';

const propertyEndpoints: EndPoint = {
  getPropertyTypes: {
    uri: '/property/propertyType',
    method: 'GET',
    version: '/api',
  },
  getProperty: {
    uri: '/property/all',
    method: 'GET',
    version: '/api',
  },
  postProperty: {
    uri: '/property/create',
    method: 'POST',
    version: '/api',
  },
  requestCallback: {
    uri: '/property/callback',
    method: 'POST',
    version: '/api',
  },
};

export default propertyEndpoints;
